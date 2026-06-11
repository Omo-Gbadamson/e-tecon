'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$0',
      description: 'From all courses and jobs',
      icon: DollarSign,
    },
    {
      title: 'Total Students',
      value: '0',
      description: 'Enrolled in your courses',
      icon: Users,
    },
    {
      title: 'Teaching Hours',
      value: '0',
      description: 'Total hours taught',
      icon: Clock,
    },
    {
      title: 'Growth',
      value: '0%',
      description: 'Month over month',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your teaching performance and earnings
        </p>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Detailed analytics coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Charts and detailed analytics will be available here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
