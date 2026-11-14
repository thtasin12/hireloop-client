"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  Building2,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react"

import { authClient, type UserRole, roleDashboard } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/* ─── Role cards ────────────────────────────────────────────────────── */
interface RoleCard {
  id: UserRole
  label: string
  description: string
  icon: React.ElementType
  accent: string
  border: string
  iconBg: string
}

const roles: RoleCard[] = [
  {
    id: "job_seeker",
    label: "Job Seeker",
    description: "Browse & apply for jobs that match your skills",
    icon: Briefcase,
    accent: "text-violet-600 dark:text-violet-400",
    border:
      "border-violet-500/60 bg-violet-50/60 dark:border-violet-500/40 dark:bg-violet-900/10",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    id: "recruiter",
    label: "Recruiter",
    description: "Post jobs and find top talent for your company",
    icon: Building2,
    accent: "text-indigo-600 dark:text-indigo-400",
    border:
      "border-indigo-500/60 bg-indigo-50/60 dark:border-indigo-500/40 dark:bg-indigo-900/10",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
]

/* ─── GitHub icon ───────────────────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function SignUpPage() {
  const router = useRouter()

  /* step 1 = role picker | step 2 = credentials form */
  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState<UserRole>("job_seeker")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* ── password strength ── */
  const passwordStrength =
    password.length === 0
      ? null
      : password.length < 8
      ? "weak"
      : password.length < 12
      ? "medium"
      : "strong"

  /* ── handlers ── */
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
      // The admin plugin reads `role` from the sign-up body
      role,
      callbackURL: roleDashboard[role],
    } as Parameters<typeof authClient.signUp.email>[0])

    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.")
      setLoading(false)
    } else {
      router.push(roleDashboard[role])
    }
  }

  async function handleGitHubSignUp() {
    setError(null)
    setGithubLoading(true)

    await authClient.signIn.social({
      provider: "github",
      // role cannot be set via OAuth at registration time;
      // the user will be assigned the defaultRole (job_seeker)
      // and can update it in settings.
      callbackURL: roleDashboard[role],
    })

    setGithubLoading(false)
  }

  const selectedRoleCard = roles.find((r) => r.id === role)!

  /* ══════════════════════════════════════════════════════════════════ */
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* glow */}
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

          {/* ── STEP INDICATOR ── */}
          <div className="mb-6 flex items-center gap-3">
            {[1, 2].map((s) => (
              <div key={s} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    step >= s
                      ? "bg-brand text-white"
                      : "border border-border bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <CheckCircle2 className="size-4" /> : s}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {s === 1 ? "Choose role" : "Your details"}
                </span>
              </div>
            ))}
            <div className="absolute left-1/2 h-px w-16 -translate-x-1/2 bg-border" />
          </div>

          {/* ── CARD ── */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg shadow-zinc-200/60 dark:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.18)]">

            {/* ════ STEP 1 — Role Picker ════ */}
            {step === 1 && (
              <>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Join as…
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose how you&apos;ll use HireLoop
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {roles.map((r) => {
                    const Icon = r.icon
                    const selected = role === r.id
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={cn(
                          "group relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all",
                          selected
                            ? r.border
                            : "border-border hover:border-muted-foreground/40"
                        )}
                      >
                        {/* check indicator */}
                        {selected && (
                          <span className="absolute right-3 top-3">
                            <CheckCircle2
                              className={cn("size-4", r.accent)}
                            />
                          </span>
                        )}
                        {/* icon */}
                        <div
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-lg",
                            selected ? r.iconBg : "bg-muted"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-5 transition-colors",
                              selected
                                ? r.accent
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                        </div>
                        {/* text */}
                        <div>
                          <p className="font-semibold text-foreground">
                            {r.label}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {r.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-6 h-10 w-full rounded-xl bg-brand text-base text-white hover:bg-brand/85"
                >
                  Continue as {selectedRoleCard.label}
                </Button>
              </>
            )}

            {/* ════ STEP 2 — Credentials Form ════ */}
            {step === 2 && (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-brand hover:text-brand/80"
                  >
                    ← Back
                  </button>
                  <span
                    className={cn(
                      "ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                      selectedRoleCard.iconBg,
                      selectedRoleCard.accent
                    )}
                  >
                    {(() => {
                      const Icon = selectedRoleCard.icon
                      return <Icon className="size-3" />
                    })()}
                    {selectedRoleCard.label}
                  </span>
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Create your account
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sign up and start your journey today
                </p>

                {error && (
                  <div className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <form onSubmit={handleEmailSignUp} className="mt-6 flex flex-col gap-4">
                  {/* Full name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
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

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
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

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
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
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>

                    {/* Strength bar */}
                    {passwordStrength && (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-1 gap-1">
                          {(["weak", "medium", "strong"] as const).map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                passwordStrength === "weak"
                                  ? level === "weak"
                                    ? "bg-destructive"
                                    : "bg-border"
                                  : passwordStrength === "medium"
                                  ? level !== "strong"
                                    ? "bg-amber-400"
                                    : "bg-border"
                                  : "bg-emerald-500"
                              )}
                            />
                          ))}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            passwordStrength === "weak"
                              ? "text-destructive"
                              : passwordStrength === "medium"
                              ? "text-amber-500"
                              : "text-emerald-600 dark:text-emerald-400"
                          )}
                        >
                          {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-1 h-10 w-full rounded-xl bg-brand text-base text-white hover:bg-brand/85"
                  >
                    {loading ? <Loader2 className="size-4 animate-spin" /> : "Create account"}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center">
                  <span className="flex-1 border-t border-border" />
                  <span className="mx-4 text-xs text-muted-foreground">or continue with</span>
                  <span className="flex-1 border-t border-border" />
                </div>

                {/* GitHub */}
                <Button
                  type="button"
                  variant="outline"
                  disabled={githubLoading}
                  onClick={handleGitHubSignUp}
                  className="h-10 w-full rounded-xl text-sm"
                >
                  {githubLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <GitHubIcon />
                      GitHub
                    </>
                  )}
                </Button>

                <p className="mt-5 text-center text-xs text-muted-foreground">
                  By signing up you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-brand transition-colors hover:text-brand/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
