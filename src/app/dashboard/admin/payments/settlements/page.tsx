"use client";

import { useState } from "react";
import { ArrowLeftRight, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { SettlementTableSection } from "@/components/dashboard/admin/payments/settlements/settlement-table-section";
import { ProcessSettlementDialog } from "@/components/dashboard/admin/payments/settlements/process-settlement-dialog";
import { useGetAllSettlementsQuery, useProcessSettlement } from "@/store/api/slices/admin-payments-api";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";
import type { VendorSettlement } from "@/types/wallet";

export default function PaymentsSettlementsPage() {
  const { data: settlements, isLoading } = useGetAllSettlementsQuery();
  const process = useProcessSettlement();
  const [selected, setSelected] = useState<VendorSettlement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const all = settlements ?? [];
  const paid = all.filter((s) => s.paymentStatus === "paid").length;
  const pending = all.filter((s) => ["pending", "processing"].includes(s.paymentStatus)).length;
  const failed = all.filter((s) => s.paymentStatus === "failed").length;

  const openProcess = (settlement: VendorSettlement) => {
    setSelected(settlement);
    setDialogOpen(true);
  };

  const handleProcess = (settlementId: string, data: { transactionId?: string; paymentMethod?: string }) => {
    process.mutate(
      { settlementId, ...data },
      {
        onSuccess: () => {
          toast.success("Settlement processed");
          setDialogOpen(false);
          setSelected(null);
        },
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  return (
    <div>
      <PageHeader title="Settlements" description="Manage platform-wide payment settlements." icon={ArrowLeftRight} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Settlements" value={all.length} icon={ArrowLeftRight} accent="bottom" />
        <StatCard label="Paid" value={paid} variant="success" icon={CheckCircle} accent="bottom" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="bottom" />
        <StatCard label="Failed" value={failed} variant="danger" icon={XCircle} accent="bottom" />
      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-5 shadow-[var(--shadow-card)]">
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="size-8 animate-spin text-primary" /></div>
        ) : (
          <SettlementTableSection data={all} onProcess={openProcess} />
        )}
      </div>

      <ProcessSettlementDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        settlement={selected}
        onProcess={handleProcess}
        isPending={process.isPending}
      />
    </div>
  );
}
