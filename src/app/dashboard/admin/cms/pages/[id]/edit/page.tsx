// /dashboard/admin/cms/pages/[id]/edit/page.tsx
"use client";

import { PageForm } from "@/components/dashboard/admin/cms/pages/page-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { mockPages } from "@/data/mock-pages";

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const pageId = params?.id as string;

  const page = mockPages.find((p) => p.id === pageId);

  const handleSubmit = async (data: any) => {
    try {
      console.log("Updating page:", data);
      toast.success("Page updated successfully");
      router.push("/dashboard/admin/cms/pages");
    } catch (error) {
      toast.error("Failed to update page");
    }
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Page not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Page" description="Update your static page." />
      <PageForm onSubmit={handleSubmit} onCancel={() => router.back()} defaultValues={page} />
    </div>
  );
}
