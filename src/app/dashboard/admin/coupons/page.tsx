// /app/dashboard/admin/coupons/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Tag,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { DataTable } from "@/components/common/table";
import { couponColumns } from "./coupon-columns";
import { mockCoupons, type Coupon } from "@/data/mock-coupons";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";
import { CouponDeleteDialog } from "@/components/dashboard/admin/coupons/coupon-delete-dialog";

export default function CouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const stats = useMemo(() => {
    const total = coupons.length;
    const active = coupons.filter((c) => c.status === "ACTIVE").length;
    const expired = coupons.filter((c) => c.status === "EXPIRED").length;
    const scheduled = coupons.filter((c) => c.status === "SCHEDULED").length;
    const draft = coupons.filter((c) => c.status === "DRAFT").length;
    const disabled = coupons.filter((c) => c.status === "DISABLED").length;

    const totalRedemptions = coupons.reduce((sum, c) => sum + c.usedCount, 0);

    const totalSavings = coupons.reduce((sum, c) => {
      if (c.discountType === "PERCENTAGE") {
        const avgOrderValue = 50;
        const savingsPerUse = (c.discountValue / 100) * avgOrderValue;
        return sum + savingsPerUse * c.usedCount;
      } else {
        return sum + c.discountValue * c.usedCount;
      }
    }, 0);

    return {
      total,
      active,
      expired,
      scheduled,
      draft,
      disabled,
      totalRedemptions,
      totalSavings: Math.round(totalSavings * 100) / 100,
    };
  }, [coupons]);

  const handleAdd = useCallback(() => {
    router.push("/dashboard/admin/coupons/add");
  }, [router]);

  const handleEdit = useCallback(
    (coupon: Coupon) => {
      router.push(`/dashboard/admin/coupons/${coupon.id}/edit`);
    },
    [router],
  );

  const handleDuplicate = useCallback((coupon: Coupon) => {
    const newCoupon = {
      ...coupon,
      id: `c${Date.now()}`,
      code: `${coupon.code}_COPY`,
      title: `${coupon.title} (Copy)`,
      usedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCoupons((prev) => [...prev, newCoupon]);
    toast.success("Coupon duplicated successfully");
  }, []);

  const handleDelete = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCoupon) {
      setCoupons((prev) => prev.filter((c) => c.id !== selectedCoupon.id));
      toast.success("Coupon deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedCoupon(null);
    }
  }, [selectedCoupon]);

  const handleToggleStatus = useCallback((coupon: Coupon) => {
    const newStatus = coupon.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === coupon.id ? { ...c, status: newStatus, updatedAt: new Date().toISOString() } : c,
      ),
    );
    toast.success(`Coupon ${newStatus === "ACTIVE" ? "enabled" : "disabled"} successfully`);
  }, []);

  const rowActions: RowAction<Coupon>[] = useMemo(
    () => [
      {
        label: "View",
        icon: <span className="sr-only">View</span>,
        variant: "default" as const,
        onClick: (coupon) => console.log("View", coupon),
      },
      {
        label: "Edit",
        icon: <span className="sr-only">Edit</span>,
        variant: "default" as const,
        onClick: handleEdit,
      },
      {
        label: "Duplicate",
        icon: <span className="sr-only">Duplicate</span>,
        variant: "default" as const,
        onClick: handleDuplicate,
      },
      {
        label: "Toggle Status",
        icon: <span className="sr-only">Toggle</span>,
        variant: "default" as const,
        onClick: handleToggleStatus,
      },
      {
        label: "Delete",
        icon: <span className="sr-only">Delete</span>,
        variant: "destructive" as const,
        onClick: handleDelete,
      },
    ],
    [handleEdit, handleDuplicate, handleToggleStatus, handleDelete],
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "status",
        title: "Status",
        options: [
          { label: "All", value: "ALL" },
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
          { label: "Expired", value: "EXPIRED" },
          { label: "Scheduled", value: "SCHEDULED" },
          { label: "Draft", value: "DRAFT" },
          { label: "Disabled", value: "DISABLED" },
        ],
      },
      {
        columnId: "discountType",
        title: "Discount Type",
        options: [
          { label: "All", value: "ALL" },
          { label: "Percentage", value: "PERCENTAGE" },
          { label: "Fixed", value: "FIXED" },
        ],
      },
      {
        columnId: "appliesTo",
        title: "Applies To",
        options: [
          { label: "All", value: "ALL" },
          { label: "Foods", value: "FOODS" },
          { label: "Packages", value: "PACKAGES" },
          { label: "Category", value: "CATEGORY" },
          { label: "Subscription", value: "SUBSCRIPTION" },
        ],
      },
    ],
    [],
  );

  const toolbarActions = (
    <Button onClick={handleAdd} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Coupon
    </Button>
  );

  const initialSort: InitialSort = {
    id: "createdAt",
    desc: true,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Coupons"
        description="Manage your promotional coupons and discounts."
        icon={Tag}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Coupons" value={stats.total.toString()} icon={Tag} accent="right" />
        <StatCard
          label="Active"
          value={stats.active.toString()}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Expired"
          value={stats.expired.toString()}
          variant="danger"
          icon={XCircle}
          accent="right"
        />
        <StatCard
          label="Scheduled"
          value={stats.scheduled.toString()}
          variant="warning"
          icon={Clock}
          accent="right"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Draft"
          value={stats.draft.toString()}
          variant="default"
          icon={FileText}
          accent="right"
        />
        <StatCard
          label="Disabled"
          value={stats.disabled.toString()}
          variant="default"
          icon={AlertCircle}
          accent="right"
        />
        <StatCard
          label="Total Redemptions"
          value={stats.totalRedemptions.toString()}
          variant="default"
          icon={TrendingUp}
          accent="right"
        />
        <StatCard
          label="Total Savings"
          value={`$${stats.totalSavings.toLocaleString()}`}
          variant="default"
          icon={DollarSign}
          accent="right"
        />
      </div>

      <DataTable
        columns={couponColumns}
        data={coupons}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        toolbarActions={toolbarActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />

      <CouponDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        coupon={selectedCoupon}
      />
    </div>
  );
}
