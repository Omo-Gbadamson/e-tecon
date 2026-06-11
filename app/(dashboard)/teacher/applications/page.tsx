'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function TeacherApplicationsPage() {
  const applications: any[] = [] // TODO: Fetch applications from Firestore

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          Review and manage student applications to your tutoring jobs
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4 py-12">
              <p className="text-muted-foreground">No applications yet</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {/* Application cards will go here */}
        </div>
      )}
    </div>
  )
}
