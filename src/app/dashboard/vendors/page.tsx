import { VendorsTable } from "@/components/dashboard/vendors/VendorsTable";
import { VendorControls } from "@/components/dashboard/vendors/VendorsControls";
import { BottomWidgets } from "@/components/dashboard/vendors/BottomWidgets";
import { Button } from "@/components/ui/button";
import { vendors } from "@/data/vendors";

export default function VendorsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-fraunces text-4xl font-bold">Vendor Management</h2>
        <Button>+ Register New Vendor</Button>
      </div>

      <VendorControls />

      <div className="rounded-xl border border-border bg-card p-6">
        <VendorsTable vendors={vendors} />
      </div>

      <BottomWidgets />
    </div>
  );
}