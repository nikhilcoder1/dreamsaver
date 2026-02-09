'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Moon, Sparkles, Brain, TrendingUp } from 'lucide-react'
import { MOOD_TAGS } from '@/lib/types'

export default function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dreamText, setDreamText] = useState('')
  const [moodTag, setMoodTag] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, dreamText, moodTag }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up')
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const charCount = dreamText.length
  const isNearLimit = charCount > 1500
  const isOverLimit = charCount > 2000

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Moon className="w-8 h-8 text-primary" />
          <span className="text-2xl font-semibold">DreamSaver</span>
        </div>
        <Button variant="ghost" onClick={() => router.push('/login')}>
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Your Dreams,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Decoded
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your dreams and unlock their hidden meanings with AI-powered insights.
              Start your journey into the subconscious tonight.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="glass p-6 rounded-xl">
              <Brain className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized insights using advanced Gemini AI
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Symbol Detection</h3>
              <p className="text-sm text-muted-foreground">
                Discover recurring themes and symbols in your dreams
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Build a comprehensive dream journal over time
              </p>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto glow-violet">
            <h2 className="text-2xl font-semibold mb-6">Log Your First Dream</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dream">Your Dream</Label>
                <Textarea
                  id="dream"
                  placeholder="Describe your dream in detail... What did you see? How did you feel?"
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  required
                  rows={8}
                  className="resize-none"
                />
                <div className="flex justify-between text-xs">
                  <span className={isOverLimit ? 'text-destructive' : isNearLimit ? 'text-yellow-500' : 'text-muted-foreground'}>
                    {charCount} / 2000 characters
                  </span>
                  {isNearLimit && (
                    <span className="text-yellow-500">
                      {isOverLimit ? 'Exceeded limit!' : 'Approaching limit'}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Mood (Optional)</Label>
                <Select value={moodTag} onValueChange={setMoodTag}>
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="How did this dream feel?" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOOD_TAGS.map((tag) => (
                      <SelectItem key={tag.value} value={tag.value}>
                        {tag.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="text-destructive text-sm text-center p-3 bg-destructive/10 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full text-lg h-12"
                disabled={isLoading || isOverLimit}
              >
                {isLoading ? 'Creating Account...' : 'Begin Your Journey'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By signing up, you'll get 5 free AI insights. Upgrade to Pro for unlimited insights at $8/month.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>© 2026 DreamSaver. Your dreams, privately stored and analyzed.</p>
      </footer>
    </div>
  )
}
