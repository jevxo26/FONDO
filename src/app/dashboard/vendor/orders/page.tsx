import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { ClipboardList, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function VendorOrdersPage() {
  return (
    <div>
      <PageHeader
        title="Orders"
        description="View and manage incoming customer orders."
        icon={ClipboardList}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New Orders" value="8" variant="warning" icon={Clock} accent="right" />
        <StatCard label="In Progress" value="12" icon={ClipboardList} accent="right" />
        <StatCard label="Completed Today" value="23" variant="success" icon={CheckCircle2} accent="right" />
        <StatCard label="Cancelled" value="2" variant="danger" icon={XCircle} accent="right" />
      </div>
    </div>
  );
}
