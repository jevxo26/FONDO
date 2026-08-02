// /dashboard/admin/cms/blogs/[id]/edit/page.tsx
"use client";

import { BlogForm } from "@/components/dashboard/admin/cms/blogs/blog-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { mockBlogs } from "@/data/mock-blogs";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  const blog = mockBlogs.find((b) => b.id === blogId);

  const handleSubmit = async (data: any) => {
    try {
      console.log("Updating blog:", data);
      toast.success("Blog updated successfully");
      router.push("/dashboard/admin/cms/blogs");
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Blog" description="Update your blog post." />
      <BlogForm onSubmit={handleSubmit} onCancel={() => router.back()} defaultValues={blog} />
    </div>
  );
}
