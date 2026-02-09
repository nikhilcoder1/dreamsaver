import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { FREE_INSIGHTS_LIMIT } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const { dreamId } = await request.json()

    if (!dreamId) {
      return NextResponse.json(
        { error: 'Dream ID is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    if (!profile.is_pro && profile.insights_used >= FREE_INSIGHTS_LIMIT) {
      return NextResponse.json(
        { error: 'Insight limit reached. Please upgrade to Pro.' },
        { status: 403 }
      )
    }

    // Get dream
    const { data: dream, error: dreamError } = await supabase
      .from('dreams')
      .select('*')
      .eq('id', dreamId)
      .eq('user_id', user.id)
      .single()

    if (dreamError || !dream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 })
    }

    // Check existing insight
    const { data: existingInsight } = await supabase
      .from('insights')
      .select('*')
      .eq('dream_id', dreamId)
      .maybeSingle()

    if (existingInsight) {
      return NextResponse.json({ insight: existingInsight })
    }

    const prompt = `
    You are an empathetic dream analyst.

    Analyze the dream carefully and generate a personalized interpretation.
    Use the dream’s emotional tone, events, and wording to guide your analysis.
    If the dream is short, infer meaning from emotion and context.
    Do NOT repeat generic phrases across different dreams.

    Respond ONLY with valid JSON.
    Ensure the JSON is fully complete and properly closed.
    No markdown. No explanations. No backticks.

    Dream:
    """
    ${dream.content}
    """

    Mood: ${dream.mood_tag || 'Not specified'}

    Return JSON in this exact structure:

    {
      "summary": "4–6 sentence interpretation that is specific to this dream",
      "key_symbols": ["3–5 meaningful symbolic keywords inferred from the dream"],
      "reflection": "4–6 sentence reflective guidance connected to the dream’s emotion and real life"
    }
    `

    // Call Gemini
    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY!,
        },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: prompt }] },
          ],
          generationConfig: {
            temperature: 0.95,
            maxOutputTokens: 700,
          },
        }),
      }
    )

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate insight from Gemini' },
        { status: 500 }
      )
    }

    const geminiData = await geminiResponse.json()
    const rawText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!rawText) {
      return NextResponse.json(
        { error: 'Empty response from Gemini' },
        { status: 500 }
      )
    }

    // ---------- PARTIAL JSON SALVAGE PARSER ----------
    const extractField = (key: string) => {
      const regex = new RegExp(
        `"${key}"\\s*:\\s*"([\\s\\S]*?)"(?=,\\s*"|\\s*})`,
        'i'
      )
      const match = rawText.match(regex)
      return match ? match[1].trim() : undefined
    }

    let parsed: any = {}

    try {
      // Try normal JSON first (best case)
      let cleaned = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      const start = cleaned.indexOf('{')
      if (start !== -1) cleaned = cleaned.slice(start)
      if (!cleaned.endsWith('}')) cleaned += '}'

      parsed = JSON.parse(cleaned)
    } catch {
      // 🔥 FALLBACK: salvage usable fields instead of discarding everything
      console.warn('Gemini RAW response (partial salvage):', rawText)

      parsed = {
        summary: extractField('summary'),
        reflection: extractField('reflection'),
        key_symbols: (() => {
          const match = rawText.match(
            /"key_symbols"\s*:\s*\[([\s\S]*?)\]/i
          )
          if (!match) return undefined
          return match[1]
            .split(',')
            .map((s: string) => s.replace(/["\s]/g, '').trim())
            .filter(Boolean)
        })(),
      }
    }


    // ---------- FINAL SANITIZATION ----------
    const safeInsight = {
      summary:
        typeof parsed.summary === 'string' && parsed.summary.trim().length > 20
          ? parsed.summary
          : 'This dream reflects emotional experiences shaped by recent thoughts and events.',

      key_symbols:
        Array.isArray(parsed.key_symbols) && parsed.key_symbols.length > 0
          ? parsed.key_symbols
          : [],

      reflection:
        typeof parsed.reflection === 'string' && parsed.reflection.trim().length > 20
          ? parsed.reflection
          : 'Reflect on how your current emotions and recent experiences may be influencing your dreams.',
    }

    // Insert insight (GUARANTEED NON-NULL)
    const { data: insight, error: insightError } = await supabase
      .from('insights')
      .insert({
        dream_id: dreamId,
        summary: safeInsight.summary,
        key_symbols: safeInsight.key_symbols,
        reflection: safeInsight.reflection,
      })
      .select()
      .single()

    if (insightError) {
      console.error('Failed to save insight:', insightError)
      return NextResponse.json(
        { error: 'Failed to save insight' },
        { status: 500 }
      )
    }

    await supabase
      .from('dreams')
      .update({ has_insight: true })
      .eq('id', dreamId)

    if (!profile.is_pro) {
      await supabase
        .from('profiles')
        .update({ insights_used: profile.insights_used + 1 })
        .eq('id', user.id)
    }

    return NextResponse.json({ insight })

  } catch (error: any) {
    console.error('Generate insight error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}