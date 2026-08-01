"use client";

import React from "react";
import { usePackages } from "./packages-context";
import PackageCard from "./packages-card";
import { PackageSearch } from "lucide-react";

const PackageGrid = () => {
  const { processedPackages, resetFilters } = usePackages();

  if (processedPackages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-2xl text-center">
        <div className="p-3 bg-muted rounded-full mb-3">
          <PackageSearch className="size-8 text-muted-foreground" />
        </div>
        <h3 className="font-heading text-base font-semibold text-foreground">No plans match your filters</h3>
        <p className="text-xs text-muted-foreground max-w-sm mt-1">
          Try adjusting your price range, calorie limit, or category selection to find available packages.
        </p>
        <button
          onClick={resetFilters}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {processedPackages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
};

export default PackageGrid;