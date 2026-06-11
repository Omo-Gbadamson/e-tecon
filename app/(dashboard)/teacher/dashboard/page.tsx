'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/hooks/useAuth'
import { BarChart3, BookOpen, Users, TrendingUp } from 'lucide-react'

export default function TeacherDashboard() {
  const { userData } = useAuth()

  const stats = [
    {
      title: 'Total Students',
      value: '0',
      description: 'Across all courses',
      icon: Users,
    },
    {
      title: 'Active Courses',
      value: '0',
      description: 'Courses being taught',
      icon: BookOpen,
    },
    {
      title: 'Total Earnings',
      value: '$0',
      description: 'From courses and jobs',
      icon: TrendingUp,
    },
    {
      title: 'Pending Applications',
      value: '0',
      description: 'Awaiting your review',
      icon: BarChart3,
    },
  ]

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userData?.firstName}! Here&apos;s your teaching overview.
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
            Start by creating your first course or posting a tutoring job
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to your teaching dashboard! You can use the navigation menu to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Create and manage courses</li>
            <li>Post tutoring jobs and review applications</li>
            <li>View analytics and earnings</li>
            <li>Manage your profile and qualifications</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
