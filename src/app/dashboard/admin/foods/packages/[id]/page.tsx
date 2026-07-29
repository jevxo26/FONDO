// src/app/dashboard/admin/packages/[id]/page.tsx
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Package, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { foodPackages } from "@/data/packages";

interface PackageDetailPageProps {
  params: {
    id: string;
  };
}

export default function PackageDetailPage({ params }: PackageDetailPageProps) {
  const pkg = foodPackages.find((p) => p.id === params.id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin/packages">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <PageHeader title={pkg.name} description={pkg.description} icon={Package} />
        </div>
        <Link href={`/dashboard/admin/packages/${pkg.id}/edit`}>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Package
          </Button>
        </Link>
      </div>
    </div>
  );
}
