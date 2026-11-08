"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle({ className }: { className?: string }) {
  function toggleTheme() {
    try {
      const next = document.documentElement.classList.toggle("dark")
        ? "dark"
        : "light"
      localStorage.setItem("theme", next)
    } catch {
      // localStorage unavailable; nothing to persist
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  )
}
