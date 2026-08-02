// /dashboard/admin/cms/blog-categories/add/page.tsx
"use client";

import { BlogCategoryForm } from "@/components/dashboard/admin/cms/blog-categories/blog-category-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddBlogCategoryPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      console.log("Creating category:", data);
      toast.success("Category created successfully");
      router.push("/dashboard/admin/cms/blog-categories");
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Add Category" description="Create a new blog category." />
      <BlogCategoryForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  );
}
