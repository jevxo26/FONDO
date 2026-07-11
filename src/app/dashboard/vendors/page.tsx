import { CheckCircle, Clock, Store } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/common/page-header';
import { StatCard } from '@/components/dashboard/common/stat-card';
import { BottomWidgets } from '@/components/dashboard/vendors/bottom-widgets';
import { RegisterVendorModal } from '@/components/dashboard/vendors/register-vendor-modal';
import { VendorControls } from '@/components/dashboard/vendors/vendors-controls';
import { VendorsTable } from '@/components/dashboard/vendors/vendors-table';
import { vendors } from '@/data/vendors';

export default function VendorsPage() {
  const active = vendors.filter((v) => v.status === 'ACTIVE').length;
  const pending = vendors.filter((v) => v.status === 'PENDING').length;
  return (
    <div>
      <PageHeader
        title="Vendor Management"
        description="Register, manage, and monitor vendor operations across the platform."
        icon={Store}
        actions={<RegisterVendorModal />}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Total Vendors" value={vendors.length} icon={Store} accent="right" />
        <StatCard label="Active" value={active} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Pending Approval" value={pending} variant="warning" icon={Clock} accent="right" />
      </div>
      <div className="mt-6">
        <VendorControls />
      </div>
      <div className="mt-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <VendorsTable vendors={vendors} />
        </div>
      </div>
      <div className="mt-6">
        <BottomWidgets />
      </div>
    </div>
  );
}
