
"use client";
import PackagesFaq from "@/components/packeges/package-faq";
import { PackagesProvider } from "@/components/packeges/packages-provider";
import PackagesComparison from "@/components/packeges/packege-comparison";
import PackagesHero from "@/components/packeges/packege-hero";
import PackagesWorkspace from "@/components/packeges/packeges-workspace";


export default function AllPackagesPage() {
  return (
    <PackagesProvider>
      <main className="min-h-screen bg-background text-foreground">
        {/* Section 1: Top Branding & Search Entry */}
        <PackagesHero />
        
        {/* Section 2: Core Interaction Hub (Filters + Grid) */}
        <PackagesWorkspace />
        
        {/* Section 3: Value Evaluation Interface */}
        <PackagesComparison />
        
        {/* Section 4: Anxiety Friction Reduction */}
        <PackagesFaq />
      </main>
    </PackagesProvider>
  );
}