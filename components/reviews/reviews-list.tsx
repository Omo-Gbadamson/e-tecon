'use client'

import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface Review {
  reviewId: string
  studentId: string
  studentName: string
  rating: number
  comment: string
  createdAt: string
  avatar?: string
}

interface ReviewsListProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function ReviewsList({
  reviews,
  averageRating,
  totalReviews,
}: ReviewsListProps) {
  return (
    <div className="space-y-6">
      {/* Rating summary */}
      <div className="flex items-start gap-8">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={`${
                  star <= Math.round(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">{totalReviews} reviews</p>
        </div>

        {/* Rating distribution */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((r) => r.rating === rating).length
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium w-12">{rating} star</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.reviewId} className="border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>
                      {review.studentName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{review.studentName}</p>
                      <span className="text-xs text-gray-600">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
