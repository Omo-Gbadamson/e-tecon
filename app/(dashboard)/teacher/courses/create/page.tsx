import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseForm } from '@/components/forms/course-form'

export const metadata = {
  title: 'Create Course | TeachConnect',
  description: 'Create a new course',
}

export default function CreateCoursePage() {
  return (
    <div className="space-y-8 p-8 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        <p className="text-muted-foreground">
          Fill in the details to create your course
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
          <CardDescription>
            Provide comprehensive information about your course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CourseForm />
        </CardContent>
      </Card>
    </div>
  )
}
