import type { ReactNode } from "react";

interface FormPreviewCardProps {
  title: string;
  description?: string;
  controls?: ReactNode;
  children: ReactNode;
}

export function FormPreviewCard({ title, description, controls, children }: FormPreviewCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)] md:p-6">
      <div className="pointer-events-none absolute -bottom-6 -right-6 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
          <div className="flex items-center gap-2">
            {controls}
            <span className="pointer-events-none inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-primary">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              Live
            </span>
          </div>
        </div>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
