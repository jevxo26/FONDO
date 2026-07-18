import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal, SectionRevealItem } from "@/components/common/section-reveal";
import { CategoryCard } from "./category-card";

interface PopularCategoriesProps {
  categories: Array<{ id: string; label: string; image: string }>;
}

export function PopularCategories({ categories }: PopularCategoriesProps) {
  return (
    <section>
      <div className="wrapper">
        <SectionHeader
          title="Popular Categories"
          description="Open right now and delivering to your area."
        />
        <SectionReveal
          stagger
          staggerDelay={0.06}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
        >
          {categories.map((category) => (
            <SectionRevealItem key={category.id}>
              <CategoryCard category={category} />
            </SectionRevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
