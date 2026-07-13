import CheckoutSidebar from "@/components/packeges/single-package/chekout-sidebar";
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
   <main className="min-h-screen bg-[#fff8f3] text-[#1e1b17] selection:bg-[#885200]/20 pb-24 lg:pb-0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#d7c3b2]/30 lg:hidden flex justify-between items-center z-50 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[#885200] font-bold text-xl leading-none">৳11,520</span>
          <span className="text-[9px] text-[#524437] uppercase font-bold tracking-widest mt-1">30 Day Ritual</span>
        </div>
        <button className="bg-[#885200] text-white px-8 py-3 rounded-xl font-sans font-bold text-xs tracking-wide shadow-md hover:bg-[#885200]/90 transition-all">
          Subscribe Now
        </button>
      </div>
    </main>
  );
}