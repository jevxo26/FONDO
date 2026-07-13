import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RidersLive } from "@/components/dashboard/admin/riders/riders-live";

export default function RidersLivePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Live Tracking" description="View real-time rider locations and routes." icon={MapPin} />
      <RidersLive />
    </div>
  );
}
