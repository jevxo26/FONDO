// src/app/dashboard/vendor/bank-accounts/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorBankTableSection } from "@/components/dashboard/vendor/bank-accounts/bank-table-section";
import { Landmark, CheckCircle, XCircle, Star } from "lucide-react";
import { vendorBankAccounts } from "@/data/vendor-bank-accounts";

export default function VendorBankAccountsPage() {
  const totalAccounts = vendorBankAccounts.length;
  const activeAccounts = vendorBankAccounts.filter((a) => a.status === "ACTIVE").length;
  const inactiveAccounts = vendorBankAccounts.filter((a) => a.status === "INACTIVE").length;
  const primaryAccount = vendorBankAccounts.find((a) => a.isPrimary);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Bank Accounts"
        description="Manage your payment and settlement accounts."
        icon={Landmark}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Accounts"
          value={totalAccounts.toString()}
          icon={Landmark}
          accent="right"
        />
        <StatCard
          label="Active"
          value={activeAccounts.toString()}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Inactive"
          value={inactiveAccounts.toString()}
          variant="danger"
          icon={XCircle}
          accent="right"
        />
        <StatCard
          label="Primary Account"
          value={primaryAccount?.bankName || "N/A"}
          variant="default"
          icon={Star}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Bank Account List
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {activeAccounts} Active · {totalAccounts} Total
          </p>
        </div>
        <VendorBankTableSection />
      </div>
    </div>
  );
}