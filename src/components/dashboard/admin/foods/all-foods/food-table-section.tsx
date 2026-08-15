"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { useAdminFoods, useAdminFoodCategories, useDeleteFood } from "@/store/api/slices/admin-food-api";
import type { AdminFoodListItem } from "@/types/admin-food";
import { useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Archive, Beef, Eye, FileEdit, Flame, ListChecks } from "lucide-react";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ListChecks className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
    { label: "Archived", value: "ARCHIVED" },
  ],
};

const foodTypeFilter: FacetedFilter = {
  columnId: "foodType",
  title: "Type",
  icon: <Beef className="size-4" />,
  options: [
    { label: "Veg", value: "VEG" },
    { label: "Non-Veg", value: "NON_VEG" },
    { label: "Vegan", value: "VEGAN" },
    { label: "Seafood", value: "SEAFOOD" },
  ],
};

const spiceFilter: FacetedFilter = {
  columnId: "spiceLevel",
  title: "Spice",
  icon: <Flame className="size-4" />,
  options: [
    { label: "Mild", value: "MILD" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Hot", value: "HOT" },
  ],
};

export function FoodTableSection() {
  const router = useRouter();
  const { data, isLoading } = useAdminFoods({ limit: 500 });
  const { data: categories } = useAdminFoodCategories();
  const { mutateAsync: archiveFood, isPending: archiving } = useDeleteFood();
  const [archiveTarget, setArchiveTarget] = useState<AdminFoodListItem | null>(null);

  const items = useMemo(() => data?.items ?? [], [data]);

  const categoryFilter: FacetedFilter = useMemo(
    () => ({
      columnId: "categoryName",
      title: "Category",
      icon: <ListChecks className="size-4" />,
      options: (categories ?? []).map((c) => ({ label: c.name, value: c.name })),
    }),
    [categories],
  );

  const rowActions: RowAction<AdminFoodListItem>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (food) => router.push(`/dashboard/admin/foods/${food.id}`),
    },
    {
      label: "Edit",
      icon: <FileEdit className="size-4" />,
      onClick: (food) => router.push(`/dashboard/admin/foods/${food.id}/edit`),
    },
    {
      label: "Archive",
      icon: <Archive className="size-4" />,
      variant: "destructive",
      onClick: (food) => setArchiveTarget(food),
    },
  ];

  const confirmArchive = async () => {
    if (!archiveTarget) return;
    try {
      await archiveFood(archiveTarget.id);
      toast.success(`"${archiveTarget.name}" archived`);
      setArchiveTarget(null);
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || "Failed to archive food");
    }
  };

  return (
    <>
      <DataTable
        data={items}
        columns={foodColumns}
        rowActions={rowActions}
        filters={[statusFilter, categoryFilter, foodTypeFilter, spiceFilter]}
        isLoading={isLoading}
        emptyMessage="No foods found."
      />
      <AlertDialog open={!!archiveTarget} onOpenChange={(open) => !open && setArchiveTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive food?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive &quot;{archiveTarget?.name}&quot;? It will be hidden
              from the catalog but can be restored later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmArchive} disabled={archiving}>
              {archiving ? "Archiving..." : "Archive"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
