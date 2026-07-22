import { Plus } from "lucide-react";

interface Props {
  label: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  isPending: boolean;
  onLabelChange: (val: string) => void;
  onStreetChange: (val: string) => void;
  onCityChange: (val: string) => void;
  onZipChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddressForm({ label, streetAddress, city, zipCode, isPending, onLabelChange, onStreetChange, onCityChange, onZipChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 items-end bg-card">
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">Label</label>
        <input type="text" placeholder="e.g. Home, Office" value={label} onChange={(e) => onLabelChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">City</label>
        <input type="text" placeholder="e.g. Dhaka" value={city} onChange={(e) => onCityChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">Street Address</label>
        <input type="text" placeholder="House, road, area" value={streetAddress} onChange={(e) => onStreetChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">ZIP Code</label>
        <input type="text" placeholder="1213" value={zipCode} onChange={(e) => onZipChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold font-sans uppercase rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50">
          <Plus className="size-3.5" /> Add Address
        </button>
      </div>
    </form>
  );
}
