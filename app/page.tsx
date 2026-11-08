import { SiteNavbar } from "@/components/site-navbar";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteNavbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        {/* Placeholder hero so you can see the navbar in context */}
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Your next hire starts with{" "}
          <span className="text-[#2f6bff]">hire</span>
          <span className="text-[#f08a24]">loop</span>
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Replace this placeholder content with your real homepage.
        </p>
      </main>
    </div>
  );
}
