'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface MessageFormProps {
  onSend: (content: string) => Promise<void>
  disabled?: boolean
}

export function MessageForm({ onSend, disabled = false }: MessageFormProps) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isLoading) return

    try {
      setIsLoading(true)
      await onSend(content)
      setContent('')
    } catch (error) {
      console.error('[v0] Message send error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled || isLoading}
        className="flex-1"
      />
      <Button
        type="submit"
        disabled={disabled || isLoading || !content.trim()}
        size="icon"
      >
        <Send size={18} />
      </Button>
    </form>
  )
}
