'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, ArrowLeft, Sparkles, Loader2 } from 'lucide-react'
import { Dream, Insight, MOOD_TAGS } from '@/lib/types'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function DreamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [dream, setDream] = useState<Dream | null>(null)
  const [insight, setInsight] = useState<Insight | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [canGenerateInsight, setCanGenerateInsight] = useState(false)

  useEffect(() => {
    loadDream()
  }, [resolvedParams.id])

  const loadDream = async () => {
    try {
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Load dream
      const { data: dreamData, error: dreamError } = await supabase
        .from('dreams')
        .select('*')
        .eq('id', resolvedParams.id)
        .eq('user_id', user.id)
        .single()

      if (dreamError || !dreamData) {
        setError('Dream not found')
        setIsLoading(false)
        return
      }

      setDream(dreamData)

      // Load insight if exists
      const { data: insightData } = await supabase
        .from('insights')
        .select('*')
        .eq('dream_id', resolvedParams.id)
        .single()

      setInsight(insightData)

      // Check if user can generate insights
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setCanGenerateInsight(profile.is_pro || profile.insights_used < 5)
      }

      setIsLoading(false)
    } catch (err: any) {
      console.error('Load error:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleGenerateInsight = async () => {
    setIsGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreamId: resolvedParams.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate insight')
      }

      setInsight(data.insight)
      if (dream) {
        setDream({ ...dream, has_insight: true })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const getMoodLabel = (moodTag: string | undefined) => {
    if (!moodTag) return null
    const mood = MOOD_TAGS.find(m => m.value === moodTag)
    return mood?.label
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="pulse-wave">
            <Moon className="w-16 h-16 text-primary mx-auto" />
          </div>
          <p className="text-muted-foreground">Loading dream...</p>
        </div>
      </div>
    )
  }

  if (error && !dream) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!dream) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Moon className="w-8 h-8 text-primary" />
            <span className="text-2xl font-semibold">DreamSaver</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dream Content */}
          <Card className="glass">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{dream.title}</CardTitle>
                  <CardDescription>
                    {new Date(dream.created_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                  {dream.mood_tag && (
                    <div className="mt-2 inline-block px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {getMoodLabel(dream.mood_tag)}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <p className="text-base font-serif leading-relaxed whitespace-pre-wrap">
                  {dream.content}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Insight Panel */}
          <Card className="glass glow-violet">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">AI Insight</CardTitle>
              </div>
              <CardDescription>
                Personalized analysis powered by Gemini AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              {insight ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">
                      Interpretation
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {insight.summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">
                      Key Symbols
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {insight.key_symbols.map((symbol, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/20 rounded-full text-sm"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">
                      Reflection
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {insight.reflection}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground italic">
                      Generated on {new Date(insight.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  {isGenerating ? (
                    <>
                      <div className="pulse-wave">
                        <Sparkles className="w-12 h-12 text-primary mx-auto" />
                      </div>
                      <p className="text-muted-foreground">
                        Analyzing your dream...
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This may take 3-8 seconds
                      </p>
                    </>
                  ) : canGenerateInsight ? (
                    <>
                      <Sparkles className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
                      <p className="text-muted-foreground mb-4">
                        Generate AI insights to understand the deeper meaning of your dream
                      </p>
                      <Button
                        onClick={handleGenerateInsight}
                        size="lg"
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate Insight
                          </>
                        )}
                      </Button>
                      {error && (
                        <p className="text-destructive text-sm mt-4">{error}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
                      <p className="text-muted-foreground mb-4">
                        You've used all your free insights
                      </p>
                      <Button
                        onClick={() => router.push('/upgrade')}
                        size="lg"
                      >
                        Upgrade to Pro
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
