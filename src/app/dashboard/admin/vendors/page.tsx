import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { BottomWidgets } from "@/components/dashboard/admin/vendors/all-vendors/bottom-widgets";
import { RegisterVendorModal } from "@/components/dashboard/admin/vendors/all-vendors/register-vendor-modal";
import { VendorsTable } from "@/components/dashboard/admin/vendors/all-vendors/vendors-table";
import { vendors } from "@/data/vendors";
import { CheckCircle, Clock, Plus, Store, Wallet } from "lucide-react";
import Link from "next/link";

export default function VendorsPage() {
  const active = vendors.filter((v) => v.status === "ACTIVE").length;
  const pending = vendors.filter((v) => v.status === "PENDING").length;
  const totalBalance = 142850;
  return (
    <div>
      <PageHeader
        title="Vendor Management"
        description="Register, manage, and monitor vendor operations across the platform."
        icon={Store}
        actions={
          <Link
            href="/dashboard/admin/vendors/add"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add Vendor
          </Link>
        }

      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatCard label="Total Vendors" value={vendors.length} icon={Store} accent="right" />
        <StatCard
          label="Active"
          value={active}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Pending Approval"
          value={pending}
          variant="warning"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="Total Balance"
          value={`৳${totalBalance.toLocaleString()}`}
          variant="default"
          icon={Wallet}
          accent="right"
        />
      </div>
      <div className="mt-8">
        <VendorsTable vendors={vendors} />
      </div>
      <div className="mt-8">
        <BottomWidgets />
      </div>
    </div>
  );
}
