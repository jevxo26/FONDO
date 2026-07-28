import { RiderHowItWorksSection } from "@/components/apply/rider/how-it-works";
import { RiderCtaSection } from "@/components/apply/rider/rider-cta";
import { RiderFaqSection } from "@/components/apply/rider/rider-faq";
import { RiderHeroSection } from "@/components/apply/rider/rider-hero";
import { RiderAppPreviewSection } from "@/components/apply/rider/rider-preview";
import { RiderStatsSection } from "@/components/apply/rider/rider-stats";
import { RiderTestimonialsSection } from "@/components/apply/rider/rider-testimonial";
import { VehicleTypesSection } from "@/components/apply/rider/vecilce-type";
import { WhyRideSection } from "@/components/apply/rider/why-rider";
import { RiderRegistrationForm } from "@/components/common/form/rider-registration";

export default function BecomeRiderPage() {
  return (
    <main className="bg-background text-foreground font-sans min-h-screen relative overflow-x-hidden pb-16 lg:pb-0">
      <RiderHeroSection />
      <RiderStatsSection />
      <WhyRideSection />
      <RiderHowItWorksSection />
      <VehicleTypesSection />
      <RiderRegistrationForm />
      <RiderAppPreviewSection />
      <RiderTestimonialsSection />
      <RiderFaqSection />
      <RiderCtaSection />
    </main>
  );
}