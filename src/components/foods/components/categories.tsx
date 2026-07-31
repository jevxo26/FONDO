import React from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  subCategories?: Category[];
}

interface CategoriesProps {
  cat: Category;
  activeCategory: string;
  setActiveCategory: (name: string) => void;
  setActiveSubCategory: (name: string) => void;
  setCurrentPage: (page: number) => void;
  activeSubCategory: string;
}

const categories = ({
  cat,
  activeCategory,
  setActiveCategory,
  setActiveSubCategory,
  setCurrentPage,
  activeSubCategory,
}: CategoriesProps) => {
  const isActive = activeCategory === cat.name;

  return (
    <div>
      <div key={cat.id} className="space-y-1">
        <button
          onClick={() => {
            setActiveCategory(cat.name);
            setActiveSubCategory("All");
            setCurrentPage(1);
          }}
          className={cn(
            "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isActive
              ? "bg-gradient-to-r from-primary/10 to-transparent border-l-[2px] border-primary text-primary font-bold shadow-[inset_0_1px_1px_rgba(206,163,89,0.08)]"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <div className="flex items-center gap-2">
            {isActive && <div className="size-1.5 shrink-0 rotate-45 bg-primary" />}
            <span>{cat.name}</span>
          </div>
        </button>

        {isActive && cat.subCategories && cat.subCategories.length > 0 && (
          <div className="relative ml-4 pl-4 border-l border-primary/20">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
            <div className="flex flex-col gap-0.5">
              {cat.subCategories!.map((sub, i) => {
                const isLast = i === cat.subCategories!.length - 1;
                const isSubActive = activeSubCategory === sub.name;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveSubCategory(sub.name);
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "relative text-[10px] py-1.5 text-left transition-colors duration-300 flex items-center gap-2",
                      isSubActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    <div
                      className="absolute left-[-17px] top-1/2 h-px w-3 bg-primary/30"
                      style={{ display: isLast ? "none" : undefined }}
                    />
                    <div
                      className={cn(
                        "absolute left-[-20px] top-1/2 -translate-y-1/2 size-1.5 rotate-45 transition-all duration-300",
                        isSubActive
                          ? "bg-primary shadow-[0_0_6px_rgba(206,163,89,0.4)]"
                          : "bg-primary/40",
                      )}
                    />
                    <span className={cn(isSubActive ? "ml-4" : "ml-4")}>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default categories;
