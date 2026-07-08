import { Utensils } from "lucide-react";

export default function FoodsPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Utensils className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            All Foods
          </h2>
          <p className="mt-1 text-muted-foreground">
            Browse and manage all food items across vendors.
          </p>
        </div>
      </div>
    </div>
  );
}
