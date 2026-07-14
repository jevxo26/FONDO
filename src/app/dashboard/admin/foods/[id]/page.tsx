import { adminFoods } from "@/data/foods";
import { nutritionItems } from "@/data/nutrition";
import { getFoodDetail } from "@/data/food-detail";
import { RatingStars } from "@/components/common/rating-stars";
import { PriceTag } from "@/components/common/price-tag";
import {
  ArrowLeft, Utensils, Flame, Star, Scale, Building, Clock, Edit,
  TrendingUp, MessageSquare, CheckCircle, XCircle, ThumbsUp, FileEdit, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

function FoodNotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <Eye className="size-6 text-destructive" />
      </div>
      <h2 className="font-fraunces text-xl font-bold text-foreground">Food Not Found</h2>
      <p className="text-sm text-muted-foreground">The food item you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/dashboard/admin/foods"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to All Foods
      </Link>
    </div>
  );
}

function InfoBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-4 shadow-[var(--shadow-card)]">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function NutritionRow({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-medium text-foreground">{value}{unit}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: { author: string; rating: number; comment: string; date: string } }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{review.author}</span>
        <span className="text-xs text-muted-foreground">{review.date}</span>
      </div>
      <div className="mt-2">
        <RatingStars rating={review.rating} size="sm" />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
    </div>
  );
}

export default async function FoodDetailPage({ params }: PageProps) {
  const { id } = await params;
  const food = adminFoods.find((f) => f.id === id);
  if (!food) return <FoodNotFound />;

  const nutrition = nutritionItems.find((n) => n.foodName === food.name);
  const detail = getFoodDetail(food.name);

  const statusStyles: Record<string, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    DRAFT: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    ARCHIVED: "bg-muted text-muted-foreground dark:bg-muted/50",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard/admin/foods"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to All Foods
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] px-4 py-2 text-sm font-medium text-primary shadow-[var(--shadow-card)] ring-1 ring-primary/20 transition-all duration-300 hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
            <Edit className="size-4" />
            Edit
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-amber-500/10 via-card to-amber-500/[0.04] px-4 py-2 text-sm font-medium text-amber-600 shadow-[var(--shadow-card)] ring-1 ring-amber-500/20 transition-all duration-300 hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
            <ThumbsUp className="size-4" />
            Approve
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-destructive/10 via-card to-destructive/[0.04] px-4 py-2 text-sm font-medium text-destructive shadow-[var(--shadow-card)] ring-1 ring-destructive/20 transition-all duration-300 hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
            <XCircle className="size-4" />
            Reject
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-blue-500/10 via-card to-blue-500/[0.04] px-4 py-2 text-sm font-medium text-blue-600 shadow-[var(--shadow-card)] ring-1 ring-blue-500/20 transition-all duration-300 hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
            <FileEdit className="size-4" />
            Request Changes
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-destructive/10 via-card to-destructive/[0.04] px-4 py-2 text-sm font-medium text-destructive shadow-[var(--shadow-card)] ring-1 ring-destructive/20 transition-all duration-300 hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
            <CheckCircle className="size-4" />
            Deactivate
          </button>
        </div>
      </div>

      <div className="relative mb-8 overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-card)]">
        <div className="aspect-[21/9] w-full md:aspect-[3/1]">
          <Image
            src={food.thumbnail}
            alt={food.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-medium",
              statusStyles[food.status],
            )}>
              {food.status}
            </span>
            {food.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-white">
                <Star className="size-3" fill="currentColor" />
                Featured
              </span>
            )}
            {food.isPopular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300">
                <Flame className="size-3" />
                Popular
              </span>
            )}
            {food.isRecommended && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                <Star className="size-3" />
                Recommended
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
              <CheckCircle className="size-3" />
              Available
            </span>
          </div>
          <h1 className="mt-3 font-fraunces text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
            {food.name}
          </h1>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <InfoBadge icon={<Utensils className="size-4" />} label="Category" value={food.categoryName} />
        <InfoBadge icon={<Building className="size-4" />} label="Vendor" value={food.vendor} />
        <InfoBadge icon={<Scale className="size-4" />} label="Type" value={food.foodType.replace("_", " ")} />
        <InfoBadge icon={<Clock className="size-4" />} label="Cook Time" value={`${food.preparationTime} min`} />
        <InfoBadge icon={<TrendingUp className="size-4" />} label="Times Ordered" value={food.timesOrdered.toLocaleString()} />
        <InfoBadge icon={<MessageSquare className="size-4" />} label="Rating" value={`${detail.avgRating} (${detail.totalReviews})`} />
      </div>

      <div className="mb-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-fraunces text-lg font-bold text-foreground">Description</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail.description}</p>
        </div>
      </div>

      {nutrition && (
        <div className="mb-8">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <h2 className="font-fraunces text-lg font-bold text-foreground">Nutrition</h2>
              <span className="text-xs text-muted-foreground">{nutrition.servingSize}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <NutritionRow label="Calories" value={nutrition.calories} unit="" />
                <NutritionRow label="Protein" value={nutrition.protein} unit="g" />
                <NutritionRow label="Carbs" value={nutrition.carbs} unit="g" />
              </div>
              <div className="space-y-2">
                <NutritionRow label="Fat" value={nutrition.fat} unit="g" />
                <NutritionRow label="Fiber" value={nutrition.fiber} unit="g" />
                <NutritionRow label="Sugar" value={nutrition.sugar} unit="g" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces text-lg font-bold text-foreground">Pricing</h2>
            <span className="text-xs text-muted-foreground">Base price before discounts</span>
          </div>
          <div className="mt-4">
            <PriceTag
              price={food.basePrice}
              size="lg"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Sale prices applied at checkout based on active vendor contract
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces text-lg font-bold text-foreground">
              Reviews
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({detail.totalReviews})
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <RatingStars rating={detail.avgRating} size="sm" showValue />
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {detail.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
