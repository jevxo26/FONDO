import { ClipboardCheck } from "lucide-react";

export default function FoodsApprovalPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <ClipboardCheck className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Approval Queue</h2>
          <p className="mt-1 text-muted-foreground">
            Review and approve food items submitted by vendors.
          </p>
        </div>
      </div>
    </div>
  );
}
