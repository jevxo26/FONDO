import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FoodPackage } from "@/data/packages";
import { Users, BarChart3, Eye, Edit, Flame, Zap } from "lucide-react";

interface PackageCardProps {
  pkg: FoodPackage;
}

const typeIcons: Record<string, typeof Flame> = {
  "Weight Loss": Flame,
  "Weight Gain": Flame,
  Diabetic: Zap,
  "High Protein": Zap,
  Regular: Flame,
};

const typeColors: Record<string, string> = {
  "Weight Loss": "bg-orange-500/10 text-orange-600 ring-orange-500/20",
  "Weight Gain": "bg-blue-500/10 text-blue-600 ring-blue-500/20",
  Diabetic: "bg-green-500/10 text-green-600 ring-green-500/20",
  "High Protein": "bg-purple-500/10 text-purple-600 ring-purple-500/20",
  Regular: "bg-primary/10 text-primary ring-primary/20",
};

export function PackageCard({ pkg }: PackageCardProps) {
  const TypeIcon = typeIcons[pkg.packageType] || Flame;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={pkg.thumbnail}
            alt={pkg.name}
            fill
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2">
              <h3 className="font-fraunces text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {pkg.name}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1", typeColors[pkg.packageType])}>
              <TypeIcon className="size-3" />
              {pkg.packageType}
            </span>
            <span className="text-[11px] text-muted-foreground">{pkg.durationDays} days</span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {pkg.description}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary/[0.03] p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Daily Calories
              </p>
              <p className="mt-0.5 font-fraunces text-lg font-bold text-foreground">
                {pkg.dailyCalories.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-primary/[0.03] p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Protein
              </p>
              <p className="mt-0.5 font-fraunces text-lg font-bold text-foreground">
                {pkg.dailyProtein}g
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-fraunces text-[28px] font-bold tracking-tight text-foreground">
              ৳{pkg.price.toLocaleString()}
            </span>
            {pkg.discountPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ৳{pkg.discountPrice.toLocaleString()}
                </span>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                  {Math.round((1 - pkg.discountPrice / pkg.price) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4 text-primary/60" />
            <span>{pkg.subscriberCount.toLocaleString()} subscribers</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {pkg.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary ring-1 ring-primary/15"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className={cn("mt-5 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent")} />

          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8">
              <Eye className="mr-1.5 size-[15px]" />
              View
            </Button>
            <Button variant="ghost" size="sm" className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8">
              <Edit className="mr-1.5 size-[15px]" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8">
              <BarChart3 className="mr-1.5 size-[15px]" />
              Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
