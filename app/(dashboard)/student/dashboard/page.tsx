'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/hooks/useAuth'
import { BookOpen, Clock, TrendingUp, Award } from 'lucide-react'

export default function StudentDashboard() {
  const { userData } = useAuth()

  const stats = [
    {
      title: 'Enrolled Courses',
      value: '0',
      description: 'Currently active',
      icon: BookOpen,
    },
    {
      title: 'Learning Hours',
      value: '0',
      description: 'Total time spent',
      icon: Clock,
    },
    {
      title: 'Applications',
      value: '0',
      description: 'Job applications',
      icon: TrendingUp,
    },
    {
      title: 'Certificates',
      value: '0',
      description: 'Courses completed',
      icon: Award,
    },
  ]

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userData?.firstName}! Continue your learning journey.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Explore courses and tutoring opportunities to start learning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to your learning dashboard! You can use the navigation menu to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Browse and enroll in courses</li>
            <li>Find and apply for tutoring opportunities</li>
            <li>Track your progress and learning hours</li>
            <li>View your profile and manage preferences</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
