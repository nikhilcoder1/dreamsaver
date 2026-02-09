'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, Plus, Sparkles, LogOut, Crown } from 'lucide-react'
import { Dream, UserProfile, FREE_INSIGHTS_LIMIT, MOOD_TAGS } from '@/lib/types'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const router = useRouter()
  const [dreams, setDreams] = useState<Dream[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const supabase = createClient()
      
      // Check auth
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('Profile error:', profileError)
        setError('Failed to load profile')
      } else {
        setProfile(profileData)
      }

      // Load dreams
      const { data: dreamsData, error: dreamsError } = await supabase
        .from('dreams')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (dreamsError) {
        console.error('Dreams error:', dreamsError)
        setError('Failed to load dreams')
      } else {
        setDreams(dreamsData || [])
      }
    } catch (err: any) {
      console.error('Load error:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const getMoodEmoji = (moodTag: string | undefined) => {
    if (!moodTag) return '💭'
    const mood = MOOD_TAGS.find(m => m.value === moodTag)
    return mood ? mood.label.split(' ')[0] : '💭'
  }

  const insightsRemaining = profile?.is_pro 
    ? '∞' 
    : FREE_INSIGHTS_LIMIT - (profile?.insights_used || 0)

  const insightsColor = profile?.is_pro
    ? 'text-primary'
    : (profile?.insights_used || 0) >= FREE_INSIGHTS_LIMIT
    ? 'text-destructive'
    : (profile?.insights_used || 0) >= FREE_INSIGHTS_LIMIT - 1
    ? 'text-yellow-500'
    : 'text-green-500'

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="pulse-wave">
            <Moon className="w-16 h-16 text-primary mx-auto" />
          </div>
          <p className="text-muted-foreground">Loading your dreams...</p>
        </div>
      </div>
    )
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
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardDescription>Total Dreams</CardDescription>
              <CardTitle className="text-3xl">{dreams.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardDescription>AI Insights</CardDescription>
              <CardTitle className={`text-3xl ${insightsColor}`}>
                {insightsRemaining} {!profile?.is_pro && `/ ${FREE_INSIGHTS_LIMIT}`}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="glass glow-violet">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Membership</CardDescription>
                {profile?.is_pro && <Crown className="w-5 h-5 text-yellow-500" />}
              </div>
              <CardTitle className="text-2xl">
                {profile?.is_pro ? 'Pro' : 'Free'}
              </CardTitle>
              {!profile?.is_pro && (
                <Button 
                  size="sm" 
                  className="mt-2 w-full"
                  onClick={() => router.push('/upgrade')}
                >
                  Upgrade to Pro
                </Button>
              )}
            </CardHeader>
          </Card>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Add Dream Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Dreams</h2>
          <Button onClick={() => router.push('/dreams/new')} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Dream
          </Button>
        </div>

        {/* Dreams List */}
        {dreams.length === 0 ? (
          <Card className="glass text-center py-12">
            <CardContent>
              <Moon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No dreams yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your journey by recording your first dream
              </p>
              <Button onClick={() => router.push('/dreams/new')}>
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Dream
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dreams.map((dream) => (
              <Card
                key={dream.id}
                className="glass hover:glow-violet transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/dreams/${dream.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-2 mb-1">
                        {dream.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(dream.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-2xl">{getMoodEmoji(dream.mood_tag)}</span>
                      {dream.has_insight && (
                        <Sparkles className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 font-serif">
                    {dream.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
