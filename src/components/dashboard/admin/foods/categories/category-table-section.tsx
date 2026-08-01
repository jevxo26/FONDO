"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Edit, ListChecks, Plus, Trash2 } from "lucide-react";
import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { Button } from "@/components/ui/button";
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
import { categoryColumns } from "./category-columns";
import { CategoryFormDialog } from "./category-form-dialog";
import { SubCategoryDialog } from "./subcategory-dialog";
import type { AdminFoodCategory, AdminFoodSubCategory } from "@/types/admin-food";
import { useAdminFoodCategories, useDeleteCategory } from "@/store/api/slices/admin-food-api";

export function CategoryTableSection() {
  const { data: categories, isLoading } = useAdminFoodCategories();
  const { mutateAsync: deleteCategory, isPending: deleting } = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminFoodCategory | null>(null);
  const [subOpen, setSubOpen] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState<string | undefined>(undefined);
  const [editingSub, setEditingSub] = useState<AdminFoodSubCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminFoodCategory | null>(null);

  const rowActions: RowAction<AdminFoodCategory>[] = [
    {
      label: "Add Sub-Category",
      icon: <Plus className="size-4" />,
      onClick: (cat) => {
        setEditingSub(null);
        setSubCategoryId(cat.id);
        setSubOpen(true);
      },
    },
    {
      label: "Edit Category",
      icon: <Edit className="size-4" />,
      onClick: (cat) => {
        setEditingCategory(cat);
        setFormOpen(true);
      },
    },
    {
      label: "Delete Category",
      icon: <Trash2 className="size-4" />,
      onClick: (cat) => setDeleteTarget(cat),
    },
  ];

  const statusFilter: FacetedFilter = {
    columnId: "status",
    title: "Status",
    icon: <ListChecks className="size-4" />,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCategory(deleteTarget.id);
      toast.success("Category deleted");
      setDeleteTarget(null);
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || "Failed to delete category");
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {categories?.length ?? 0} categories in the catalog
        </p>
        <Button
          size="sm"
          onClick={() => {
            setEditingCategory(null);
            setFormOpen(true);
          }}
        >
          <Plus className="mr-1 size-4" />
          Add Category
        </Button>
      </div>

      <DataTable
        data={categories ?? []}
        columns={categoryColumns}
        rowActions={rowActions}
        filters={[statusFilter]}
        isLoading={isLoading}
        emptyMessage="No categories found."
      />

      <CategoryFormDialog
        key={editingCategory?.id ?? "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editingCategory}
      />

      <SubCategoryDialog
        key={`${subCategoryId ?? "none"}-${editingSub?.id ?? "new"}`}
        open={subOpen}
        onOpenChange={setSubOpen}
        categoryId={subCategoryId}
        subCategory={editingSub}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete &quot;{deleteTarget?.name}&quot; and its sub-categories. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
