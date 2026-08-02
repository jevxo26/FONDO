// /dashboard/admin/cms/pages/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { pageColumns } from "./page-columns";
import { mockPages, type Page } from "@/data/mock-pages";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";
import { PageDeleteDialog } from "@/components/dashboard/admin/cms/pages/page-delete-dialog";

export default function PagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const handleAdd = useCallback(() => {
    router.push("/dashboard/admin/cms/pages/add");
  }, [router]);

  const handleEdit = useCallback(
    (page: Page) => {
      router.push(`/dashboard/admin/cms/pages/${page.id}/edit`);
    },
    [router],
  );

  const handleDelete = useCallback((page: Page) => {
    setSelectedPage(page);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedPage) {
      setPages((prev) => prev.filter((p) => p.id !== selectedPage.id));
      toast.success("Page deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedPage(null);
    }
  }, [selectedPage]);

  const handleTogglePublish = useCallback((page: Page) => {
    setPages((prev) =>
      prev.map((p) => (p.id === page.id ? { ...p, isPublished: !p.isPublished } : p)),
    );
    toast.success(`Page ${page.isPublished ? "unpublished" : "published"} successfully`);
  }, []);

  const rowActions: RowAction<Page>[] = useMemo(
    () => [
      {
        label: "Edit",
        icon: <span className="sr-only">Edit</span>,
        variant: "default" as const,
        onClick: handleEdit,
      },
      {
        label: "Toggle Publish",
        icon: <span className="sr-only">Toggle</span>,
        variant: "default" as const,
        onClick: handleTogglePublish,
      },
      {
        label: "Delete",
        icon: <span className="sr-only">Delete</span>,
        variant: "destructive" as const,
        onClick: handleDelete,
      },
    ],
    [handleEdit, handleTogglePublish, handleDelete],
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "isPublished",
        title: "Status",
        options: [
          { label: "All", value: "ALL" },
          { label: "Published", value: "true" },
          { label: "Unpublished", value: "false" },
        ],
      },
    ],
    [],
  );

  const toolbarActions = (
    <Button onClick={handleAdd} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Page
    </Button>
  );

  const initialSort: InitialSort = {
    id: "title",
    desc: false,
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Pages" description="Manage your static pages and content." />

      <DataTable
        columns={pageColumns}
        data={pages}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        toolbarActions={toolbarActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />

      <PageDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        page={selectedPage}
      />
    </div>
  );
}
