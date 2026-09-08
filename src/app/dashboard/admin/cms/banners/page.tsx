// /dashboard/admin/cms/banners/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { bannerColumns } from "./banner-columns";
import { mockBanners, type Banner } from "@/data/mock-banners";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";
import { BannerDeleteDialog } from "@/components/dashboard/admin/cms/banners/banner-delete-dialog";

export default function BannersPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  const handleAddBanner = useCallback(() => {
    router.push("/dashboard/admin/cms/banners/add");
  }, [router]);

  const handleEditBanner = useCallback(
    (banner: Banner) => {
      router.push(`/dashboard/admin/cms/banners/${banner.id}/edit`);
    },
    [router],
  );

  const handleDeleteBanner = useCallback((banner: Banner) => {
    setSelectedBanner(banner);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedBanner) {
      setBanners((prev) => prev.filter((b) => b.id !== selectedBanner.id));
      toast.success("Banner deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedBanner(null);
    }
  }, [selectedBanner]);

  const rowActions: RowAction<Banner>[] = useMemo(
    () => [
      {
        label: "Edit",
        icon: <span className="sr-only">Edit</span>,
        variant: "default" as const,
        onClick: handleEditBanner,
      },
      {
        label: "Delete",
        icon: <span className="sr-only">Delete</span>,
        variant: "destructive" as const,
        onClick: handleDeleteBanner,
      },
    ],
    [handleEditBanner, handleDeleteBanner],
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "isActive",
        title: "Status",
        options: [
          { label: "All", value: "ALL" },
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
        ],
      },
    ],
    [],
  );

  const toolbarActions = (
    <Button onClick={handleAddBanner} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Banner
    </Button>
  );

  const initialSort: InitialSort = {
    id: "displayOrder",
    desc: false,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Banners"
        description="Manage your homepage banners and promotional content."
      />

      <DataTable
        columns={bannerColumns}
        data={banners}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        toolbarActions={toolbarActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />

      <BannerDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        banner={selectedBanner}
      />
    </div>
  );
}
