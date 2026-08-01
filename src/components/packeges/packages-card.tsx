"use client";

import { Check, Clock, Settings, Star, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePackages } from "./packages-context";

interface PackageCardProps {
  pkg: ApiPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const { toggleComparison, comparedIds } = usePackages();

  const isCompared = comparedIds.includes(pkg.id);

  const finalPrice = Number(pkg.discountPrice ?? pkg.price);
  const originalPrice = Number(pkg.price);

  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={pkg.thumbnail || "/placeholder.jpg"}
          alt={pkg.name}
          width={600}
          height={400}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-lg">
          {pkg.packageCategory?.name ?? "Package"}
        </span>

        {pkg.isCustomizable && (
          <span className="absolute top-3 right-3 bg-green-600 text-white text-[10px] px-2 py-1 rounded-lg">
            Customizable
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-4">
        {/* Title */}
        <div className="flex justify-between gap-2">
          <h3 className="font-semibold line-clamp-1">{pkg.name}</h3>

          <div className="flex items-center gap-1 text-xs">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            {pkg.rating ?? 0}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>

        {/* Info */}
        <div className="grid grid-cols-3 gap-2 text-center bg-muted rounded-xl p-3">
          <div>
            <Clock className="mx-auto mb-1 size-4 text-primary" />
            <p className="text-xs font-medium">{pkg.durationDays} Days</p>
          </div>

          <div>
            <Utensils className="mx-auto mb-1 size-4 text-primary" />
            <p className="text-xs font-medium">{pkg.totalMeals} Meals</p>
          </div>

          <div>
            <Settings className="mx-auto mb-1 size-4 text-primary" />
            <p className="text-xs font-medium">{pkg.packageType}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-end">
          <div>
            {pkg.discountPrice && (
              <p className="text-xs line-through text-muted-foreground">৳{originalPrice}</p>
            )}

            <p className="text-lg font-bold text-primary">৳{finalPrice}</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleComparison(pkg.id)}
              className={`border rounded-lg px-3 py-2 text-xs transition ${
                isCompared ? "bg-primary text-white border-primary" : "border-border"
              }`}
            >
              <Check size={14} className={`inline mr-1 ${isCompared ? "block" : "hidden"}`} />
              Compare
            </button>

            <Link
              href={`/packages/${pkg.id}`}
              className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
