'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { Star } from 'lucide-react'

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(1000),
})

type ReviewInput = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  courseId?: string
  jobId?: string
  onSubmit: (data: ReviewInput) => Promise<void>
}

export function ReviewForm({ courseId, jobId, onSubmit }: ReviewFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
  })

  const onSubmitForm = async (data: ReviewInput) => {
    try {
      setError(null)
      setIsLoading(true)
      await onSubmit(data)
      reset()
      setRating(0)
    } catch (err) {
      console.error('[v0] Review submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-3">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-colors"
            >
              <Star
                size={32}
                className={`${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Your Review
        </label>
        <Textarea
          id="comment"
          placeholder="Share your experience with this course or job..."
          rows={5}
          {...register('comment')}
          className={errors.comment ? 'border-red-500' : ''}
        />
        {errors.comment && (
          <p className="text-sm text-red-600 mt-1">{errors.comment.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || rating === 0}
        className="w-full"
      >
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  )
}
