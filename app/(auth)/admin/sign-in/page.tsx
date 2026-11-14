"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminSignInPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error } = await authClient.signIn.email({ email, password })

    if (error || !data) {
      setError(error?.message ?? "Invalid credentials.")
      setLoading(false)
      return
    }

    const userRole = (data.user as { role?: string }).role

    if (userRole !== "admin") {
      // Sign the user back out — they don't have admin access
      await authClient.signOut()
      setError("Access denied. This portal is for administrators only.")
      setLoading(false)
      return
    }

    router.push("/dashboard/admin")
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* glow — amber tint to visually distinguish admin login */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 h-[480px] w-full -translate-x-1/2 rounded-full bg-amber-500/8 blur-[140px] dark:bg-amber-500/12"
      />

      <div className="relative flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link href="/" aria-label="HireLoop homepage" className="mb-8 flex justify-center">
            <img src="/logo.png" alt="HireLoop" className="h-10 w-auto" />
          </Link>

          {/* Card */}
          <div className="rounded-2xl border border-amber-200/60 bg-card p-8 shadow-lg shadow-amber-100/40 dark:border-amber-500/20 dark:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.12)]">
            {/* Admin badge */}
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <ShieldCheck className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Admin Portal
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Admin sign in
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Restricted access — HireLoop administrators only
            </p>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignIn} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="admin-email" className="text-sm font-medium text-foreground">
                  Admin email
                </label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@hireloop.io"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="admin-password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-1 h-10 w-full rounded-xl bg-amber-500 text-base text-white hover:bg-amber-500/85 dark:bg-amber-600 dark:hover:bg-amber-600/85"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Sign in to admin"
                )}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not an admin?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-brand transition-colors hover:text-brand/80"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
