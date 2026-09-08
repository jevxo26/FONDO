"use client";
import { Button } from "@/components/ui/button";
import { Package } from "@/types/package";
import { Check, Clock, Settings, Star, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePackages } from "./packages-context";
interface PackageCardProps {
  pkg: Package;
}


export default function PackageCard({
  pkg,
}: PackageCardProps) {
  const { toggleComparison, comparedIds } = usePackages();

  const isCompared = comparedIds.includes(pkg.id);

  const finalPrice = Number(pkg.discountPrice ?? pkg.price ?? 0);
  const originalPrice = Number(pkg.price ?? 0);
  const displayRating = pkg.rating?.averageRating.toFixed(1);
  const totalReviews = pkg.rating?.totalReview ?? 0;
  console.log("pkg", pkg);
  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
      <div>
        {/* Thumbnail Badge Area */}
        <div className="relative overflow-hidden aspect-4/3 bg-muted">
          <Image
            src={pkg.coverImage || "/upload/"}
            alt={pkg.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <span className="absolute top-3 left-3 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
            {pkg.packageCategory?.name ?? "Meal Plan"}
          </span>

          {pkg.isCustomizable && (
            <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
              Customizable
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col gap-3">
          {/* Header */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {pkg.name}
            </h3>

            <div className="flex items-center gap-1 text-xs font-semibold text-foreground shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{displayRating}</span>
              <span className="text-muted-foreground">({totalReviews})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {pkg.description || "No description provided."}
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-3 gap-2 text-center bg-muted/50 rounded-xl p-2.5 border border-border/40">
            <div>
              <Clock className="mx-auto mb-1 size-3.5 text-muted-foreground" />
              <p className="text-[11px] font-semibold text-foreground">{pkg.durationDays} Days</p>
            </div>

            <div>
              <Utensils className="mx-auto mb-1 size-3.5 text-muted-foreground" />
              <p className="text-[11px] font-semibold text-foreground">{pkg.totalMeals} Meals</p>
            </div>

            <div>
              <Settings className="mx-auto mb-1 size-3.5 text-muted-foreground" />
              <p className="text-[11px] font-semibold text-foreground truncate">{pkg.packageType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pricing & Actions */}
      <div className="p-4 pt-0 flex justify-between items-end gap-2 border-t border-border/30 mt-2">
        <div>
          {pkg.discountPrice && originalPrice > finalPrice && (
            <p className="text-[11px] line-through text-muted-foreground font-medium">
              ৳{originalPrice.toLocaleString()}
            </p>
          )}
          <p className="text-lg font-extrabold text-primary">
            ৳{finalPrice.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => toggleComparison(pkg.id)}
            className={`transition-all ${isCompared ? "bg-primary text-primary-foreground border-primary" : ""
              }`}
          >
            {isCompared && <Check size={13} className="mr-1 shrink-0" />}
            Compare
          </Button>

          <Link
            href={`/packages/${pkg.id}`}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-3 py-1.5 text-xs transition-colors flex items-center"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}