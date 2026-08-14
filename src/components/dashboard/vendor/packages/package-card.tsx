"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminPackageListItem } from "@/store/api/slices/packages-api";
import { AlertCircle, CalendarDays, Edit, Eye, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PackageCardProps {
  package: AdminPackageListItem;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  showActions?: boolean;
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
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-amber-500/20",
    icon: <AlertCircle className="size-3" />,
  },
  APPROVED: {
    label: "Approved",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-emerald-500/20",
    icon: <AlertCircle className="size-3" />,
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-red-500/20",
    icon: <AlertCircle className="size-3" />,
  },
};

export function PackageCard({
  package: pkg,
  onView,
  onEdit,
  showActions = true,
}: PackageCardProps) {
  const status = statusConfig[pkg.status] || statusConfig.PENDING;
  const isRejected = pkg.status === "REJECTED";
  const isApproved = pkg.status === "APPROVED";

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        {/* Image Section */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={pkg.thumbnail || "/images/home/card_2.png"}
            alt={pkg.name}
            fill
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Status Badge - positioned on image */}
          <div className="absolute right-3 top-3">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-[0_2px_8px_rgba(0,0,0,0.15)] ring-1",
                status.className,
              )}
            >
              {status.icon}
              {status.label}
            </span>
          </div>

          {/* Package Code on image */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {pkg.name}
              </h3>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              {pkg.packageCode}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Description */}
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {pkg.description || "No description provided"}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-heading text-[28px] font-bold tracking-tight text-foreground">
              ৳{Number(pkg.price).toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/ package</span>
          </div>

          {/* Stats */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary/8 text-[11px] font-bold text-primary">
                {pkg.totalMeals}
              </span>
              <span>Total Meals</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 text-primary/60" />
              <span>{pkg.durationDays} Days</span>
            </div>
            {pkg.vendor && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4 text-primary/60" />
                <span>{pkg.vendor.businessName}</span>
              </div>
            )}
          </div>

          {/* Tags / Category */}
          {pkg.packageCategory && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary ring-1 ring-primary/15">
                {pkg.packageCategory.name}
              </span>
              <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary ring-1 ring-primary/15">
                {pkg.packageType}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="mt-5 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

          {/* Action Buttons */}
          {showActions && (
            <div className="mt-4 flex items-center gap-2">
              {/* View Button */}
              {onView ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8"
                  onClick={() => onView(pkg.id)}
                >
                  <Eye className="mr-1.5 size-[15px]" />
                  View
                </Button>
              ) : (
                <Link href={`/dashboard/vendor/packages/${pkg.id}`} className="flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-full rounded-xl text-xs font-semibold hover:bg-primary/8"
                  >
                    <Eye className="mr-1.5 size-[15px]" />
                    View
                  </Button>
                </Link>
              )}

              {/* Edit Button - Only enabled for PENDING or REJECTED */}
              {onEdit ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8"
                  onClick={() => onEdit(pkg.id)}
                  disabled={isApproved}
                >
                  <Edit className="mr-1.5 size-[15px]" />
                  Edit
                </Button>
              ) : (
                <Link
                  href={!isApproved ? `/dashboard/vendor/packages/${pkg.id}/edit` : "#"}
                  className={cn("flex-1", isApproved && "pointer-events-none")}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-full rounded-xl text-xs font-semibold hover:bg-primary/8"
                    disabled={isApproved}
                  >
                    <Edit className="mr-1.5 size-[15px]" />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Rejection Reason */}
          {isRejected && pkg.rejectionReason && (
            <div className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600 ring-1 ring-red-500/20 dark:text-red-400">
              <span className="font-medium">Reason:</span> {pkg.rejectionReason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
