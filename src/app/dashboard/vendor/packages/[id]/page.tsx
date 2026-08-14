"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPackageByIdQuery } from "@/store/api/slices/packages-api";
import {
  ChevronLeft,
  Clock,
  Edit,
  Gift,
  Users,
  Utensils,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Package } from "@/types/package";
import * as React from "react";

interface PackageViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Extended type for package with rejectionReason from API
interface PackageWithRejectionReason extends Package {
  rejectionReason?: string | null;
  vendorId?: string;
}

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
    icon: React.ReactNode;
  }
> = {
  PENDING: {
    label: "Pending Approval",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: <Clock className="size-4" />,
  },
  APPROVED: {
    label: "Approved",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: <CheckCircle className="size-4" />,
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: <XCircle className="size-4" />,
  },
};

const mealTypeColors: Record<string, string> = {
  BREAKFAST: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  LUNCH: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  SNACKS: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  DINNER: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};

export default function PackageViewPage({ params }: PackageViewPageProps) {
  const router = useRouter();
  // Unwrap params using React.use()
  const { id } = React.use(params);
  const { data: packageData, isLoading, error } = useGetPackageByIdQuery(id);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-[300px] w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  // Error or no data
  if (error || !packageData) {
    notFound();
  }

  // Type assertion for rejectionReason
  const packageWithReason = packageData as PackageWithRejectionReason;

  // Safely access status with fallback
  const statusKey = packageData.status || "PENDING";
  const status = statusConfig[statusKey] || statusConfig.PENDING;
  const isRejected = statusKey === "REJECTED";
  const isApproved = statusKey === "APPROVED";
  const isPending = statusKey === "PENDING";

  // Safely parse prices
  const price =
    typeof packageData.price === "string" ? parseFloat(packageData.price) : packageData.price || 0;

  const discountPrice = packageData.discountPrice
    ? typeof packageData.discountPrice === "string"
      ? parseFloat(packageData.discountPrice)
      : packageData.discountPrice
    : null;

  // Get rejection reason from API response
  const rejectionReason = packageWithReason.rejectionReason || null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="rounded-full" onClick={() => router.back()}>
            <ChevronLeft className="size-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">{packageData.name}</h1>
            {packageData.packageCode && (
              <p className="text-sm text-muted-foreground">{packageData.packageCode}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
              status.className,
            )}
          >
            {status.icon}
            {status.label}
          </span>
          {(isPending || isRejected) && (
            <Link href={`/dashboard/vendor/packages/${id}/edit`}>
              <Button variant="outline" size="sm" className="rounded-full">
                <Edit className="size-4 mr-1.5" />
                Edit
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Rejection Reason */}
      {isRejected && rejectionReason && (
        <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-600 ring-1 ring-red-500/20 dark:text-red-400">
          <span className="font-medium">Rejection Reason:</span> {rejectionReason}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Package Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thumbnail */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-muted">
            <Image
              src={packageData.thumbnail || "/images/home/card_2.png"}
              alt={packageData.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                <Gift className="size-3.5" />
                {packageData.packageType || "Package"}
              </span>
              {packageData.isCustomizable && (
                <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                  Customizable
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-sm font-bold text-foreground mb-3">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {packageData.description || "No description provided."}
            </p>
          </Card>

          {/* Category & Tags */}
          {(packageData.packageCategory || packageData.packageType) && (
            <Card className="p-6">
              <h2 className="text-sm font-bold text-foreground mb-3">Details</h2>
              <div className="flex flex-wrap gap-3">
                {packageData.packageCategory && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {packageData.packageCategory.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {packageData.packageType || "Standard"}
                </span>
                {discountPrice && price > discountPrice && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 text-xs font-medium">
                    {Math.round(((price - discountPrice) / price) * 100)}% OFF
                  </span>
                )}
                {packageData.isCustomizable && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 text-xs font-medium">
                    Customizable
                  </span>
                )}
              </div>
            </Card>
          )}

          {/* Vendor Info */}
          {packageData.vendor && (
            <Card className="p-6">
              <h2 className="text-sm font-bold text-foreground mb-3">Vendor</h2>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {packageData.vendor.businessName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Vendor ID: {packageData.vendor.id}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Days & Meals Schedule */}
          {packageData.days && packageData.days.length > 0 && (
            <Card className="p-6">
              <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <Utensils className="size-4 text-primary" />
                Meal Schedule ({packageData.days.length} Days)
              </h2>
              <div className="space-y-4">
                {packageData.days.map((day, idx) => (
                  <div
                    key={day.id || idx}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <div className="bg-muted/30 px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                          {day.dayNumber || idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {day.title || `Day ${idx + 1}`}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {day.meals?.length || 0} meals
                      </span>
                    </div>
                    {day.description && (
                      <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
                        {day.description}
                      </div>
                    )}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {day.meals?.map((meal, mIdx) => (
                        <div
                          key={meal.id || mIdx}
                          className="bg-card border border-border/80 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={cn(
                                "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                                mealTypeColors[meal.mealType || "BREAKFAST"] ||
                                  "bg-muted text-muted-foreground",
                              )}
                            >
                              {meal.mealType || "Meal"}
                            </span>
                            {meal.mealTime && (
                              <span className="text-[10px] text-muted-foreground">
                                {meal.mealTime}
                              </span>
                            )}
                          </div>
                          <ul className="space-y-1">
                            {meal.foods?.map((food, fIdx) => {
                              const foodName = food.food?.name || food.name || "Unnamed";
                              return (
                                <li
                                  key={food.id || fIdx}
                                  className="flex items-center justify-between text-xs"
                                >
                                  <span className="text-muted-foreground truncate max-w-[120px]">
                                    {foodName}
                                  </span>
                                  <span className="font-medium text-foreground ml-2">
                                    x{food.quantity || 1}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Package Summary</h2>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-foreground">
                  ৳{price.toLocaleString()}
                </span>
                {discountPrice && discountPrice < price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ৳{discountPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discountPrice && discountPrice < price && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Save ৳{(price - discountPrice).toLocaleString()}
                </p>
              )}
            </div>

            <div className="h-px bg-border my-4" />

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold text-foreground">
                  {packageData.durationDays || 0} Days
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Meals</span>
                <span className="font-semibold text-foreground">
                  {packageData.totalMeals || 0} Meals
                </span>
              </div>
              {packageData.rating && packageData.rating > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    {Number(packageData.rating).toFixed(1)}
                  </span>
                </div>
              )}
              {packageData.reviews && packageData.reviews.length > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-semibold text-foreground">
                    {packageData.reviews.length}
                  </span>
                </div>
              )}
            </div>

            <div className="h-px bg-border my-4" />

            {/* Actions */}
            <div className="space-y-2">
              {isApproved && <Button className="w-full rounded-full">View Subscriptions</Button>}
              {(isPending || isRejected) && (
                <Link href={`/dashboard/vendor/packages/${id}/edit`}>
                  <Button variant="outline" className="w-full rounded-full">
                    <Edit className="size-4 mr-1.5" />
                    Edit Package
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
