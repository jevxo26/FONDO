// /dashboard/admin/cms/sliders/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { sliderColumns } from "./slider-columns";
import { mockSliders, type Slider } from "@/data/mock-sliders";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";
import { SliderDeleteDialog } from "@/components/dashboard/admin/cms/sliders/slider-delete-dialog";

export default function SlidersPage() {
  const router = useRouter();
  const [sliders, setSliders] = useState<Slider[]>(mockSliders);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null);

  const handleAddSlider = useCallback(() => {
    router.push("/dashboard/admin/cms/sliders/add");
  }, [router]);

  const handleEditSlider = useCallback(
    (slider: Slider) => {
      router.push(`/dashboard/admin/cms/sliders/${slider.id}/edit`);
    },
    [router],
  );

  const handleDeleteSlider = useCallback((slider: Slider) => {
    setSelectedSlider(slider);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedSlider) {
      setSliders((prev) => prev.filter((s) => s.id !== selectedSlider.id));
      toast.success("Slider deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedSlider(null);
    }
  }, [selectedSlider]);

  const handleToggleStatus = useCallback((slider: Slider) => {
    setSliders((prev) =>
      prev.map((s) =>
        s.id === slider.id ? { ...s, status: s.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : s,
      ),
    );
    toast.success(
      `Slider ${slider.status === "ACTIVE" ? "deactivated" : "activated"} successfully`,
    );
  }, []);

  const rowActions: RowAction<Slider>[] = useMemo(
    () => [
      {
        label: "Edit",
        icon: <span className="sr-only">Edit</span>,
        variant: "default" as const,
        onClick: handleEditSlider,
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
        onClick: handleDeleteSlider,
      },
    ],
    [handleEditSlider, handleToggleStatus, handleDeleteSlider],
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
        ],
      },
    ],
    [],
  );

  const toolbarActions = (
    <Button onClick={handleAddSlider} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Slider
    </Button>
  );

  const initialSort: InitialSort = {
    id: "displayOrder",
    desc: false,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Sliders"
        description="Manage your homepage sliders and carousel content."
      />

      <DataTable
        columns={sliderColumns}
        data={sliders}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        toolbarActions={toolbarActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />

      <SliderDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        slider={selectedSlider}
      />
    </div>
  );
}
