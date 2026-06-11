'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { jobSchema, JobInput } from '@/lib/validation'

export function JobForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
  })

  const level = watch('level')

  const onSubmit = async (data: JobInput) => {
    try {
      setError(null)
      setIsLoading(true)

      // TODO: Create job in Firestore
      console.log('[v0] Job data:', data)

      router.push('/dashboard/teacher/jobs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post job')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Job Title</label>
        <Input
          placeholder="e.g., Math Tutoring for High School Students"
          {...register('title')}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{String(errors.title.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Subject</label>
          <Input
            placeholder="e.g., Mathematics"
            {...register('subject')}
            disabled={isLoading}
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{String(errors.subject.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Level</label>
          <Select value={level} onValueChange={(value) => setValue('level', value as any)}>
            <SelectTrigger disabled={isLoading}>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          {errors.level && (
            <p className="text-sm text-red-500">{String(errors.level.message)}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          placeholder="Describe the tutoring opportunity and what you're looking for..."
          {...register('description')}
          disabled={isLoading}
          rows={5}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{String(errors.description.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Compensation per hour (USD)</label>
        <Input
          type="number"
          step="0.01"
          placeholder="50.00"
          {...register('compensation', { valueAsNumber: true })}
          disabled={isLoading}
        />
        {errors.compensation && (
          <p className="text-sm text-red-500">{String(errors.compensation.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Application Deadline</label>
        <Input
          type="date"
          {...register('deadline')}
          disabled={isLoading}
        />
        {errors.deadline && (
          <p className="text-sm text-red-500">{String(errors.deadline.message)}</p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post Job'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
