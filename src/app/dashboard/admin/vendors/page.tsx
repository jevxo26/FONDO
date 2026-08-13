"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { BottomWidgets } from "@/components/dashboard/admin/vendors/all-vendors/bottom-widgets";
import { VendorsTable } from "@/components/dashboard/admin/vendors/all-vendors/vendors-table";
import { CheckCircle, Clock, Plus, Store, Wallet } from "lucide-react";
import Link from "next/link";
import { useListVendorsQuery } from "@/store/api/slices/admin-vendor-api";

export default function VendorsPage() {
  const { data: vendors = [], isLoading, isError } = useListVendorsQuery();

  const active = vendors.filter((v) => v.status === "APPROVED").length;
  const pending = vendors.filter((v) => v.status === "PENDING").length;

  return (
    <div>
      <PageHeader
        title="Vendor Management"
        description="Register, manage, and monitor vendor operations across the platform."
        icon={Store}
        actions={
          <Link
            href="/dashboard/admin/vendors/add"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add Vendor
          </Link>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatCard
          label="Total Vendors"
          value={isLoading ? "..." : vendors.length}
          icon={Store}
          accent="right"
        />
        <StatCard
          label="Approved Vendors"
          value={isLoading ? "..." : active}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Pending Approval"
          value={isLoading ? "..." : pending}
          variant="warning"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="Total Balance"
          value="৳0" // Can be integrated once global wallet endpoint is connected
          variant="default"
          icon={Wallet}
          accent="right"
        />
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center rounded-lg border text-muted-foreground">
            Loading vendors...
          </div>
        ) : isError ? (
          <div className="flex h-48 items-center justify-center rounded-lg border border-destructive/20 text-destructive">
            Failed to load vendors list.
          </div>
        ) : (
          <VendorsTable vendors={vendors} />
        )}
      </div>

      <div className="mt-8">
        <BottomWidgets />
      </div>
    </div>
  );
}