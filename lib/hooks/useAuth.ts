'use client'

import { useAuth as useAuthContext } from '../auth-context'

export function useAuth() {
  const context = useAuthContext()
  
  return {
    ...context,
    isAuthenticated: !!context.user,
    isTeacher: context.userData?.role === 'teacher',
    isStudent: context.userData?.role === 'student',
  }
}
