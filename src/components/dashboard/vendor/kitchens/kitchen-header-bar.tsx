// src/components/dashboard/vendor/kitchens/kitchen-header-bar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, RotateCcw, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface KitchenHeaderBarProps {
  onReset: () => void;
  showPreview: boolean;
  setShowPreview: (value: boolean) => void;
  isSubmitting: boolean;
}

export function KitchenHeaderBar({
  onReset,
  showPreview,
  setShowPreview,
  isSubmitting,
}: KitchenHeaderBarProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard/vendor/kitchens");
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
        <h1 className="text-lg font-bold text-foreground">Add New Kitchen</h1>
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
          form="kitchen-form"
          size="sm"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-1" />
          {isSubmitting ? "Saving..." : "Save Kitchen"}
        </Button>
      </div>
    </div>
  );
}
