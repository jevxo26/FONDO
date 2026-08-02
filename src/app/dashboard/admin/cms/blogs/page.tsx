// /dashboard/admin/cms/blogs/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { blogColumns } from "./blog-columns";
import { mockBlogs, type Blog } from "@/data/mock-blogs";
import { mockBlogCategories } from "@/data/mock-blog-categories";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";
import { BlogDeleteDialog } from "@/components/dashboard/admin/cms/blogs/blog-delete-dialog";

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleAdd = useCallback(() => {
    router.push("/dashboard/admin/cms/blogs/add");
  }, [router]);

  const handleEdit = useCallback(
    (blog: Blog) => {
      router.push(`/dashboard/admin/cms/blogs/${blog.id}/edit`);
    },
    [router],
  );

  const handleDelete = useCallback((blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedBlog) {
      setBlogs((prev) => prev.filter((b) => b.id !== selectedBlog.id));
      toast.success("Blog deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedBlog(null);
    }
  }, [selectedBlog]);

  const handleToggleStatus = useCallback((blog: Blog) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === blog.id ? { ...b, status: b.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } : b,
      ),
    );
    toast.success(`Blog ${blog.status === "PUBLISHED" ? "unpublished" : "published"} successfully`);
  }, []);

  const categoryOptions = useMemo(
    () => [
      { label: "All", value: "ALL" },
      ...mockBlogCategories.map((c) => ({ label: c.name, value: c.id })),
    ],
    [],
  );

  const rowActions: RowAction<Blog>[] = useMemo(
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
          { label: "Published", value: "PUBLISHED" },
          { label: "Draft", value: "DRAFT" },
        ],
      },
      {
        columnId: "categoryId",
        title: "Category",
        options: categoryOptions,
      },
    ],
    [categoryOptions],
  );

  const toolbarActions = (
    <Button onClick={handleAdd} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Blog
    </Button>
  );

  const initialSort: InitialSort = {
    id: "createdAt",
    desc: true,
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Blogs" description="Manage your blog posts and content." />

      <DataTable
        columns={blogColumns}
        data={blogs}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        toolbarActions={toolbarActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />

      <BlogDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        blog={selectedBlog}
      />
    </div>
  );
}
