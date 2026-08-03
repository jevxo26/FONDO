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
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/[0.04] via-card to-primary/[0.02] p-5 shadow-[var(--shadow-card)]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">{title}</h1>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {onReset && (
            <Button type="button" variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="mr-1 size-4" />
              Reset
            </Button>
          )}
          <Button type="submit" form={formId} disabled={isPending} className="bg-primary hover:bg-primary/90">
            {isPending ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Save className="mr-1 size-4" />}
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
    </div>
  );
}
