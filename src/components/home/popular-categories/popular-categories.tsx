import { SectionHeader } from '@/components/common/section-header';
import { CategoryCard } from './category-card';
import { CATEGORY_CARDS } from '@/data/homepage';

export function PopularCategories() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <SectionHeader
          title="Popular Categories"
          description="Open right now and delivering to your area."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {CATEGORY_CARDS.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
