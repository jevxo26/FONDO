interface OrderItemRow {
  name: string;
  quantity: number;
  price: number;
}

interface OrderItemsPricingProps {
  items: OrderItemRow[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export default function OrderItemsPricing({
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
}: OrderItemsPricingProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
      <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
        Items ({items.length})
      </h2>
      <div className="divide-y divide-border/40">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {item.quantity}
              </span>
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
            <span className="font-mono text-sm font-medium text-foreground">
              ৳{item.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-border/40 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-mono text-foreground">৳{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="font-mono text-foreground">
            {deliveryFee === 0 ? "Free" : `৳${deliveryFee}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-mono text-success">-৳{discount}</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-border/40 pt-2 text-base font-bold">
          <span className="text-foreground">Total</span>
          <span className="font-mono text-foreground">৳{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
