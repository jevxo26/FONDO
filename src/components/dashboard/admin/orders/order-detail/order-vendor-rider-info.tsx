import { Building, User } from "lucide-react";

interface OrderVendorRiderInfoProps {
  vendor: string;
  rider: string;
}

export default function OrderVendorRiderInfo({ vendor, rider }: OrderVendorRiderInfoProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
      <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Vendor & Rider</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Building className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-foreground">{vendor}</span>
        </div>
        <div className="flex items-center gap-3">
          <User className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-foreground">{rider}</span>
        </div>
      </div>
    </div>
  );
}
