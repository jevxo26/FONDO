import React from "react";
import { Package, RotateCcw, Eye, CheckCircle2 } from "lucide-react";

interface HeaderBarProps {
  onReset: () => void;
  showPreview: boolean;
  setShowPreview: (val: boolean) => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
  title?: string;
  description?: string;
}

export function HeaderBar({
  onReset,
  showPreview,
  setShowPreview,
  isSubmitting,
  isEditMode = false,
  title,
  description,
}: HeaderBarProps) {
  const headingText = title || (isEditMode ? "Update Meal Package" : "Create Meal Package");
  const subHeadingText =
    description ||
    (isEditMode
      ? "Modify existing meal plans, price options, and food schedule."
      : "Add new meal plans with customizable duration and food items.");

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
          <Package className="w-6 h-6 text-primary" />
          {headingText}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">{subHeadingText}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition"
        >
          <Eye className="w-3.5 h-3.5" /> {showPreview ? "Hide Preview" : "Card Preview"}
        </button>
        <button
          type="submit"
          form="package-form"
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition shadow-sm disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          {isSubmitting
            ? "Saving..."
            : isEditMode
            ? "Update Package"
            : "Save Package"}
        </button>
      </div>
    </div>
  );
}