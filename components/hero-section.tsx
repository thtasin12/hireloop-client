import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trendingSearches = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-480px w-full -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px] dark:bg-violet-600/15"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ── badge ─────────────────────────────────────────────── */}
        <div className="relative mt-16 flex justify-center sm:mt-20">
          {/* subtle radial glow behind the badge */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-40 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl"
          />
          {/* horizontal divider line running behind the badge */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent"
          />
          <div className="relative z-10 inline-flex items-center gap-3.5 rounded-full border border-zinc-800 bg-zinc-950/90 py-3 pr-7 pl-4 shadow-xl shadow-black/40">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-6 shrink-0"
            >
              {/* handle */}
              <rect x="8" y="1.5" width="8" height="7" rx="2.5" fill="#ea580c" />
              {/* body */}
              <rect x="3" y="6" width="18" height="16.5" rx="3.5" fill="#8b5e34" />
              {/* center strap */}
              <rect x="10.5" y="6" width="3" height="16.5" fill="#6b4423" />
              {/* clasp */}
              <rect x="10.5" y="12" width="3" height="3.2" rx="0.7" fill="#f59e0b" />
            </svg>
            <span className="font-mono text-base font-bold tracking-wide text-zinc-100 sm:text-lg">
              50,000+
            </span>
            <span className="font-mono text-sm tracking-[0.15em] text-zinc-500">
              NEW JOBS THIS MONTH
            </span>
          </div>
        </div>

        <h1 className="mx-auto mt-6 max-w-3xl text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Find Your{" "}
          <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400">
            Dream Job
          </span>{" "}
          Today
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-zinc-200/60 backdrop-blur sm:flex-row sm:items-center sm:rounded-full dark:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.25)]">
          <div className="flex flex-1 items-center gap-2.5 px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Job title, skill or company"
              className="h-10 border-0 bg-transparent px-0 shadow-none placeholder:text-muted-foreground/70 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
            />
          </div>
          <div className="hidden h-6 w-px shrink-0 bg-border sm:block" />
          <div className="flex flex-1 items-center gap-2.5 px-3">
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Location or Remote"
              className="h-10 border-0 bg-transparent px-0 shadow-none placeholder:text-muted-foreground/70 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            aria-label="Search jobs"
            className="shrink-0 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-purple-900/30 transition-opacity hover:opacity-90 dark:shadow-purple-900/40"
          >
            <Search className="size-4.5" />
          </Button>
        </form>

        {/* ── trending searches ─────────────────────────────────── */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="mr-1 text-muted-foreground/70">Trending Position</span>
          {trendingSearches.map((term) => (
            <button
              key={term}
              type="button"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground shadow-sm transition-colors hover:border-violet-500/40 hover:text-foreground"
            >
              {term}
            </button>
          ))}
        </div>

      </div>

      {/* ── globe band — full bleed, edge to edge ──────────────────
          /hero-globe.png is generated from public/globe.png with the
          magenta background keyed out (scripts/fix-globe.cjs), so it
          composites cleanly over the dark band in both themes. */}
      <div className="relative mt-14">
        <div
          className="relative h-[420px] w-full overflow-hidden sm:h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse 80% 90% at 50% 110%, rgba(109,40,217,0.55), rgba(5,5,12,1) 70%)",
          }}
        >
          <img
            src="/hero-globe.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          {/* blends the globe into the page background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_30%,transparent_60%,var(--background)_100%)]" />
        </div>

        <p className="pointer-events-none absolute inset-x-0 top-[36%] text-center text-lg font-medium text-white/90 sm:text-xl">
          Assisting over <span className="font-semibold text-white">15,000</span>{" "}
          job seekers
          <br className="hidden sm:block" /> find their dream positions.
        </p>

        {/* ── stats (overlap the bottom of the globe) ─────────── */}
        <div className="relative z-10 mx-auto -mt-24 grid max-w-5xl grid-cols-2 gap-3 px-2 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card/95 p-5 shadow-sm backdrop-blur transition-colors hover:border-violet-500/30"
            >
              <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-muted text-violet-600 dark:text-violet-400">
                <Icon className="size-4" />
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
