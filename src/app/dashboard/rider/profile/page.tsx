import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { User, Bike, MapPin, Phone } from "lucide-react";

export default function RiderProfilePage() {
  return (
    <div>
      <PageHeader
        title="My Profile"
        description="View and update your rider profile."
        icon={User}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Status" value="Online" variant="success" icon={Bike} accent="right" />
        <StatCard label="Zone" value="Gulshan" variant="default" icon={MapPin} accent="right" />
        <StatCard label="Phone" value="+880 1XXX-XXXXXX" variant="default" icon={Phone} accent="right" />
        <StatCard label="Member Since" value="Jan 2026" variant="default" icon={User} accent="right" />
      </div>
    </div>
  );
}
