// /dashboard/admin/cms/banners/[id]/edit/page.tsx
"use client";

import { BannerForm } from "@/components/dashboard/admin/cms/banners/banner-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { mockBanners } from "@/data/mock-banners";

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();
  const bannerId = params?.id as string;

  // Find the banner from mock data
  const banner = mockBanners.find((b) => b.id === bannerId);

  const handleSubmit = async (data: any) => {
    try {
      // TODO: Replace with actual API call
      console.log("Updating banner:", data);
      toast.success("Banner updated successfully");
      router.push("/dashboard/admin/cms/banners");
    } catch (error) {
      toast.error("Failed to update banner");
    }
  };

  if (!banner) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Banner not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Banner" description="Update your banner details." />
      <BannerForm onSubmit={handleSubmit} onCancel={() => router.back()} defaultValues={banner} />
    </div>
  );
}
