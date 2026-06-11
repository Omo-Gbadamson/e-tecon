'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  MessageSquare,
  BarChart3,
  User,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const teacherMenuItems = [
  { href: '/dashboard/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/teacher/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/teacher/jobs', label: 'Tutoring Jobs', icon: Briefcase },
  { href: '/dashboard/teacher/applications', label: 'Applications', icon: MessageSquare },
  { href: '/dashboard/teacher/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/teacher/profile', label: 'Profile', icon: User },
]

const studentMenuItems = [
  { href: '/dashboard/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/student/courses', label: 'Browse Courses', icon: BookOpen },
  { href: '/dashboard/student/my-courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/student/jobs', label: 'Tutoring Opportunities', icon: Briefcase },
  { href: '/dashboard/student/applications', label: 'My Applications', icon: MessageSquare },
  { href: '/dashboard/student/profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const { userData } = useAuth()
  const pathname = usePathname()

  const menuItems = userData?.role === 'teacher' ? teacherMenuItems : studentMenuItems

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="w-5 h-5" />
          </div>
          TeachConnect
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
