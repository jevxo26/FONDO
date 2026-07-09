import { TogglePill } from '@/components/common/toggle-pill';
import { Calendar } from 'lucide-react';

const statusFilters = [
  'All Orders',
  'Processing',
  'Out for Delivery',
  'Completed',
  'Cancelled',
] as const;

export function FilterBar() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-6 rounded-xl border border-border/30 bg-white/70 p-4 backdrop-blur-sm md:p-6">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Order Status
        </span>
        <TogglePill items={statusFilters} value="All Orders" onChange={() => {}} />
      </div>

      <div className="mx-2 hidden h-12 w-px bg-border sm:block" />

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Date Range
        </span>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
          <Calendar className="size-4 text-muted-foreground" />
          <input
            className="w-44 border-none p-0 text-sm focus:ring-0"
            type="text"
            defaultValue="Oct 12, 2023 - Oct 19, 2023"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
