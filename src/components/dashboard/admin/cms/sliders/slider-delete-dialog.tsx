// /components/dashboard/admin/cms/sliders/slider-delete-dialog.tsx
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
import { type Slider } from "@/data/mock-sliders";

interface SliderDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  slider: Slider | null;
}

export function SliderDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  slider,
}: SliderDeleteDialogProps) {
  if (!slider) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Slider</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{slider.title}&quot;? This action cannot be
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
