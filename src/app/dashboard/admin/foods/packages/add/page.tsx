// src/app/dashboard/admin/packages/add/page.tsx
import AddPackageForm from "@/components/dashboard/admin/packages/package-registration-form";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Package } from "lucide-react";

export default function AddPackagePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Package"
        description="Create a new meal package for subscription plans."
        icon={Package}
      />
      <AddPackageForm/>
    </div>
  );
}