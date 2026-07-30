"use client";

import { useMemo } from "react";
import { usePackages } from "./packages-context";
import { useGetPackagesQuery } from "@/store/api/slices/packages-api";

export default function PackagesComparison() {
  const { comparedIds, toggleComparison } = usePackages();

  const { data: packages = [] } = useGetPackagesQuery(undefined);

  const comparedPackages = useMemo(() => {
    return packages.filter((pkg) => comparedIds.includes(pkg.id));
  }, [packages, comparedIds]);

  if (!comparedPackages.length) return null;

  return (
    <section className="wrapper mb-16 bg-card border border-border rounded-2xl p-6 shadow-md animate-in fade-in duration-200">
      <h2 className="font-heading text-lg text-foreground mb-6">
        Plan Comparison
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        {/* Left Labels */}
        <div className="hidden md:flex flex-col font-semibold text-muted-foreground">
          <div className="h-10 flex items-center">Package</div>
          <div className="py-3 border-b">Category</div>
          <div className="py-3 border-b">Duration</div>
          <div className="py-3 border-b">Meals</div>
          <div className="py-3 border-b">Type</div>
          <div className="py-3 border-b">Customizable</div>
          <div className="py-3 border-b">Rating</div>
          <div className="py-3">Price</div>
        </div>

        {comparedPackages.map((pkg) => {
          const finalPrice = Number(pkg.discountPrice ?? pkg.price);

          return (
            <div
              key={pkg.id}
              className="relative border border-border rounded-xl p-4 bg-background shadow-sm flex flex-col"
            >
              <button
                onClick={() => toggleComparison(pkg.id)}
                className="absolute top-3 right-3 text-xs text-red-500 hover:underline"
              >
                ✕ Remove
              </button>

              <div className="font-semibold pr-10 h-10 flex items-center">
                {pkg.name}
              </div>

              <div className="py-3 border-b flex justify-between">
                <span className="md:hidden font-medium">
                  Category
                </span>

                {pkg.packageCategory?.name ?? "-"}
              </div>

              <div className="py-3 border-b flex justify-between">
                <span className="md:hidden font-medium">
                  Duration
                </span>

                {pkg.durationDays} Days
              </div>

              <div className="py-3 border-b flex justify-between">
                <span className="md:hidden font-medium">
                  Meals
                </span>

                {pkg.totalMeals}
              </div>

              <div className="py-3 border-b flex justify-between">
                <span className="md:hidden font-medium">
                  Type
                </span>

                {pkg.packageType}
              </div>

              <div className="py-3 border-b flex justify-between">
                <span className="md:hidden font-medium">
                  Customizable
                </span>

                {pkg.isCustomizable ? "Yes" : "No"}
              </div>

              <div className="py-3 border-b flex justify-between">
                <span className="md:hidden font-medium">
                  Rating
                </span>

                ⭐ {pkg.rating ?? 0}
              </div>

              <div className="pt-3 flex justify-between font-bold text-primary">
                <span className="md:hidden">Price</span>

                ৳{finalPrice}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}