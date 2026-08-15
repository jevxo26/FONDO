"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Loader2, RotateCcw, Send } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderBarProps {
  onReset: () => void;
  showPreview: boolean;
  setShowPreview: (value: boolean) => void;
  isSubmitting: boolean;
  businessName?: string;
}

export function HeaderBar({
  onReset,
  showPreview,
  setShowPreview,
  isSubmitting,
  businessName,
}: HeaderBarProps) {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/[0.04] via-card to-primary/[0.02] p-5 shadow-[var(--shadow-card)]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/vendor/foods")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              Add New Food
            </h1>
            <p className="text-xs text-muted-foreground">
              {businessName
                ? `Submitting as ${businessName}`
                : "Create a food item for review"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground"
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="text-muted-foreground"
          >
            {showPreview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>

          <Button
            type="submit"
            form="food-form"
            size="sm"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            {isSubmitting ? "Submitting..." : "Submit for Approval"}
          </Button>
        </div>
      </div>
    </div>
  );
}
