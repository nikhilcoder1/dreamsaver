import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: dreams, error } = await supabase
      .from('dreams')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ dreams })
  } catch (error: any) {
    console.error('Get dreams error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, moodTag } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: 'Dream content is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Trim content to limit
    const trimmedContent = content.slice(0, 2000).trim()
    const dreamTitle = title || trimmedContent.split('\n')[0].slice(0, 100) || 'Untitled Dream'

    const { data, error } = await supabase
      .from('dreams')
      .insert({
        user_id: user.id,
        title: dreamTitle,
        content: trimmedContent,
        mood_tag: moodTag || null,
        has_insight: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ dream: data })
  } catch (error: any) {
    console.error('Create dream error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
