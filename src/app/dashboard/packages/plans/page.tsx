import { Calendar } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function PackagesPlansPage() {
  return (
    <div>
      <PageHeader
        title="Meal Plans"
        description="Create and manage meal plan templates for packages."
        icon={Calendar}
      />
    </div>
  );
}
