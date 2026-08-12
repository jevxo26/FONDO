// src/app/dashboard/admin/foods/packages/page.tsx
'use client';

import { PageHeader } from "@/components/dashboard/common/page-header";
import { PackageCard, type FoodPackage } from "@/components/dashboard/admin/foods/packages/package-card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Download, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useListAdminPackagesQuery, useDeletePackageMutation, AdminPackageListItem } from "@/store/api/slices/packages-api";
import FoodsLoading from "@/app/(main)/foods/loading";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
] as const;

export default function FoodPackagesPage() {
  const [status, setStatus] = useState<string>("");
  const params = { limit: 100, ...(status ? { status } : {}) };

  const { data: result, isLoading } = useListAdminPackagesQuery(params);
  const [deletePackage] = useDeletePackageMutation();

  const handleDeletePackage = (pkg: FoodPackage) => {
    const packageId = pkg.id || pkg._id;

    if (!packageId) {
      Swal.fire({
        title: "Error",
        text: "Package ID is missing. Cannot perform deletion.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${pkg.name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deletePackage(packageId).unwrap();
        } catch (error: any) {
          Swal.showValidationMessage(
            error?.data?.message || "Failed to delete package. Please try again."
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `"${pkg.name}" has been deleted.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  if (isLoading) return <FoodsLoading />;

  const allPackages = result?.items ?? [];

  return (
    <div>
      <PageHeader
        title="Packages"
        description="Manage dietary meal packages for subscription plans."
        icon={Package}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/dashboard/admin/foods/packages/approval">
              <Button variant="outline" className="rounded-full">
                <ClipboardCheck className="size-4.5" />
                Approval Queue
              </Button>
            </Link>
            <Button variant="outline" className="rounded-full">
              <Download className="size-4.5" />
              Export
            </Button>
            <Link href="/dashboard/admin/foods/packages/add">
              <Button className="rounded-full">
                <Plus className="size-4.5" />
                Add Package
              </Button>
            </Link>
          </div>
        }
      />

      <div className="mt-6 flex items-center gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatus(tab.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer",
              status === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {allPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg as AdminPackageListItem}
            onDelete={handleDeletePackage}
          />
        ))}
        {allPackages.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-16">
            No packages found.
          </p>
        )}
      </div>
    </div>
  );
}