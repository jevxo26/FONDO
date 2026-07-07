import { VendorsTable } from "@/components/dashboard/vendors/vendors-table";
import { vendors } from "@/data/vendors";

export default function VendorsPage() {
  return (
    <div className="p-6">
      <h2 className="font-fraunces text-4xl font-bold mb-6">Vendors Management</h2>
      <div className="rounded-xl border border-border bg-card p-6">
        <VendorsTable vendors={vendors} />
      </div>
    </div>
  );
}