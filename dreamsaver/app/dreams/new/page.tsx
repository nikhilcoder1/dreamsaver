'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, ArrowLeft } from 'lucide-react'
import { MOOD_TAGS } from '@/lib/types'
import Link from 'next/link'

export default function NewDreamPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [moodTag, setMoodTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/dreams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, moodTag }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save dream')
      }

      router.push(`/dreams/${data.dream.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const charCount = content.length
  const isNearLimit = charCount > 1500
  const isOverLimit = charCount > 2000

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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="glass glow-violet">
          <CardHeader>
            <CardTitle className="text-3xl">Record a New Dream</CardTitle>
            <CardDescription>
              Capture the details while they're still fresh in your mind
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Dream Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="Give your dream a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Dream Description</Label>
                <Textarea
                  id="content"
                  placeholder="Describe your dream in detail... What did you see? How did you feel? What happened?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={12}
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
                <Label htmlFor="mood">Mood</Label>
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

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading || isOverLimit}
                >
                  {isLoading ? 'Saving...' : 'Save Dream'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
