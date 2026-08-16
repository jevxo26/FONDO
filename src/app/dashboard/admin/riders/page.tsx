"use client";

import { Truck, Download, UserPlus, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderTableSection } from "@/components/dashboard/admin/riders/all-riders/rider-table-section";
import { RiderSummaryCards } from "@/components/dashboard/admin/riders/all-riders/rider-summary-cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useListRidersQuery } from "@/store/api/slices/rider-api";

export default function RidersPage() {
  const { data: riders = [], isLoading } = useListRidersQuery();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="All Riders"
        description="View and manage all registered riders."
        icon={Truck}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-4.5" /> Export Riders
            </Button>
            <Button className="rounded-full">
              <Link href="/riders/add">
                <UserPlus className="size-4.5" /> Add Rider
              </Link>
            </Button>
          </>
        }
      />
      <div className="mt-8">
        <RiderSummaryCards riders={riders} />
      </div>
      <div className="mt-8">
        <RiderTableSection data={riders} />
      </div>
    </div>
  );
}