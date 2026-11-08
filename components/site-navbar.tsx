"use client"

import Link from "next/link"
import { Infinity as InfinityIcon, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop homepage"
      className={cn(
        "flex select-none items-center text-3xl font-extrabold tracking-tight",
        className
      )}
    >
      <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
    </Link>
  )
}

const linkClassName =
  "text-sm text-muted-foreground transition-colors hover:text-foreground"

function NavLinks() {
  return (
    <ul className="hidden items-center gap-7 md:flex">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={linkClassName}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function AuthActions() {
  return (
    <div className="hidden items-center gap-5 md:flex">
      <ThemeToggle />
      <Link
        href="/sign-in"
        className="text-sm text-brand transition-colors hover:text-brand/80"
      >
        Sign In
      </Link>
      <Button
        render={<Link href="/sign-up" />}
        nativeButton={false}
        className="h-10 rounded-xl bg-brand px-5 text-base text-white hover:bg-brand/85"
      >
        Get Started
      </Button>
    </div>
  )
}

export function SiteNavbar() {
  return (
    <header className="px-3 pt-4 sm:px-6 sm:pt-6">
      <nav className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between rounded-2xl bg-nav px-4 md:h-20 md:px-8">
        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-72 max-w-[85vw] gap-0 border-border bg-card p-0 text-card-foreground"
            >
              <SheetHeader className="border-b border-border p-5">
                <SheetTitle className="sr-only">HireLoop menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav>
                <ul className="flex flex-col items-stretch gap-1 p-3">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <SheetClose
                        render={
                          <Link
                            href={link.href}
                            className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                          />
                        }
                      >
                        {link.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-2 border-t border-border p-5">
                <ThemeToggle />
                <SheetClose
                  render={
                    <Link
                      href="/sign-in"
                      className="flex h-8 items-center justify-center rounded-lg text-sm text-brand transition-colors hover:text-brand/80"
                    />
                  }
                >
                  Sign In
                </SheetClose>
                <SheetClose
                  render={
                    <Button
                      render={<Link href="/sign-up" />}
                      nativeButton={false}
                      className="h-10 w-full rounded-xl bg-brand text-white hover:bg-brand/85"
                    />
                  }
                >
                  Get Started
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

        {/* Desktop */}
        <div className="hidden flex-1 md:block">
          <Logo />
        </div>
        <div className="hidden items-center gap-7 md:flex">
          <NavLinks />
          <span className="h-6 w-px bg-border" aria-hidden="true" />
          <AuthActions />
        </div>
      </nav>
    </header>
  )
}
