// src/app/dashboard/vendor/staff/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorStaffTableSection } from "@/components/dashboard/vendor/staff/staff-table-section";
import { Users, UserPlus, UserCheck, Clock } from "lucide-react";
import { vendorStaff } from "@/data/vendor-staff";

export default function VendorStaffPage() {
  const totalStaff = vendorStaff.length;
  const onDuty = vendorStaff.filter((s) => s.status === "ACTIVE").length;
  const newHires = vendorStaff.filter(
    (s) => new Date(s.joiningDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  const onLeave = vendorStaff.filter((s) => s.status === "ON_LEAVE").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Staff"
        description="Manage your team and their schedules."
        icon={Users}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Staff"
          value={totalStaff.toString()}
          icon={Users}
          accent="right"
        />
        <StatCard
          label="On Duty"
          value={onDuty.toString()}
          variant="success"
          icon={UserCheck}
          accent="right"
        />
        <StatCard
          label="New Hires"
          value={newHires.toString()}
          variant="default"
          icon={UserPlus}
          accent="right"
        />
        <StatCard
          label="On Leave"
          value={onLeave.toString()}
          variant="warning"
          icon={Clock}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Staff List
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {onDuty} Active · {totalStaff} Total
          </p>
        </div>
        <VendorStaffTableSection />
      </div>
    </div>
  );
}