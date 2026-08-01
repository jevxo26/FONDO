import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart3, Eye, Edit, Flame, Calendar, Utensils, Sliders, Hash } from "lucide-react";
import Link from "next/link";

// API Data Interface definition
export interface FoodPackage {
  id: string;
  name: string;
  description: string;
  packageType: string; 
  durationDays: number;
  totalMeals: number;
  price: string;
  discountPrice?: string | null;
  currency: string;
  isCustomizable: boolean;
  thumbnail: string;
  coverImage?: string;
  packageCode: string;
  status: string;
}

interface PackageCardProps {
  pkg: FoodPackage;
}

const typeColors: Record<string, string> = {
  WEEKLY: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
  DAILY: "bg-green-500/10 text-green-600 ring-green-500/20",
  MONTHLY: "bg-purple-500/10 text-purple-600 ring-purple-500/20",
  DEFAULT: "bg-primary/10 text-primary ring-primary/20",
};

export function PackageCard({ pkg }: PackageCardProps) {
  // Price calculations safely converted from string to number
  const originalPrice = Number(pkg.price) || 0;
  const sellingPrice = pkg.discountPrice ? Number(pkg.discountPrice) : originalPrice;
  const hasDiscount = pkg.discountPrice && originalPrice > sellingPrice;
  
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
    : 0;

  const typeBadgeColor = typeColors[pkg.packageType?.toUpperCase()] || typeColors.DEFAULT;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-card to-primary/[0.04] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-1.75 rotate-45 border border-primary/30" />

      <div className="relative z-10">
        {/* Image & Title */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={pkg.thumbnail || "/placeholder-food.jpg"}
            alt={pkg.name}
            fill
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-heading text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] line-clamp-1">
              {pkg.name}
            </h3>
          </div>
        </div>

        <div className="p-5">
          {/* Badges & Duration */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1",
                typeBadgeColor
              )}
            >
              <Flame className="size-3" />
              {pkg.packageType}
            </span>

            {pkg.isCustomizable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-orange-600 ring-1 ring-orange-500/20">
                <Sliders className="size-2.5" />
                Customizable
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {pkg.description}
          </p>

          {/* Key Metrics Grid (Updated to real data) */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary/[0.03] p-3 flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="size-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Duration
                </p>
                <p className="font-heading text-sm font-bold text-foreground">
                  {pkg.durationDays} Days
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-primary/[0.03] p-3 flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Utensils className="size-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Total Meals
                </p>
                <p className="font-heading text-sm font-bold text-foreground">
                  {pkg.totalMeals} Meals
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-heading text-[26px] font-bold tracking-tight text-foreground">
              ৳{sellingPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ৳{originalPrice.toLocaleString()}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Package Code */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Hash className="size-3.5 text-primary/60" />
            <span>Code: {pkg.packageCode}</span>
          </div>

          <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent" />

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2">
            <Button
  variant="ghost"
  size="sm"
  className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8"
>
  <Link href={`/packages/${pkg.id}`}>
    <Eye className="mr-1.5 size-3.75" />
    View
  </Link>
</Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8"
            >
              <Edit className="mr-1.5 size-[15px]" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}