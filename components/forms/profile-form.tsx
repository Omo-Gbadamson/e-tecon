'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/hooks/useAuth'
import { teacherProfileSchema, studentProfileSchema } from '@/lib/validation'
import type { TeacherProfileInput, StudentProfileInput } from '@/lib/validation'
import { Textarea } from '@/components/ui/textarea'

export function ProfileForm() {
  const { userData } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const isTeacher = userData?.role === 'teacher'
  const schema = isTeacher ? teacherProfileSchema : studentProfileSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
    },
  })

  const onSubmit = async (data: TeacherProfileInput | StudentProfileInput) => {
    try {
      setError(null)
      setSuccess(false)
      setIsLoading(true)

      const response = await fetch(`/api/users/${userData?.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <Input {...register('firstName')} disabled={isLoading} />
          {errors.firstName && (
            <p className="text-sm text-red-500">{String(errors.firstName.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <Input {...register('lastName')} disabled={isLoading} />
          {errors.lastName && (
            <p className="text-sm text-red-500">{String(errors.lastName.message)}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input type="email" {...register('email')} disabled={isLoading} />
        {errors.email && (
          <p className="text-sm text-red-500">{String(errors.email.message)}</p>
        )}
      </div>

      {isTeacher && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              placeholder="Tell us about yourself..."
              {...register('bio')}
              disabled={isLoading}
              rows={4}
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{String(errors.bio.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Qualifications</label>
            <Textarea
              placeholder="Your qualifications and certifications..."
              {...register('qualifications')}
              disabled={isLoading}
              rows={4}
            />
            {errors.qualifications && (
              <p className="text-sm text-red-500">{String(errors.qualifications.message)}</p>
            )}
          </div>
        </>
      )}

      {!isTeacher && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">School</label>
            <Input {...register('school')} placeholder="Your school name" disabled={isLoading} />
            {errors.school && (
              <p className="text-sm text-red-500">{String(errors.school.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Grade</label>
            <Input {...register('grade')} placeholder="Your current grade" disabled={isLoading} />
            {errors.grade && (
              <p className="text-sm text-red-500">{String(errors.grade.message)}</p>
            )}
          </div>
        </>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <Input {...register('phoneNumber')} placeholder="+1 (555) 000-0000" disabled={isLoading} />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
          Profile updated successfully!
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  )
}
