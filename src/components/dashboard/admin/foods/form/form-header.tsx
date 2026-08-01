"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, RotateCcw, Save } from "lucide-react";
import Link from "next/link";

interface FormHeaderProps {
  title: string;
  description?: string;
  isPending: boolean;
  formId: string;
  onReset?: () => void;
}

export function FormHeader({
  title,
  description,
  isPending,
  formId,
  onReset,
}: FormHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {onReset && (
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="mr-1 size-4" />
            Reset
          </Button>
        )}
        <Button type="submit" form={formId} disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-1 size-4 animate-spin" />
          ) : (
            <Save className="mr-1 size-4" />
          )}
          Save Food
        </Button>
        <Link
          href="/dashboard/admin/foods"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
