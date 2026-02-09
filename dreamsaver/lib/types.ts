export interface Dream {
  id: string
  user_id: string
  title: string
  content: string
  mood_tag?: string
  created_at: string
  has_insight: boolean
}

export interface Insight {
  id: string
  dream_id: string
  summary: string
  key_symbols: string[]
  reflection: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  insights_used: number
  is_pro: boolean
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
}

export type MoodTag = 
  | 'peaceful'
  | 'anxious'
  | 'joyful'
  | 'nightmare'
  | 'lucid'
  | 'vivid'
  | 'confusing'
  | 'neutral'

export const MOOD_TAGS: { value: MoodTag; label: string }[] = [
  { value: 'peaceful', label: '😌 Peaceful' },
  { value: 'anxious', label: '😰 Anxious' },
  { value: 'joyful', label: '😊 Joyful' },
  { value: 'nightmare', label: '😱 Nightmare' },
  { value: 'lucid', label: '🌟 Lucid' },
  { value: 'vivid', label: '✨ Vivid' },
  { value: 'confusing', label: '🤔 Confusing' },
  { value: 'neutral', label: '😐 Neutral' },
]

export const FREE_INSIGHTS_LIMIT = 5
export const PRO_PRICE_MONTHLY = 8
