"use client";

import { useState } from "react";
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
import { packageApprovalColumns } from "./approval-columns";
import {
  useApprovePackage,
  useListAdminPackagesQuery,
  useRejectPackage,
} from "@/store/api/slices/packages-api";
import type { AdminPackageListItem } from "@/store/api/slices/packages-api";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export function PackageApprovalTableSection() {
  const { data, isLoading } = useListAdminPackagesQuery({ status: "PENDING", limit: 100 });
  const { mutate: approvePackage, isPending: approving } = useApprovePackage();
  const { mutate: rejectPackage, isPending: rejecting } = useRejectPackage();

  const [rejectTarget, setRejectTarget] = useState<AdminPackageListItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (pkg: AdminPackageListItem) => {
    if (approving || rejecting) return;
    approvePackage(pkg.id, {
      onSuccess: () => toast.success(`${pkg.name} approved and published`),
      onError: (error) =>
        toast.error((error as { message?: string })?.message || "Failed to approve"),
    });
  };

  const handleReject = () => {
    if (!rejectTarget) return;
    rejectPackage(
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

  const rowActions: RowAction<AdminPackageListItem>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (item) => {
        window.location.href = `/dashboard/admin/foods/packages/${item.id}`;
      },
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
        columns={packageApprovalColumns}
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
              placeholder="e.g. Invalid meal plan, missing nutrition info..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectReason.trim() || rejecting}
              onClick={handleReject}
            >
              {rejecting ? "Rejecting..." : "Reject Package"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
