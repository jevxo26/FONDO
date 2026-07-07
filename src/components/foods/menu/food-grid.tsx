import FoodCard from "@/components/shared/FoodCard";

export default function FoodGrid({ foods }: { foods: any[] }) {
  return (
    <section className="py-12 bg-background">
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((food, index) => (
            <FoodCard 
              key={food.id} 
              food={food} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}