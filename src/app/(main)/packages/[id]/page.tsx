"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CheckoutSidebar from "@/components/packeges/single-package/checkout-sidebar";
import HeroSection from "@/components/packeges/single-package/hero-section";
import WeeklyMenuPreview from "@/components/packeges/single-package/weakly-menu-preview";
import PhilosophySection from "@/components/packeges/single-package/philosophy-section";
import PackageCustomization from "@/components/packeges/single-package/package-customization";
import { useGetPackageByIdQuery } from "@/store/api/slices/packages-api";
import FoodsLoading from "../../foods/loading";
import PackageReviews from "@/components/packeges/single-package/reviews";
import { CustomDay } from "@/types/package";

export default function SinglePackage() {
  const { id } = useParams<{ id: string }>();
  const { data: singlePackage, isLoading, error } = useGetPackageByIdQuery(id, { skip: !id });
  const [customDays, setCustomDays] = useState<CustomDay[]>([]);
  if (isLoading || error) return <FoodsLoading />;
  if (!singlePackage) return <div>Package not found.</div>;

const extraPrice = customDays.reduce((total, day) => {
    return (
      total +
      day.meals.reduce((mealTotal, meal) => {
        return (
          mealTotal +
          meal.foods.reduce((foodTotal, food) => foodTotal + (food.price || 0) * (food.quantity || 1), 0)
        );
      }, 0)
    );
  }, 0);

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 lg:pb-0">
      <div className="wrapper py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <HeroSection package={singlePackage} />
            <PhilosophySection package={singlePackage} />
            <WeeklyMenuPreview days={singlePackage.days} customDays={customDays} />
            <PackageCustomization
              singlePackage={singlePackage}
              customDays={customDays}
              setCustomDays={setCustomDays}
              totalPrice={Number(singlePackage.price ?? 0) + extraPrice}
            />
            <PackageReviews packageId={singlePackage.id} rating={singlePackage.rating} />
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4">
            <CheckoutSidebar
              package={singlePackage}
              customDays={customDays}
              extraPrice={extraPrice}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}