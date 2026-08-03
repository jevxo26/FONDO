"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable } from "@/components/common/table";
import type { RowAction } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { approvalColumns } from "./approval-columns";
import type { AdminFoodListItem } from "@/types/admin-food";
import {
  useApproveFood,
  useGetAdminFoodsQuery,
  useRejectFood,
} from "@/store/api/slices/admin-food-api";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export function ApprovalTableSection() {
  const router = useRouter();
  const { data, isLoading } = useGetAdminFoodsQuery({ status: "PENDING", limit: 100 });
  const { mutate: approveFood, isPending: approving } = useApproveFood();
  const { mutate: rejectFood, isPending: rejecting } = useRejectFood();

  const [rejectTarget, setRejectTarget] = useState<AdminFoodListItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (food: AdminFoodListItem) => {
    if (approving || rejecting) return;
    approveFood(food.id, {
      onSuccess: () => toast.success(`${food.name} approved`),
      onError: (error) =>
        toast.error((error as { message?: string })?.message || "Failed to approve"),
    });
  };

  const handleReject = () => {
    if (!rejectTarget) return;
    rejectFood(
      { id: rejectTarget.id, reason: rejectReason },
      {
        onSuccess: () => {
          toast.success(`${rejectTarget.name} rejected`);
          setRejectTarget(null);
          setRejectReason("");
        },
        onError: (error) =>
          toast.error((error as { message?: string })?.message || "Failed to reject"),
      },
    );
  };

  const rowActions: RowAction<AdminFoodListItem>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (item) => router.push(`/dashboard/admin/foods/${item.id}`),
    },
    {
      label: "Approve",
      icon: <CheckCircle className="size-4" />,
      onClick: handleApprove,
    },
    {
      label: "Reject",
      icon: <XCircle className="size-4" />,
      onClick: setRejectTarget,
    },
  ];

  return (
    <>
      <DataTable
        data={data?.items ?? []}
        columns={approvalColumns}
        rowActions={rowActions}
        isLoading={isLoading}
      />

      <Dialog open={!!rejectTarget} onOpenChange={(open) => !open && setRejectTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject {rejectTarget?.name}</DialogTitle>
            <DialogDescription>
              Provide a reason. The vendor will see this on their dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="reject-reason">Rejection reason</Label>
            <Textarea
              id="reject-reason"
              rows={4}
              placeholder="e.g. Missing required nutrition info, wrong category..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={!rejectReason.trim() || rejecting} onClick={handleReject}>
              {rejecting ? "Rejecting..." : "Reject Food"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
