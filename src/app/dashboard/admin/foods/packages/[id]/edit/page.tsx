// src/app/dashboard/admin/packages/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PackageRegistrationForm } from "@/components/dashboard/admin/packages/package-registration-form";
import { Package } from "lucide-react";
import { foodPackages } from "@/data/packages";
import type { PackageFormData } from "@/lib/schema/package-schema";

interface EditPackagePageProps {
  params: {
    id: string;
  };
}

export default function EditPackagePage({ params }: EditPackagePageProps) {
  const pkg = foodPackages.find((p) => p.id === params.id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Package" description={`Editing "${pkg.name}"`} icon={Package} />
      <PackageRegistrationForm initialData={pkg as unknown as Partial<PackageFormData>} isEdit />
    </div>
  );
}
