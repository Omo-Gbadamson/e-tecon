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
import { courseSchema, CourseInput } from '@/lib/validation'
import { useAuth } from '@/lib/hooks/useAuth'

export function CourseForm() {
  const router = useRouter()
  const { userData } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
  })

  const level = watch('level')

  const onSubmit = async (data: CourseInput) => {
    try {
      setError(null)
      setIsLoading(true)

      // TODO: Create course in Firestore
      console.log('[v0] Course data:', data)

      router.push('/dashboard/teacher/courses')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Course Title</label>
        <Input
          placeholder="e.g., Introduction to Python Programming"
          {...register('title')}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{String(errors.title.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          placeholder="Describe your course in detail..."
          {...register('description')}
          disabled={isLoading}
          rows={5}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{String(errors.description.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input
            placeholder="e.g., Programming"
            {...register('category')}
            disabled={isLoading}
          />
          {errors.category && (
            <p className="text-sm text-red-500">{String(errors.category.message)}</p>
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
        <label className="text-sm font-medium">Price (USD)</label>
        <Input
          type="number"
          step="0.01"
          placeholder="99.99"
          {...register('price', { valueAsNumber: true })}
          disabled={isLoading}
        />
        {errors.price && (
          <p className="text-sm text-red-500">{String(errors.price.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Input
            type="date"
            {...register('startDate')}
            disabled={isLoading}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{String(errors.startDate.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Input
            type="date"
            {...register('endDate')}
            disabled={isLoading}
          />
          {errors.endDate && (
            <p className="text-sm text-red-500">{String(errors.endDate.message)}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Max Students (Optional)</label>
        <Input
          type="number"
          min="1"
          placeholder="Leave empty for unlimited"
          {...register('maxStudents', { valueAsNumber: true })}
          disabled={isLoading}
        />
        {errors.maxStudents && (
          <p className="text-sm text-red-500">{String(errors.maxStudents.message)}</p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Course'}
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
