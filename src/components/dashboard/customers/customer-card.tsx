import Link from "next/link";
import type { Customer } from "@/data/customers";
import { ArrowRight } from "lucide-react";

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const initials = customer.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  const tierBadge =
    customer.totalOrders >= 100
      ? { label: "Gold", style: "bg-primary/10 text-primary border-primary/20" }
      : { label: "Silver", style: "bg-muted text-muted-foreground border-border" };

  return (
    <Link
      href={`/dashboard/customers/orders?customer=${encodeURIComponent(customer.fullName)}`}
      className="group relative block rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
            {initials}
          </div>
          <div>
            <h4 className="font-semibold text-foreground transition-colors group-hover:text-primary">
              {customer.fullName}
            </h4>
            <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tierBadge.style}`}
        >
          {tierBadge.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-border py-4">
        <div>
          <p className="mb-1 text-[10px] uppercase text-muted-foreground">
            Total Orders
          </p>
          <p className="font-bold text-foreground">{customer.totalOrders} Orders</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] uppercase text-muted-foreground">
            Wallet Balance
          </p>
          <p className="font-bold text-success">
            ৳{customer.walletBalance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Last active: {customer.lastActive}
        </p>
        <span className="flex items-center gap-1 text-xs font-bold text-primary transition-all group-hover:gap-2">
          Manage <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
