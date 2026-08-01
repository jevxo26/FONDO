"use client";

import { usePackages } from "./packages-context";

export default function PackagesComparison() {
  const { comparedIds, toggleComparison, processedPackages, categories } = usePackages();
  const list = processedPackages.filter((p) => comparedIds.includes(p.id));

  if (comparedIds.length === 0) return null;

  return (
    <section className="wrapper mb-16 bg-card border border-border rounded-2xl p-6 shadow-md animate-in fade-in duration-200">
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Plan Comparison Matrix</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        {/* Label Sidebar */}
        <div className="hidden md:flex flex-col justify-between py-2 font-bold uppercase tracking-wider text-muted-foreground text-[9px]">
          <div className="h-8 flex items-center">Plan Name</div>
          <div className="py-2 border-b border-border/40">Category</div>
          <div className="py-2 border-b border-border/40">Duration</div>
          <div className="py-2 border-b border-border/40">Total Meals</div>
          <div className="py-2 border-b border-border/40">Customizable</div>
          <div className="py-2">Price</div>
        </div>

        {/* Items */}
        {list.map((pkg) => {
          const categoryName =
            pkg.packageCategory?.name ||
            categories.find((c) => c.id === pkg.packageCategoryId)?.name ||
            "General";

          return (
            <div
              key={pkg.id}
              className="border border-border rounded-xl p-4 bg-background relative flex flex-col gap-2 shadow-sm"
            >
              <button
                onClick={() => toggleComparison(pkg.id)}
                className="absolute top-2 right-2 text-[10px] text-destructive font-bold hover:underline"
              >
                ✕ Remove
              </button>
              
              <div className="font-heading font-medium h-8 flex items-center pr-12 text-foreground line-clamp-1">
                {pkg.name}
              </div>

              <div className="py-2 border-b border-border/40 flex justify-between">
                <span className="md:hidden font-bold text-muted-foreground">Category:</span>
                {categoryName}
              </div>

              <div className="py-2 border-b border-border/40 flex justify-between">
                <span className="md:hidden font-bold text-muted-foreground">Duration:</span>
                {pkg.durationDays} Days
              </div>

              <div className="py-2 border-b border-border/40 flex justify-between">
                <span className="md:hidden font-bold text-muted-foreground">Total Meals:</span>
                {pkg.totalMeals} Meals
              </div>

              <div className="py-2 border-b border-border/40 flex justify-between">
                <span className="md:hidden font-bold text-muted-foreground">Customizable:</span>
                {pkg.isCustomizable ? "Yes" : "No"}
              </div>

              <div className="pt-2 font-bold text-sm flex justify-between text-foreground">
                <span className="md:hidden font-bold text-muted-foreground">Price:</span>
                ৳{pkg.discountPrice ?? pkg.price}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}