'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function MyCoursesPage() {
  const enrolledCourses: any[] = [] // TODO: Fetch enrolled courses from Firestore

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">
          Continue learning with your enrolled courses
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4 py-12">
              <p className="text-muted-foreground">You haven&apos;t enrolled in any courses yet</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Course cards will go here */}
        </div>
      )}
    </div>
  )
}
