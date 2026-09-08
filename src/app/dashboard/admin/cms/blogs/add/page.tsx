// /dashboard/admin/cms/blogs/add/page.tsx
"use client";

import { BlogForm } from "@/components/dashboard/admin/cms/blogs/blog-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      console.log("Creating blog:", data);
      toast.success("Blog created successfully");
      router.push("/dashboard/admin/cms/blogs");
    } catch {
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Add Blog" description="Create a new blog post." />
      <BlogForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  );
}
