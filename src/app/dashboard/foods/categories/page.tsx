import { ListTree } from "lucide-react";

export default function FoodsCategoriesPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <ListTree className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Categories</h2>
          <p className="mt-1 text-muted-foreground">Manage food categories and sub-categories.</p>
        </div>
      </div>
    </div>
  );
}
