import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FoodCategoryOption {
  id: string;
  name: string;
  subCategories?: FoodCategoryOption[];
  _count?: { foods?: number };
}

interface CategoriesProps {
  cat: FoodCategoryOption;
  activeCategory: string;
  setActiveCategory: (name: string) => void;
  setActiveSubCategory: (name: string) => void;
  setCurrentPage: (page: number) => void;
  activeSubCategory: string;
}

export default function Categories({
  cat,
  activeCategory,
  setActiveCategory,
  setActiveSubCategory,
  setCurrentPage,
  activeSubCategory,
}: CategoriesProps) {
  const isActive = activeCategory === cat.name;
  const count = cat._count?.foods ?? 0;

  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          setActiveCategory(cat.name);
          setActiveSubCategory("All");
          setCurrentPage(1);
        }}
        className={cn(
          "w-full justify-between text-left",
          isActive
            ? "border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent font-bold text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <div className="flex items-center gap-2">
          {isActive && <div className="size-1.5 shrink-0 rotate-45 bg-primary" />}
          <span>{cat.name}</span>
        </div>
        {count > 0 && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums",
              isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            {count}
          </span>
        )}
      </Button>

      {isActive && cat.subCategories && cat.subCategories.length > 0 && (
        <div className="relative ml-4 border-l border-primary/20 pl-4">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
          <div className="flex flex-col gap-0.5">
            {cat.subCategories.map((sub) => {
              const isSubActive = activeSubCategory === sub.name;

              return (
                <Button
                  key={sub.id}
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    setActiveSubCategory(sub.name);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "relative justify-start text-left text-[10px] duration-300",
                    isSubActive ? "font-bold text-primary" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <span className="absolute left-[-17px] top-1/2 h-px w-3 bg-primary/30" />
                  <span
                    className={cn(
                      "absolute left-[-20px] top-1/2 size-1.5 -translate-y-1/2 rotate-45 transition-all duration-300",
                      isSubActive
                        ? "bg-primary shadow-[0_0_6px_var(--primary)]"
                        : "bg-primary/40",
                    )}
                  />
                  <span className="ml-4">{sub.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function CategoryChips({
  categories,
  activeCategory,
  onSelect,
  className,
}: {
  categories: FoodCategoryOption[];
  activeCategory: string;
  onSelect: (name: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {["All", ...categories.map((c) => c.name)].map((name) => {
        const isActive = activeCategory === name;
        return (
          <Button
            key={name}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSelect(name)}
            aria-pressed={isActive}
            className={cn(
              "h-9 shrink-0 rounded-full px-4 text-xs font-semibold whitespace-nowrap uppercase tracking-wider duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-badge)]"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
}
