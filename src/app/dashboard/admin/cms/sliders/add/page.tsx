// /dashboard/admin/cms/sliders/add/page.tsx
"use client";

import { SliderForm } from "@/components/dashboard/admin/cms/sliders/slider-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddSliderPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      console.log("Creating slider:", data);
      toast.success("Slider created successfully");
      router.push("/dashboard/admin/cms/sliders");
    } catch (error) {
      toast.error("Failed to create slider");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Add Slider" description="Create a new slider for your homepage." />
      <SliderForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  );
}
