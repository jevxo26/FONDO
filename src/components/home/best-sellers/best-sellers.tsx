import { SectionHeader } from '@/components/common/section-header';
import FoodCard from '@/components/shared/FoodCard';
import { Button } from '@/components/ui/button';
import { BEST_SELLERS } from '@/data/homepage';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
}
