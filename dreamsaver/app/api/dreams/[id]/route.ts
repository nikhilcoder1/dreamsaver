import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get dream
    const { data: dream, error: dreamError } = await supabase
      .from('dreams')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (dreamError || !dream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 })
    }

    // Get insight if exists
    const { data: insight } = await supabase
      .from('insights')
      .select('*')
      .eq('dream_id', id)
      .single()

    return NextResponse.json({ dream, insight })
  } catch (error: any) {
    console.error('Get dream error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
