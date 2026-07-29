import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

export default function OrderNotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <Clock className="size-6 text-destructive" />
      </div>
      <h2 className="font-heading text-xl font-bold text-foreground">Order Not Found</h2>
      <p className="text-sm text-muted-foreground">The order doesn&apos;t exist.</p>
      <Link
        href="/dashboard/admin/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to All Orders
      </Link>
    </div>
  );
}
