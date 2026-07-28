interface OrderSummaryCardProps {
  itemsCount: number;
  totalAmount: number;
  paymentStatus: string;
}

export default function OrderSummaryCard({
  itemsCount,
  totalAmount,
  paymentStatus,
}: OrderSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Items</span>
          <span className="font-medium">{itemsCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-medium">৳{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment</span>
          <span className="font-medium capitalize">{paymentStatus}</span>
        </div>
      </div>
    </div>
  );
}
