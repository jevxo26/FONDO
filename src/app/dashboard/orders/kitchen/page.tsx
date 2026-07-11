import { CookingPot } from "lucide-react";

export default function OrdersKitchenPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <CookingPot className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Kitchen Queue</h2>
          <p className="mt-1 text-muted-foreground">Orders currently being prepared in kitchens.</p>
        </div>
      </div>
    </div>
  );
}
