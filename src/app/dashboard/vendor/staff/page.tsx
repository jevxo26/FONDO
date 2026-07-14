import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Users, UserPlus, UserCheck, Clock } from "lucide-react";

export default function VendorStaffPage() {
  return (
    <div>
      <PageHeader
        title="Staff"
        description="Manage your team and their schedules."
        icon={Users}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Staff" value="24" icon={Users} accent="right" />
        <StatCard label="On Duty" value="18" variant="success" icon={UserCheck} accent="right" />
        <StatCard label="New Hires" value="3" variant="default" icon={UserPlus} accent="right" />
        <StatCard label="On Leave" value="2" variant="warning" icon={Clock} accent="right" />
      </div>
    </div>
  );
}
