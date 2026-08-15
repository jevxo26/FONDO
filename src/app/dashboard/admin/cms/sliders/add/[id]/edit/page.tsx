// /dashboard/admin/cms/sliders/[id]/edit/page.tsx
"use client";

import { SliderForm } from "@/components/dashboard/admin/cms/sliders/slider-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { mockSliders } from "@/data/mock-sliders";

export default function EditSliderPage() {
  const router = useRouter();
  const params = useParams();
  const sliderId = params?.id as string;

  const slider = mockSliders.find((s) => s.id === sliderId);

  const handleSubmit = async (data: any) => {
    try {
      console.log("Updating slider:", data);
      toast.success("Slider updated successfully");
      router.push("/dashboard/admin/cms/sliders");
    } catch (error) {
      toast.error("Failed to update slider");
    }
  };

  if (!slider) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Slider not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Slider" description="Update your slider details." />
      <SliderForm onSubmit={handleSubmit} onCancel={() => router.back()} defaultValues={slider} />
    </div>
  );
}
