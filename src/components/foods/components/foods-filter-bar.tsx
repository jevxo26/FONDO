"use client";

interface Props {
  totalCount: number;
  sortBy: string;
  onSortChange: (val: string) => void;
  onPageReset: () => void;
}

export function FoodsFilterBar({ totalCount, sortBy, onSortChange, onPageReset }: Props) {
  return (
    <div className="flex justify-between items-center bg-card border border-border/5 rounded-2xl px-5 py-3 shadow-[var(--shadow-card)]">
      <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        Showing {totalCount} culinary items
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-muted-foreground/80 font-light">Sort By:</span>
        <select
          value={sortBy}
          onChange={(e) => { onSortChange(e.target.value); onPageReset(); }}
          className="bg-transparent text-[11px] font-bold uppercase tracking-wider text-foreground border-none focus:outline-none cursor-pointer"
        >
          <option value="default">Default Framework</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated Metrics</option>
        </select>
      </div>
    </div>
  );
}
