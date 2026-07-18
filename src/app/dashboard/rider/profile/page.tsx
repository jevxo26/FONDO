import { User } from "lucide-react";
import { riders } from "@/data/riders";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderProfileInfo } from "@/components/dashboard/rider/rider-profile-info";

export default function RiderProfilePage() {
  const rider = riders[0];
  return (
    <div>
      <PageHeader title="My Profile" description="View and update your rider profile." icon={User} />
      <RiderProfileInfo rider={rider} />
    </div>
  );
}
