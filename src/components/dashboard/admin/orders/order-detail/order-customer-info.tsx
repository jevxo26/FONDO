import { Phone, User } from "lucide-react";

interface OrderCustomerInfoProps {
  name: string;
  phone: string;
}

export default function OrderCustomerInfo({ name, phone }: OrderCustomerInfoProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
      <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Customer</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="size-4 shrink-0 text-primary" />
          <span className="text-sm text-foreground">{name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="size-4 shrink-0 text-primary" />
          <span className="text-sm text-foreground">{phone}</span>
        </div>
      </div>
    </div>
  );
}
