import { Footer } from "@/components/layout/footer/footer";
import { BottomNav } from "@/components/layout/bottom-nav/bottom-nav";
import { MobileNav } from "@/components/layout/navbar/mobile-nav";
import { Navbar } from "@/components/layout/navbar/navbar";
import { PageTransition } from "@/components/providers/page-transition";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-background">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-premium-gradient" />
        <div className="absolute -top-40 -right-40 size-[300px] rounded-full bg-primary/20 blur-[90px] sm:size-[450px] sm:blur-[110px] lg:size-[600px] lg:blur-[120px]" />
        <div className="absolute top-1/3 -left-40 size-[280px] rounded-full bg-amber-500/12 blur-[80px] sm:size-[380px] lg:size-[450px] lg:blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 size-[300px] -translate-x-1/2 rounded-full bg-amber-900/10 blur-[100px] sm:size-[400px] lg:size-[500px] lg:blur-[130px]" />
      </div>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <Navbar />
      <MobileNav />
      <main className="flex-1 pb-14 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
