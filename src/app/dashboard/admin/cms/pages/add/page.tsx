// /dashboard/admin/cms/pages/add/page.tsx
"use client";

import { PageForm } from "@/components/dashboard/admin/cms/pages/page-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddPagePage() {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      console.log("Creating page:", data);
      toast.success("Page created successfully");
      router.push("/dashboard/admin/cms/pages");
    } catch {
      toast.error("Failed to create page");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Add Page" description="Create a new static page." />
      <PageForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  );
}
