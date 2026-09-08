"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Button } from "@/components/ui/button";
import { useListVendorPackagesQuery } from "@/store/api/slices/packages-api";
import { AlertCircle, CheckCircle2, Clock, Gift, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-warning/10 text-warning",
  APPROVED: "bg-success/10 text-success",
  REJECTED: "bg-destructive/10 text-destructive",
};

export default function VendorPackagesPage() {
  const { data, isLoading } = useListVendorPackagesQuery();

  const packages = data ?? [];
  const pending = packages.filter((p) => p.status === "PENDING").length;
  const approved = packages.filter((p) => p.status === "APPROVED").length;
  const rejected = packages.filter((p) => p.status === "REJECTED").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Packages"
        description="Create meal packages and submit them for admin approval."
        icon={Gift}
        actions={
          <Link href="/dashboard/vendor/packages/add">
            <Button className="rounded-full">
              <Plus className="size-4.5" />
              Create Package
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Packages"
          value={isLoading ? "…" : packages.length.toString()}
          icon={Gift}
          accent="right"
        />
        <StatCard
          label="Pending Approval"
          value={isLoading ? "…" : pending.toString()}
          variant="warning"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="Approved"
          value={isLoading ? "…" : approved.toString()}
          variant="success"
          icon={CheckCircle2}
          accent="right"
        />
        <StatCard
          label="Rejected"
          value={isLoading ? "…" : rejected.toString()}
          variant="danger"
          icon={AlertCircle}
          accent="right"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elevated)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {pkg.packageCode}
                </p>
                <h3 className="font-heading text-lg font-bold text-foreground">{pkg.name}</h3>
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                  statusStyles[pkg.status],
                )}
              >
                {pkg.status}
              </span>
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {pkg.description || "—"}
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{pkg.durationDays} days</span>
              <span>{pkg.totalMeals} meals</span>
            </div>

            <p className="mt-3 font-heading text-xl font-bold text-foreground">
              ৳{Number(pkg.price).toLocaleString()}
            </p>

            {pkg.status === "REJECTED" && pkg.rejectionReason && (
              <p className="mt-3 rounded-lg bg-red-500/5 px-3 py-2 text-xs text-red-600 ring-1 ring-red-500/15">
                Reason: {pkg.rejectionReason}
              </p>
            )}
          </div>
        ))}

        {!isLoading && packages.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border py-16 text-center">
            <Gift className="mx-auto mb-3 size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No packages yet. Create your first meal package to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
