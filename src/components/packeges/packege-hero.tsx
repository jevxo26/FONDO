// Location: src/components/packages/packages-hero.tsx
import { Search } from "lucide-react";
import { usePackages } from "./packages-provider";

export default function PackagesHero() {
  const { searchQuery, setSearchQuery } = usePackages();
  return (
    <header className="relative bg-secondary py-16 lg:py-24 overflow-hidden border-b border-border">
      <div className="wrapper relative z-10 flex flex-col items-center text-center">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-card px-3 py-1 rounded-full border border-border">
          Nourishment Subscriptions
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mt-3 font-normal tracking-tight">
          Find Your Perfect <span className="italic text-primary">Meal Plan</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-muted-foreground max-w-md mt-4 leading-relaxed">
          Healthy subscription packages fine-tuned for every dynamic lifestyle.
        </p>
        <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-sm mt-8 p-2 flex items-center focus-within:ring-2 focus-within:ring-primary/40">
          <Search className="size-4 ml-3 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-3 bg-transparent text-xs border-none outline-none"
          />
        </div>
      </div>
    </header>
  );
}