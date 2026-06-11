'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReviewsList } from '@/components/reviews/reviews-list'
import { ReviewForm } from '@/components/forms/review-form'
import { Star } from 'lucide-react'

// Mock reviews
const mockReviews = [
  {
    reviewId: '1',
    studentId: 'student1',
    studentName: 'Alice Johnson',
    rating: 5,
    comment: 'Excellent course! Very well structured and easy to follow. Highly recommend!',
    createdAt: '2024-01-25',
    avatar: '/avatars/alice.jpg',
  },
  {
    reviewId: '2',
    studentId: 'student2',
    studentName: 'Bob Smith',
    rating: 4,
    comment: 'Good content but would appreciate more practice problems and exercises.',
    createdAt: '2024-01-22',
    avatar: '/avatars/bob.jpg',
  },
  {
    reviewId: '3',
    studentId: 'student3',
    studentName: 'Carol Davis',
    rating: 5,
    comment: 'Best online course I have taken! The instructor is amazing and very supportive.',
    createdAt: '2024-01-20',
    avatar: '/avatars/carol.jpg',
  },
  {
    reviewId: '4',
    studentId: 'student4',
    studentName: 'David Lee',
    rating: 4,
    comment: 'Great content, very helpful. I would suggest adding more video explanations.',
    createdAt: '2024-01-18',
    avatar: '/avatars/david.jpg',
  },
]

interface ReviewData {
  rating: number
  comment: string
}

export default function ReviewsPage() {
  const [selectedCourse, setSelectedCourse] = useState('course-1')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmitReview = async (data: ReviewData) => {
    try {
      setIsSubmitting(true)
      // TODO: Call API to save review to Firestore
      // await fetch('/api/reviews', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     courseId: selectedCourse,
      //     rating: data.rating,
      //     comment: data.comment,
      //   }),
      // })

      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error('[v0] Error submitting review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const courses = [
    { id: 'course-1', title: 'Introduction to React' },
    { id: 'course-2', title: 'Advanced TypeScript' },
    { id: 'course-3', title: 'Web Design Fundamentals' },
  ]

  const averageRating =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
          <h1 className="text-3xl font-bold">Reviews</h1>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-card"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Reviews section */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <ReviewsList
                  reviews={mockReviews}
                  averageRating={averageRating}
                  totalReviews={mockReviews.length}
                />
              </CardContent>
            </Card>
          </div>

          {/* Submit review section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave a Review</CardTitle>
              </CardHeader>
              <CardContent>
                {submitSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                    Thank you for your review!
                  </div>
                )}
                <ReviewForm
                  courseId={selectedCourse}
                  onSubmit={handleSubmitReview}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
