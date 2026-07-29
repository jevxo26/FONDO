import { Phone } from "lucide-react";

interface DeliveryDetailsCardProps {
  phone: string;
}

export default function DeliveryDetailsCard({ phone }: DeliveryDetailsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Delivery Details</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="size-4" />
          <span>{phone || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
