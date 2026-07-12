import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function RidersLivePage() {
  return (
    <div>
      <PageHeader
        title="Live Tracking"
        description="View real-time rider locations and routes."
        icon={MapPin}
      />
    </div>
  );
}
