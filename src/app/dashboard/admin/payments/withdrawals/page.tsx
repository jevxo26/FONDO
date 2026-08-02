"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCheck, HandCoins, ListChecks, Wallet, X } from "lucide-react";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { WithdrawalTableSection } from "@/components/dashboard/admin/payments/withdrawals/withdrawal-table-section";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useAdminWithdrawals,
  useApproveWithdraw,
  useRejectWithdraw,
  type AdminWithdrawListItem,
} from "@/store/api/slices/wallet-api";
import { handleApiError } from "@/lib/api-error";

type ConfirmAction = "approve" | "reject" | null;

export default function WithdrawalsPage() {
  const { data: withdrawals, isLoading } = useAdminWithdrawals();
  const approve = useApproveWithdraw();
  const reject = useRejectWithdraw();
  const [target, setTarget] = useState<AdminWithdrawListItem | null>(null);
  const [action, setAction] = useState<ConfirmAction>(null);

  const all = withdrawals ?? [];
  const pending = all.filter((w) => w.status === "pending");
  const approved = all.filter((w) => w.status === "approved");
  const rejected = all.filter((w) => w.status === "rejected");

  const requestConfirm = (item: AdminWithdrawListItem, a: Exclude<ConfirmAction, null>) => {
    setTarget(item);
    setAction(a);
  };

  const confirm = async () => {
    if (!target || !action) return;
    try {
      if (action === "approve") {
        await approve.mutateAsync(target.id);
        toast.success("Withdrawal approved");
      } else {
        await reject.mutateAsync(target.id);
        toast.success("Withdrawal rejected");
      }
      setTarget(null);
      setAction(null);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div>
      <PageHeader
        title="Withdrawals"
        description="Review and process customer wallet withdrawal requests."
        icon={Wallet}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Requests" value={all.length} icon={ListChecks} accent="right" />
        <StatCard label="Pending" value={pending.length} variant="warning" icon={HandCoins} accent="right" />
        <StatCard label="Approved" value={approved.length} variant="success" icon={CheckCheck} accent="right" />
        <StatCard label="Rejected" value={rejected.length} variant="danger" icon={X} accent="right" />
      </div>
      <div className="mt-8">
        <WithdrawalTableSection
          data={all}
          isLoading={isLoading}
          onApprove={(item) => requestConfirm(item, "approve")}
          onReject={(item) => requestConfirm(item, "reject")}
        />
      </div>

      <AlertDialog
        open={!!target}
        onOpenChange={(open) => {
          if (!open) {
            setTarget(null);
            setAction(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {action === "approve" ? "Approve withdrawal?" : "Reject withdrawal?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {target && (
                <>
                  Approve a withdrawal of ৳{Number(target.amount).toLocaleString()} to{" "}
                  {target.accountNumber} ({target.withdrawMethod.replace("_", " ")}) for{" "}
                  {`${target.wallet.customer.firstName} ${target.wallet.customer.lastName}`.trim()}.
                  This action cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirm} disabled={approve.isPending || reject.isPending}>
              {action === "approve" ? "Approve" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
