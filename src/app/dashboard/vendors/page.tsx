import { VendorsTable } from "@/components/dashboard/vendors/vendors-table";
import { VendorControls } from "@/components/dashboard/vendors/vendors-controls";
import { BottomWidgets } from "@/components/dashboard/vendors/bottom-widgets";
import { Button } from "@/components/ui/button";
import { vendors } from "@/data/vendors";
import { Plus } from "lucide-react";

export default function VendorsPage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Vendor Management
          </h2>
          <p className="mt-2 text-muted-foreground">
            Register, manage, and monitor vendor operations across the platform.
          </p>
        </div>
        <Button className="rounded-full">
          <Plus className="size-[18px]" />
          Register New Vendor
        </Button>
      </div>

      <div className="mt-6">
        <VendorControls />
      </div>

      <div className="mt-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <VendorsTable vendors={vendors} />
        </div>
      </div>

      <div className="mt-6">
        <BottomWidgets />
      </div>
    </div>
  );
}
