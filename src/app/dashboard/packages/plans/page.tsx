import { Calendar } from "lucide-react";

export default function PackagesPlansPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Calendar className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Meal Plans</h2>
          <p className="mt-1 text-muted-foreground">
            Create and manage meal plan templates for packages.
          </p>
        </div>
      </div>
    </div>
  );
}
