import { BenefitsTestimonialsSection } from "@/components/apply/vendor/benefits-testimonial";
import { DashboardPreviewSection } from "@/components/apply/vendor/dashboard-preview";
import { VendorFaqSection } from "@/components/apply/vendor/faq";
import { VendorHeroSection } from "@/components/apply/vendor/hero";
import { HowItWorksSection } from "@/components/apply/vendor/how";
import { VendorMarqueeSection } from "@/components/apply/vendor/marque";
import { VendorCtaSection } from "@/components/apply/vendor/vendor-cta";
import { VendorTypesSection } from "@/components/apply/vendor/vendor-type";
import { WhySellSection } from "@/components/apply/vendor/why";
import { VendorRegistrationForm } from "@/components/common/form/vendor-registration-form";
import React from "react";
export default function BecomeVendorPage() {
  return (
    <main className="bg-background text-foreground font-sans min-h-screen relative overflow-x-hidden pb-16 lg:pb-0">
      <VendorHeroSection/>
      <VendorMarqueeSection />
      <WhySellSection />
      <HowItWorksSection />
      <VendorTypesSection />
      <VendorRegistrationForm />
      <DashboardPreviewSection />
      <BenefitsTestimonialsSection />
      <VendorFaqSection/>
      <VendorCtaSection/>
    </main>
  );
}