// /dashboard/admin/cms/blog-categories/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { blogCategoryColumns } from "./blog-category-columns";
import { mockBlogCategories, type BlogCategory } from "@/data/mock-blog-categories";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";
import { BlogCategoryDeleteDialog } from "@/components/dashboard/admin/cms/blog-categories/blog-category-delete-dialog";

export default function BlogCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<BlogCategory[]>(mockBlogCategories);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);

  const handleAdd = useCallback(() => {
    router.push("/dashboard/admin/cms/blog-categories/add");
  }, [router]);

  const handleEdit = useCallback(
    (category: BlogCategory) => {
      router.push(`/dashboard/admin/cms/blog-categories/${category.id}/edit`);
    },
    [router],
  );

  const handleDelete = useCallback((category: BlogCategory) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCategory) {
      setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
      toast.success("Category deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    }
  }, [selectedCategory]);

  const handleToggleStatus = useCallback((category: BlogCategory) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === category.id ? { ...c, status: c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : c,
      ),
    );
    toast.success(
      `Category ${category.status === "ACTIVE" ? "deactivated" : "activated"} successfully`,
    );
  }, []);

  const rowActions: RowAction<BlogCategory>[] = useMemo(
    () => [
      {
        label: "Edit",
        icon: <span className="sr-only">Edit</span>,
        variant: "default" as const,
        onClick: handleEdit,
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
    [handleEdit, handleToggleStatus, handleDelete],
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
    <Button onClick={handleAdd} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Category
    </Button>
  );

  const initialSort: InitialSort = {
    id: "name",
    desc: false,
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Blog Categories" description="Manage your blog categories and topics." />

      <DataTable
        columns={blogCategoryColumns}
        data={categories}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        toolbarActions={toolbarActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />

      <BlogCategoryDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        category={selectedCategory}
      />
    </div>
  );
}
