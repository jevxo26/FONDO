import CheckoutSidebar from "@/components/packeges/single-package/checkout-sidebar";
import DeliveryRituals from "@/components/packeges/single-package/delivery-rituals";
import HelpDeskFaq from "@/components/packeges/single-package/faq";
import HeroSection from "@/components/packeges/single-package/hero-section";
import CustomizationEngine from "@/components/packeges/single-package/meal-customization";
import NutrientDashboard from "@/components/packeges/single-package/netrution";
import PhilosophySection from "@/components/packeges/single-package/philosophy-section";
import ChroniclesReviews from "@/components/packeges/single-package/reviews";
import WeeklyMenuPreview from "@/components/packeges/single-package/weakly-menu-preview";

interface SinglePackageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SinglePackage({
  params,
}: SinglePackageProps) {
  const { id } = await params;

  return (
   <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 pb-24 lg:pb-0">
      <div className="wrapper py-8">
        {/* Asymmetrical 12-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Canvas: Main Content Blocks (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <HeroSection />
            <PhilosophySection />
            <NutrientDashboard />
            <WeeklyMenuPreview />
            <CustomizationEngine />
            <DeliveryRituals />
            <ChroniclesReviews />
            <HelpDeskFaq />
          </div>

          {/* Right Canvas: Sticky Billing Layout Deck (4 Columns) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4">
            <CheckoutSidebar />
          </aside>

        </div>
      </div>

      {/* Mobile Bottom Sticky Action Container */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border lg:hidden flex justify-between items-center z-50 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-primary font-bold text-xl leading-none font-heading">৳11,520</span>
          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mt-1">30 Day Ritual</span>
        </div>
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-sans font-bold text-xs tracking-wide shadow-md hover:bg-primary/90 transition-all">
          Subscribe Now
        </button>
      </div>
    </main>
  );
}