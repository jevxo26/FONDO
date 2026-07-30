"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, RotateCcw, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderBarProps {
  onReset: () => void;
  showPreview: boolean;
  setShowPreview: (value: boolean) => void;
  isSubmitting: boolean;
  vendorId?: string;
}

export function HeaderBar({
  onReset,
  showPreview,
  setShowPreview,
  isSubmitting,
  vendorId,
}: HeaderBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (vendorId) {
      router.push(`/dashboard/admin/vendors/${vendorId}/foods`);
    } else {
      router.push("/dashboard/admin/foods");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h1 className="text-lg font-bold text-foreground">Add New Food</h1>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="text-muted-foreground"
        >
          {showPreview ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" />
              Show Preview
            </>
          )}
        </Button>

        <Button
          type="submit"
          form="food-form"
          size="sm"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-1" />
          {isSubmitting ? "Saving..." : "Save Food"}
        </Button>
      </div>
    </div>
  );
}
