import FoodCard from '@/components/common/cards/food-card/food-card';
import { SectionHeader } from '@/components/common/section-header';
import { Button } from '@/components/ui/button';
import { BEST_SELLERS } from '@/data/homepage';
import type { Food } from '@/types/food';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function toFood(item: (typeof BEST_SELLERS)[number]): Food {
  return {
    id: String(item.id),
    name: item.title,
    price: item.price,
    shortDescription: item.description,
    description: item.description,
    thumbnail: item.thumbnail,
    slug: item.title.toLowerCase().replace(/\s+/g, '-'),
    preparationTime: parseInt(item.time) || 30,
    coverImage: item.thumbnail,
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    servingSize: '',
    foodType: '',
    spiceLevel: '',
    isFeatured: false,
    isPopular: true,
    isRecommended: false,
    status: 'active',
    categoryId: '',
    subCategoryId: '',
    foodCode: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  };
}

export function BestSellers() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <SectionHeader
          title="Best Sellers"
          description="Near Dhanmondi, Dhaka"
          action={
            <Button
              variant="outline"
              size="lg"
              className="gap-2 h-auto py-3 px-4 rounded-full"
              nativeButton={false}
              render={<Link href="/foods" />}
            >
              View Full Menu
              <ArrowRight className="size-4" />
            </Button>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BEST_SELLERS.map((food) => (
            <FoodCard key={food.id} food={toFood(food)} />
          ))}
        </div>
      </div>
    </section>
  );
}
