// /dashboard/admin/cms/banners/add/page.tsx
"use client";

import { BannerForm } from "@/components/dashboard/admin/cms/banners/banner-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddBannerPage() {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // TODO: Replace with actual API call
      console.log("Creating banner:", data);
      toast.success("Banner created successfully");
      router.push("/dashboard/admin/cms/banners");
    } catch {
      toast.error("Failed to create banner");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Add Banner" description="Create a new banner for your homepage." />
      <BannerForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  );
}
