import { ListTree } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function FoodsCategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Categories"
        description="Manage food categories and sub-categories."
        icon={ListTree}
      />
    </div>
  );
}
