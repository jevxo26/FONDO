import { Package } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function PackagesPage() {
  return (
    <div>
      <PageHeader
        title="All Packages"
        description="Create and manage subscription meal packages."
        icon={Package}
      />
    </div>
  );
}
