import FoodCard from '@/components/common/cards/food-card/food-card';
import { Food } from '@/types/food';

export default function FoodGrid({ foods }: { foods: Food[] }) {
  return (
    <section className="py-12 bg-background">
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((food, index) => (
            <FoodCard key={index} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
}
