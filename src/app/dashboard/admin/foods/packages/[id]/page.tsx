// src/app/dashboard/admin/foods/packages/[id]/page.tsx
"use client";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, Store } from "lucide-react";
import Link from "next/link";
import { useGetPackage } from "@/store/api/slices/packages-api";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

interface PackageDetailPageProps {
  params: {
    id: string;
  };
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  APPROVED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { data: pkg, isLoading } = useGetPackage(params.id);

  if (isLoading) return null;
  if (!pkg) return notFound();

  const statusLabel =
    typeof pkg.status === "string" ? pkg.status.charAt(0) + pkg.status.slice(1).toLowerCase() : "—";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin/foods/packages">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <PageHeader title={pkg.name} description={pkg.description} icon={Package} />
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-medium",
              statusStyles[statusLabel.toUpperCase()],
            )}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start gap-4">
              <div className="size-24 overflow-hidden rounded-xl bg-muted">
                {pkg.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pkg.thumbnail} alt={pkg.name} className="size-full object-cover" />
                ) : null}
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">{pkg.packageCode}</p>
                <h2 className="font-heading text-xl font-bold text-foreground">{pkg.name}</h2>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/15">
                    {pkg.packageType}
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {pkg.durationDays} days
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {pkg.totalMeals} meals
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="mb-4 font-heading text-base font-bold text-foreground">Meal Plan</h3>
            <div className="space-y-4">
              {(pkg.days ?? []).length === 0 && (
                <p className="text-sm text-muted-foreground">No meal plan defined.</p>
              )}
              {pkg.days?.map((day) => (
                <div key={day.dayNumber} className="rounded-xl border border-border bg-background p-4">
                  <p className="mb-2 text-sm font-bold text-foreground">Day {day.dayNumber}</p>
                  <div className="space-y-2">
                    {(day.meals ?? []).map((meal, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="w-24 shrink-0 rounded-md bg-primary/8 px-2 py-0.5 text-center text-xs font-semibold text-primary">
                          {meal.mealType}
                        </span>
                        <span className="text-muted-foreground">
                          {(meal.foods ?? [])
                            .map((f) => f.food?.name)
                            .filter(Boolean)
                            .join(", ") || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="mb-4 font-heading text-base font-bold text-foreground">Pricing</h3>
            <p className="font-heading text-2xl font-bold text-foreground">
              ৳{Number(pkg.price ?? 0).toLocaleString()}
            </p>
            {pkg.discountPrice ? (
              <p className="text-sm text-muted-foreground line-through">
                ৳{Number(pkg.discountPrice).toLocaleString()}
              </p>
            ) : null}
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="mb-4 font-heading text-base font-bold text-foreground">Vendor</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Store className="size-4 text-muted-foreground" />
              {pkg.vendor?.businessName ?? "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
