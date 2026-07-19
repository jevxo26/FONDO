import { usePackages } from "./packages-provider";

export default function PackagesComparison() {
  const { comparedIds, toggleComparison, processedPackages } = usePackages();
  const list = processedPackages.filter(p => comparedIds.includes(p.id));

  if (comparedIds.length === 0) return null;

  return (
    <section className="wrapper mb-16 bg-card border border-border rounded-2xl p-6 shadow-md animate-in fade-in duration-200">
      <h2 className="font-heading text-lg text-foreground mb-4">Plan Comparison Matrix</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="hidden md:flex flex-col justify-between py-2 font-bold uppercase tracking-wider text-muted-foreground text-[9px]">
          <div className="h-8 flex items-center">Plan</div>
          <div className="py-2 border-b border-border/40">Category</div>
          <div className="py-2 border-b border-border/40">Duration</div>
          <div className="py-2 border-b border-border/40">Meals</div>
          <div className="py-2 border-b border-border/40">Calories</div>
          <div className="py-2">Price</div>
        </div>

        {list.map(pkg => (
          <div key={pkg.id} className="border border-border rounded-xl p-4 bg-background relative flex flex-col gap-2 shadow-sm">
            <button onClick={() => toggleComparison(pkg.id)} className="absolute top-2 right-2 text-[10px] text-destructive font-bold hover:underline">✕ Remove</button>
            <div className="font-heading font-medium h-8 flex items-center pr-12">{pkg.name}</div>
            <div className="py-2 border-b border-border/40 flex justify-between"><span className="md:hidden font-bold opacity-60">Category:</span>{pkg.category}</div>
            <div className="py-2 border-b border-border/40 flex justify-between"><span className="md:hidden font-bold opacity-60">Duration:</span>{pkg.duration} Days</div>
            <div className="py-2 border-b border-border/40 flex justify-between"><span className="md:hidden font-bold opacity-60">Meals:</span>{pkg.mealsPerDay}/Day</div>
            <div className="py-2 border-b border-border/40 flex justify-between"><span className="md:hidden font-bold opacity-60">Calories:</span>{pkg.calories} kcal</div>
            <div className="pt-2 font-bold text-sm flex justify-between"><span className="md:hidden font-bold opacity-60">Price:</span>৳{pkg.discountPrice ?? pkg.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}