"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Utensils,
  Building,
  Clock,
  Star,
  Scale,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  XCircle,
  Edit,
  ListChecks,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminFood } from "@/store/api/slices/admin-food-api";
import { PriceTag } from "@/components/common/price-tag";

function InfoBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-4 shadow-[var(--shadow-card)]">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-foreground ring-1 ring-primary/20">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="truncate font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
      <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2 text-sm last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ACTIVE: "bg-success/10 text-success",
    DRAFT: "bg-warning/10 text-warning",
    ARCHIVED: "bg-muted text-muted-foreground dark:bg-muted/50",
    INACTIVE: "bg-muted text-muted-foreground dark:bg-muted/50",
  };
  return (
    <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium", styles[status] ?? styles.INACTIVE)}>
      {status}
    </span>
  );
}

export default function FoodDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: food, isLoading } = useAdminFood(id);

  if (isLoading) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground">Loading food...</div>
    );
  }

  if (!food) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="size-6 text-destructive" />
        </div>
        <h2 className="font-heading text-xl font-bold text-foreground">Food Not Found</h2>
        <Link href="/dashboard/admin/foods" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="size-4" />
          Back to All Foods
        </Link>
      </div>
    );
  }

  const vendorNames = food.vendors.map((v) => v.businessName).join(", ");
  const isAvailable = food.availability?.isAvailable ?? true;
  const mainPrice = food.prices[0];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/dashboard/admin/foods" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to All Foods
        </Link>
        <Link
          href={`/dashboard/admin/foods/${food.id}/edit`}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-[var(--shadow-card)] ring-1 ring-primary/20 transition-all duration-300 hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]"
        >
          <Edit className="size-4" />
          Edit Food
        </Link>
      </div>

      <div className="relative mb-8 overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-card)]">
        {food.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={food.coverImage} alt={food.name} className="aspect-[21/9] w-full object-cover md:aspect-[3/1]" />
        ) : (
          <div className="aspect-[21/9] w-full bg-muted md:aspect-[3/1]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={food.status} />
            {food.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-white">
                <Star className="size-3" fill="currentColor" />
                Featured
              </span>
            )}
            {food.isPopular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300">
                <TrendingUp className="size-3" />
                Popular
              </span>
            )}
            {isAvailable ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
                <CheckCircle className="size-3" />
                Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300">
                <XCircle className="size-3" />
                Unavailable
              </span>
            )}
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
            {food.name}
          </h1>
          {food.shortDescription && (
            <p className="mt-2 max-w-2xl text-sm text-white/80">{food.shortDescription}</p>
          )}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <InfoBadge icon={<Utensils className="size-4" />} label="Category" value={food.category?.name ?? "—"} />
        <InfoBadge icon={<Building className="size-4" />} label="Vendor" value={vendorNames || "—"} />
        <InfoBadge icon={<Scale className="size-4" />} label="Type" value={food.foodType.replace("_", " ")} />
        <InfoBadge icon={<Clock className="size-4" />} label="Cook Time" value={food.preparationTime ? `${food.preparationTime} min` : "—"} />
        <InfoBadge icon={<MessageSquare className="size-4" />} label="Reviews" value={String(food.totalReview ?? 0)} />
        <InfoBadge icon={<Star className="size-4" />} label="Rating" value={food.averageRating ? `${Number(food.averageRating).toFixed(1)}/5` : "—"} />
      </div>

      {food.description && (
        <div className="mb-8">
          <SectionCard title="Description">
            <p className="text-sm leading-relaxed text-muted-foreground">{food.description}</p>
          </SectionCard>
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {(food.calories || food.protein || food.fat || food.carbohydrate) && (
          <SectionCard title="Nutrition">
            <div className="grid gap-3 sm:grid-cols-2">
              {food.calories && <Row label="Calories" value={`${food.calories} kcal`} />}
              {food.protein && <Row label="Protein" value={`${food.protein} g`} />}
              {food.carbohydrate && <Row label="Carbs" value={`${food.carbohydrate} g`} />}
              {food.fat && <Row label="Fat" value={`${food.fat} g`} />}
            </div>
            {food.servingSize && (
              <p className="mt-2 text-xs text-muted-foreground">Serving size: {food.servingSize}</p>
            )}
          </SectionCard>
        )}

        <SectionCard title="Pricing">
          {mainPrice ? (
            <>
              <PriceTag price={Number(mainPrice.basePrice)} size="lg" />
              {mainPrice.salePrice && (
                <p className="mt-1 text-xs text-muted-foreground">Sale price: {mainPrice.salePrice} BDT</p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No base price set yet.</p>
          )}
          {food.prices.length > 1 && (
            <p className="mt-2 text-xs text-muted-foreground">{food.prices.length} price points configured.</p>
          )}
        </SectionCard>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Variants">
          {food.variants.length === 0 ? (
            <p className="text-sm text-muted-foreground">No variants.</p>
          ) : (
            <div className="space-y-2">
              {food.variants.map((v) => (
                <Row key={v.id} label={v.name} value={`${v.discountPrice ?? v.price} BDT`} />
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Addons">
          {food.addons.length === 0 ? (
            <p className="text-sm text-muted-foreground">No addons.</p>
          ) : (
            <div className="space-y-2">
              {food.addons.map((a) => (
                <Row key={a.id} label={a.name} value={a.items.length ? `${a.items.length} items` : "—"} />
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Ingredients">
          {food.ingredients.length === 0 ? (
            <p className="text-sm text-muted-foreground">No ingredients listed.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {food.ingredients.map((i) => (
                <span key={i.id} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {i.ingredientName}
                  {i.quantity ? ` (${i.quantity})` : ""}
                </span>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Diets & Tags">
          <div className="flex flex-wrap gap-2">
            {food.diets.map((d) => (
              <span key={d.id} className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                {d.dietType}
              </span>
            ))}
            {food.tags.map((t) => (
              <span key={t.id} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                {t.name}
              </span>
            ))}
            {food.diets.length === 0 && food.tags.length === 0 && (
              <p className="text-sm text-muted-foreground">No diets or tags.</p>
            )}
          </div>
        </SectionCard>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Schedules">
          {food.schedules.length === 0 ? (
            <p className="text-sm text-muted-foreground">No schedules.</p>
          ) : (
            <div className="space-y-2">
              {food.schedules.map((s) => (
                <Row key={s.id} label={s.mealType} value={`${s.startTime} – ${s.endTime}`} />
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Availability">
          <Row label="Status" value={isAvailable ? "Available" : "Unavailable"} />
          {food.availability?.availableDays?.length ? (
            <Row label="Days" value={food.availability.availableDays.join(", ")} />
          ) : null}
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <ListChecks className="size-4" />
            {food._count.reviews} reviews · {food._count.favorites} favorites
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
