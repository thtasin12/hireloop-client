"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { authClient, type UserRole, roleDashboard } from "@/lib/auth-client"

/**
 * Landing page after a social OAuth sign-in.
 * Reads the session role and redirects to the correct dashboard.
 */
export default function AuthCallbackPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (isPending) return

    if (!session?.user) {
      router.replace("/sign-in")
      return
    }

    const userRole = (session.user as { role?: string }).role as UserRole | undefined
    const destination =
      userRole && roleDashboard[userRole] ? roleDashboard[userRole] : "/"

    router.replace(destination)
  }, [session, isPending, router])

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-brand" />
        <p className="text-sm">Redirecting you…</p>
      </div>
    </div>
  )
}
