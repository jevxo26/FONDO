"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { riderColumns } from "./rider-columns";
import type { Rider } from "@/data/riders";
import { CheckCircle, Eye, MapPin, UserX, Users } from "lucide-react";

const rowActions: RowAction<Rider>[] = [
  {
    label: "View Profile",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Profile", row.id),
  },
  {
    label: "Track Live",
    icon: <MapPin className="size-4" />,
    onClick: (row) => console.log("Track Rider", row.id),
  },
  {
    label: "Deactivate",
    icon: <UserX className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Deactivate Rider", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Busy", value: "BUSY" },
    { label: "Offline", value: "OFFLINE" },
    { label: "On Leave", value: "ON_LEAVE" },
  ],
};

const zoneFilter: FacetedFilter = {
  columnId: "zone",
  title: "Zone",
  icon: <MapPin className="size-4" />,
  options: [
    { label: "Gulshan", value: "Gulshan" },
    { label: "Banani", value: "Banani" },
    { label: "Uttara", value: "Uttara" },
    { label: "Mirpur", value: "Mirpur" },
    { label: "Dhanmondi", value: "Dhanmondi" },
    { label: "Mohammadpur", value: "Mohammadpur" },
    { label: "Motijheel", value: "Motijheel" },
    { label: "Bashundhara", value: "Bashundhara" },
  ],
};

export function RiderTableSection({ data }: { data: Rider[] }) {
  return (
    <DataTable
      columns={riderColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter, zoneFilter]}
    />
  );
}
