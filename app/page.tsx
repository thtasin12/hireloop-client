import { SiteNavbar } from "@/components/site-navbar";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteNavbar />
      <main className="flex flex-1 flex-col justify-center text-center">
        <HeroSection />
      </main>
    </div>
  );
}
