'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'

interface UserData {
  uid: string
  email: string | null
  firstName: string
  lastName: string
  role: 'student' | 'teacher'
  profileComplete: boolean
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  error: string | null
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize Firebase auth listener only on client
    const initializeAuth = async () => {
      try {
        const { auth } = await import('./firebase')
        const { onAuthStateChanged } = await import('firebase/auth')

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          try {
            if (firebaseUser) {
              setUser(firebaseUser)
              // Fetch user data from API
              const response = await fetch(`/api/users/${firebaseUser.uid}`)
              if (response.ok) {
                const data = await response.json()
                setUserData(data)
              }
            } else {
              setUser(null)
              setUserData(null)
            }
          } catch (err) {
            console.error('[v0] Auth state error:', err)
            setError(err instanceof Error ? err.message : 'Authentication error')
          } finally {
            setLoading(false)
          }
        })

        return () => unsubscribe()
      } catch (err) {
        console.error('[v0] Firebase initialization error:', err)
        setError('Failed to initialize authentication')
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const logout = async () => {
    try {
      setLoading(true)
      const { auth } = await import('./firebase')
      const { signOut } = await import('firebase/auth')
      
      await signOut(auth)
      setUser(null)
      setUserData(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
