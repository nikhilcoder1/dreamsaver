import { Moon } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="pulse-wave">
        <Moon className="w-12 h-12 text-primary" />
      </div>
    </div>
  )
}

export function LoadingPage({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="pulse-wave">
          <Moon className="w-16 h-16 text-primary mx-auto" />
        </div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
