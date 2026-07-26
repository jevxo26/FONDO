// Location: src/components/packages/packages-workspace.tsx
import { SlidersHorizontal, ArrowUpDown,} from "lucide-react";
import { usePackages } from "./packages-context";
import PackageGrid from "./package-grid";

const CATEGORIES = ["All", "Weight Loss", "Weight Gain", "Regular", "Diabetic", "High Protein"];

export default function PackagesWorkspace() {
  const {
    selectedCategory, setSelectedCategory, selectedDuration, setSelectedDuration,
    maxPrice, setMaxPrice, maxCalories, setMaxCalories, isVegetarian, setIsVegetarian,
    isHighProtein, setIsHighProtein, isCustomizable, setIsCustomizable, sortBy, setSortBy,
 processedPackages
  } = usePackages();

  return (
    <section className="wrapper py-12">
      {/* Category Scrollbar Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/60">
        {CATEGORIES.map((cat) => (
          <button
            key={cat} onClick={() => setSelectedCategory(cat)}
            className={`h-9 px-4 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Controls Layout */}
        <aside className="lg:sticky lg:top-6 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2 font-heading text-sm font-semibold border-b border-border pb-3">
            <SlidersHorizontal className="size-4 text-primary" /> Filters
          </div>
          
          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Max Budget (৳{maxPrice})</label>
            <input type="range" min="2000" max="12000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-1 bg-muted accent-primary rounded-lg cursor-pointer appearance-none" />
          </div>

          {/* Duration Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Duration</label>
            <div className="grid grid-cols-3 gap-1.5 bg-muted p-1 rounded-xl">
              {[7, 15, 30].map((d) => (
                <button key={d} type="button" onClick={() => setSelectedDuration(selectedDuration === d ? null : d)} className={`py-1 rounded-lg text-[11px] font-bold ${selectedDuration === d ? "bg-card text-primary" : "text-muted-foreground"}`}>{d} Days</button>
              ))}
            </div>
          </div>

          {/* Calorie Range */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Calories Cap ({maxCalories} kcal)</label>
            <input type="range" min="600" max="3000" step="100" value={maxCalories} onChange={(e) => setMaxCalories(Number(e.target.value))} className="w-full h-1 bg-muted accent-primary rounded-lg cursor-pointer appearance-none" />
          </div>

          {/* Boolean Checks */}
          <div className="flex flex-col gap-2 pt-2 border-t border-border/60">
            {/* Checked items handle dynamic inputs */}
            <label className="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" checked={isVegetarian} onChange={(e) => setIsVegetarian(e.target.checked)} className="rounded border-border text-primary size-4" /> Vegetarian</label>
            <label className="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" checked={isHighProtein} onChange={(e) => setIsHighProtein(e.target.checked)} className="rounded border-border text-primary size-4" /> High Protein</label>
            <label className="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" checked={isCustomizable} onChange={(e) => setIsCustomizable(e.target.checked)} className="rounded border-border text-primary size-4" /> Customizable</label>
          </div>
        </aside>

        {/* Product Cards Workspace */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-card border border-border rounded-xl p-3.5 shadow-sm">
            <span className="text-xs text-muted-foreground">Showing {processedPackages.length} plans</span>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="size-3.5 text-muted-foreground" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-xs font-semibold border-none outline-none cursor-pointer">
                <option value="popular">Popular</option>
                <option value="price-asc">Lowest Price</option>
                <option value="price-desc">Highest Price</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>
          <PackageGrid/>
        </div>
      </div>
    </section>
  );
}