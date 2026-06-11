import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['student', 'teacher'], { message: 'Please select a role' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// User profile schemas
export const teacherProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
  qualifications: z.string().max(1000).optional(),
  phoneNumber: z.string().optional(),
})

export const studentProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  school: z.string().optional(),
  grade: z.string().optional(),
  interests: z.array(z.string()).optional(),
  phoneNumber: z.string().optional(),
})

// Course schemas
export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  category: z.string().min(1, 'Category is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  price: z.number().min(0, 'Price must be 0 or greater'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  maxStudents: z.number().min(1, 'Must have at least 1 student capacity').optional(),
})

// Job schemas
export const jobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  subject: z.string().min(1, 'Subject is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  compensation: z.number().min(0, 'Compensation must be 0 or greater'),
  deadline: z.string().min(1, 'Deadline is required'),
})

// Application schemas
export const applicationSchema = z.object({
  coverLetter: z.string().min(20, 'Cover letter must be at least 20 characters').max(1000),
  proposedRate: z.number().min(0, 'Rate must be 0 or greater').optional(),
})

// Message schema
export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(2000),
})

// Review schema
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(1000),
})

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type CourseInput = z.infer<typeof courseSchema>
export type JobInput = z.infer<typeof jobSchema>
export type ApplicationInput = z.infer<typeof applicationSchema>
export type MessageInput = z.infer<typeof messageSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type TeacherProfileInput = z.infer<typeof teacherProfileSchema>
export type StudentProfileInput = z.infer<typeof studentProfileSchema>
