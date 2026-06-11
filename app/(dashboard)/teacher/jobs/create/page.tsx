import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { JobForm } from '@/components/forms/job-form'

export const metadata = {
  title: 'Post Tutoring Job | TeachConnect',
  description: 'Post a tutoring job',
}

export default function CreateJobPage() {
  return (
    <div className="space-y-8 p-8 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Post Tutoring Job</h1>
        <p className="text-muted-foreground">
          Fill in the details to post your tutoring opportunity
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide clear information about your tutoring job
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobForm />
        </CardContent>
      </Card>
    </div>
  )
}
