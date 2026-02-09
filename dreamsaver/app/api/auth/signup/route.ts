import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, dreamText, moodTag } = await request.json()

    if (!email || !password || !dreamText) {
      return NextResponse.json(
        { error: 'Email, password, and dream text are required' },
        { status: 400 }
      )
    }

    const trimmedDream = dreamText.slice(0, 2000).trim()

    const supabase = await createClient()

    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    let userId: string

    // 🔥 DEV MODE: bypass signup rate limits
    if (process.env.NODE_ENV !== 'production') {
      const { data, error } = await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      })

      if (error || !data.user) {
        return NextResponse.json(
          { error: error?.message || 'Admin user creation failed' },
          { status: 500 }
        )
      }

      userId = data.user.id

      // 🔐 create session
      const { error: signInError } =
        await supabase.auth.signInWithPassword({ email, password })

      if (signInError) {
        return NextResponse.json(
          { error: signInError.message },
          { status: 500 }
        )
      }
    } else {
      // 🟢 PROD MODE (normal flow)
      const { data, error } = await supabase.auth.signUp({ email, password })

      if (error || !data.user) {
        return NextResponse.json(
          { error: error?.message || 'Signup failed' },
          { status: 400 }
        )
      }

      userId = data.user.id
    }

    // 🧾 Create profile (admin bypasses RLS)
    await adminSupabase.from('profiles').insert({
      id: userId,
      email,
      insights_used: 0,
      is_pro: false,
    })

    // 🌙 Create dream
    const { data: dream } = await adminSupabase
      .from('dreams')
      .insert({
        user_id: userId,
        title:
          trimmedDream.split('\n')[0].slice(0, 100) || 'My First Dream',
        content: trimmedDream,
        mood_tag: moodTag || null,
        has_insight: false,
      })
      .select()
      .single()

    return NextResponse.json({
      success: true,
      dream,
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}