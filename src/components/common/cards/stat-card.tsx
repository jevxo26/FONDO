import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 shadow-sm md:p-5", className)}>
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-fraunces text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
