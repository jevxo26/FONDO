// /dashboard/admin/cms/blog-categories/[id]/edit/page.tsx
"use client";

import { BlogCategoryForm } from "@/components/dashboard/admin/cms/blog-categories/blog-category-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { mockBlogCategories } from "@/data/mock-blog-categories";

export default function EditBlogCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id as string;

  const category = mockBlogCategories.find((c) => c.id === categoryId);

  const handleSubmit = async (data: any) => {
    try {
      console.log("Updating category:", data);
      toast.success("Category updated successfully");
      router.push("/dashboard/admin/cms/blog-categories");
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Category" description="Update your blog category details." />
      <BlogCategoryForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        defaultValues={category}
      />
    </div>
  );
}
