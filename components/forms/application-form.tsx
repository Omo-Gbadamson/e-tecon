'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { applicationSchema, ApplicationInput } from '@/lib/validation'

export function ApplicationForm({ jobId, onSuccess }: { jobId: string; onSuccess: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = async (data: ApplicationInput) => {
    try {
      setError(null)
      setIsLoading(true)

      // TODO: Create application in Firestore
      console.log('[v0] Application data:', data)

      reset()
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Letter</label>
        <Textarea
          placeholder="Tell the teacher why you're interested in this opportunity..."
          {...register('coverLetter')}
          disabled={isLoading}
          rows={5}
        />
        {errors.coverLetter && (
          <p className="text-sm text-red-500">{String(errors.coverLetter.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Proposed Rate (Optional)</label>
        <Input
          type="number"
          step="0.01"
          placeholder="Leave empty to accept teacher's rate"
          {...register('proposedRate', { valueAsNumber: true })}
          disabled={isLoading}
        />
        {errors.proposedRate && (
          <p className="text-sm text-red-500">{String(errors.proposedRate.message)}</p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  )
}
