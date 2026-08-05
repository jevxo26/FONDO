"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, RotateCcw, Save } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FormAside } from "./form-aside";

interface FormShellProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  formId: string;
  submitLabel?: string;
  isPending?: boolean;
  onReset?: () => void;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function FormShell({
  title,
  description,
  icon: Icon,
  formId,
  submitLabel = "Save",
  isPending = false,
  onReset,
  backHref,
  backLabel = "Cancel",
  children,
  aside,
  className,
}: FormShellProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/[0.04] via-card to-primary/[0.02] shadow-[var(--shadow-card)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -top-12 size-28 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

        <div className="relative flex flex-wrap items-center justify-between gap-4 p-5 md:p-6">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                  <Icon className="size-5 text-primary" />
                </div>
              )}
              <div>
                <h1 className="font-heading text-2xl font-semibold text-foreground">{title}</h1>
                {description && (
                  <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onReset && (
                <Button type="button" variant="outline" size="sm" onClick={onReset}>
                  <RotateCcw className="mr-1 size-4" />
                  Reset
                </Button>
              )}
              <Button
                type="submit"
                form={formId}
                disabled={isPending}
                className="bg-primary hover:bg-primary/90"
              >
                {isPending ? (
                  <Loader2 className="mr-1 size-4 animate-spin" />
                ) : (
                  <Save className="mr-1 size-4" />
                )}
                {submitLabel}
              </Button>
              {backHref && (
                <Link
                  href={backHref}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  {backLabel}
                </Link>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
          <div className="min-w-0">{children}</div>
          {aside && <FormAside>{aside}</FormAside>}
        </div>
      </div>
  );
}
