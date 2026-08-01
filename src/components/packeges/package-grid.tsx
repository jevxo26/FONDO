"use client";

import PackageCard from "./packages-card";
import type { MealPackage } from "./packages-context";

interface PackageGridProps {
  packages: MealPackage[];
}

export default function PackageGrid({ packages }: PackageGridProps) {
  if (!packages.length) {
    return (
      <div className="col-span-full py-16 text-center">
        <h3 className="text-lg font-semibold">No packages found</h3>

        <p className="mt-2 text-sm text-muted-foreground">Try changing your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
