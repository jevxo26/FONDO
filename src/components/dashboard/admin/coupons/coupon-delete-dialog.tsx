// /components/dashboard/admin/coupons/coupon-delete-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Coupon } from "@/data/mock-coupons";

interface CouponDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  coupon: Coupon | null;
}

export function CouponDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  coupon,
}: CouponDeleteDialogProps) {
  if (!coupon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Coupon</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{coupon.title}&quot;? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
