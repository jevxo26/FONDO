"use client";

import { FooterCtaAndMobileNav } from "@/components/apply/rider/cta";
import { DownloadAppBanner } from "@/components/apply/rider/download";
import { FaqSection } from "@/components/apply/rider/faq";
import { HowItWorksSection } from "@/components/apply/rider/how-it-works";
import { BenefitsSection } from "@/components/apply/rider/rider-benefit";
import { ApplicationFormContainer } from "@/components/apply/rider/rider-container";
import { HeroSection } from "@/components/apply/rider/rider-hero";
import { RequirementsSection } from "@/components/apply/rider/rider-requirment";
import { StatsSection } from "@/components/apply/rider/rider-stats";
import { TestimonialsSection } from "@/components/apply/rider/testimonial";
import { WhyJoinFondo } from "@/components/apply/rider/why";
import { useState } from "react";

export default function BecomeRiderPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen selection:bg-primary selection:text-primary-foreground relative pb-16 lg:pb-0">
      {/* Floating Sticky Progress Indicator for Desktop */}
      <div className="hidden lg:flex fixed top-24 right-8 z-40 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] flex-col gap-2 w-48">
        <div className="text-xs font-bold uppercase tracking-label text-muted-foreground">Application Form</div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Section {currentStep} of 10</span>
          <span className="text-primary">{currentStep * 10}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary h-full transition-all duration-300" style={{ width: `${currentStep * 10}%` }} />
        </div>
      </div>

      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <RequirementsSection />
      <ApplicationFormContainer onStepChange={setCurrentStep} />
      <WhyJoinFondo />
      <TestimonialsSection />
      <FaqSection />
      <DownloadAppBanner />
      <FooterCtaAndMobileNav />
    </div>
  );
}