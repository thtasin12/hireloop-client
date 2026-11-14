"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    })

    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.")
      setLoading(false)
    } else {
      router.push("/")
    }
  }

  async function handleGitHubSignIn() {
    setError(null)
    setGithubLoading(true)

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    })

    setGithubLoading(false)
  }

  const passwordStrength =
    password.length === 0
      ? null
      : password.length < 8
      ? "weak"
      : password.length < 12
      ? "medium"
      : "strong"

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 h-[480px] w-full -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px] dark:bg-violet-600/15"
      />

      <div className="relative flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link href="/" aria-label="HireLoop homepage" className="mb-8 flex justify-center">
            <img src="/logo.png" alt="HireLoop" className="h-10 w-auto" />
          </Link>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg shadow-zinc-200/60 dark:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.18)]">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Join HireLoop and find your dream job today
            </p>

            {/* Error banner */}
            {error && (
              <div className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Sign-up form */}
            <form onSubmit={handleEmailSignUp} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
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
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {passwordStrength && (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-1 gap-1">
                      {(["weak", "medium", "strong"] as const).map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            passwordStrength === "weak"
                              ? level === "weak"
                                ? "bg-destructive"
                                : "bg-border"
                              : passwordStrength === "medium"
                              ? level !== "strong"
                                ? "bg-amber-400"
                                : "bg-border"
                              : "bg-emerald-500"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength === "weak"
                          ? "text-destructive"
                          : passwordStrength === "medium"
                          ? "text-amber-500"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {passwordStrength.charAt(0).toUpperCase() +
                        passwordStrength.slice(1)}
                    </span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-1 h-10 w-full rounded-xl bg-brand text-base text-white hover:bg-brand/85"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center">
              <span className="flex-1 border-t border-border" />
              <span className="mx-4 text-xs text-muted-foreground">or continue with</span>
              <span className="flex-1 border-t border-border" />
            </div>

            {/* GitHub OAuth */}
            <Button
              type="button"
              variant="outline"
              disabled={githubLoading}
              onClick={handleGitHubSignIn}
              className="h-10 w-full rounded-xl text-sm"
            >
              {githubLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  {/* GitHub SVG icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 fill-current"
                    aria-hidden
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub
                </>
              )}
            </Button>

            {/* Terms note */}
            <p className="mt-5 text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-brand transition-colors hover:text-brand/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
