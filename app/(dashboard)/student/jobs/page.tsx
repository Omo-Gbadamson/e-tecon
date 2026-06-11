'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function StudentJobsPage() {
  const jobs: any[] = [] // TODO: Fetch jobs from Firestore

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Tutoring Opportunities</h1>
        <p className="text-muted-foreground">
          Find and apply for tutoring jobs from teachers
        </p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            className="pl-10"
          />
        </div>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4 py-12">
              <p className="text-muted-foreground">No opportunities available yet</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {/* Job cards will go here */}
        </div>
      )}
    </div>
  )
}
