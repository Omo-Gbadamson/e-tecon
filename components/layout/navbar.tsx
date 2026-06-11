'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, Settings } from 'lucide-react'

export function Navbar() {
  const { user, userData, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('[v0] Logout error:', error)
    }
  }

  const initials = userData
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : 'U'

  return (
    <nav className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          Welcome back, {userData?.firstName}
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium text-foreground">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button className="flex items-center gap-2 w-full cursor-pointer">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full cursor-pointer text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
