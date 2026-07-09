import { FoodControls } from "@/components/dashboard/foods/food-controls";
import { FoodTableSection } from "@/components/dashboard/foods/food-table-section";
import { CreateFoodModal } from "@/components/dashboard/foods/create-food-modal";

export default function FoodsPage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            All Foods
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse and manage all food items across vendors.
          </p>
        </div>
        <CreateFoodModal />
      </div>

      <div className="mt-6">
        <FoodControls />
      </div>

      <div className="mt-6">
        <FoodTableSection />
      </div>
    </div>
  );
}