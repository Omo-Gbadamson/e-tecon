'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function TeacherJobsPage() {
  const jobs: any[] = [] // TODO: Fetch jobs from Firestore

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Tutoring Jobs</h1>
          <p className="text-muted-foreground">
            Post and manage your tutoring opportunities
          </p>
        </div>
        <Link href="/dashboard/teacher/jobs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Post Job
          </Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4 py-12">
              <p className="text-muted-foreground">No jobs posted yet</p>
              <Link href="/dashboard/teacher/jobs/create">
                <Button>Post Your First Tutoring Job</Button>
              </Link>
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
