'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'
import { BookOpen, Users, Zap, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">TeachConnect</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900">
            Learn from anyone, teach anyone
          </h1>
          <p className="text-xl text-slate-600">
            TeachConnect connects students with expert teachers. Whether you want to learn a new skill or share your knowledge, you&apos;re in the right place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/signup?role=student">
            <Button size="lg" className="flex items-center gap-2">
              Learn Something New
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/signup?role=teacher">
            <Button size="lg" variant="outline">
              Start Teaching
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Why TeachConnect?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Expert Teachers</h3>
              <p className="text-slate-300">
                Learn from qualified professionals passionate about teaching their subject matter.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Diverse Courses</h3>
              <p className="text-slate-300">
                Explore thousands of courses covering academics, skills, hobbies, and professional development.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Learn at Your Pace</h3>
              <p className="text-slate-300">
                Access course materials anytime, anywhere. Learn on your schedule with flexible deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Ready to get started?</h2>
            <p className="text-lg text-slate-600">
              Join thousands of students and teachers on TeachConnect today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup?role=student">
              <Button size="lg">I want to learn</Button>
            </Link>
            <Link href="/signup?role=teacher">
              <Button size="lg" variant="outline">
                I want to teach
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-600 text-sm">
          <p>&copy; 2024 TeachConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
