"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { riderColumns } from "./rider-columns";
import { CheckCircle, Eye, MapPin, UserX } from "lucide-react";
import { Rider } from "@/store/api/slices/rider-api";

const rowActions: RowAction<Rider>[] = [
  {
    label: "View Profile",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Profile", row.riderCode),
  },
  {
    label: "Track Live",
    icon: <MapPin className="size-4" />,
    onClick: (row) => console.log("Track Rider", row.riderCode),
  },
  {
    label: "Deactivate",
    icon: <UserX className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Deactivate Rider", row.riderCode),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Suspended", value: "SUSPENDED" },
  ],
};

const vehicleFilter: FacetedFilter = {
  columnId: "vehicleType",
  title: "Vehicle",
  icon: <MapPin className="size-4" />,
  options: [
    { label: "Bike", value: "BIKE" },
    { label: "Scooter", value: "SCOOTER" },
    { label: "Bicycle", value: "BICYCLE" },
    { label: "Car", value: "CAR" },
    { label: "Van", value: "VAN" },
  ],
};

export function RiderTableSection({ data }: { data: Rider[] }) {
  return (
    <DataTable
      columns={riderColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter, vehicleFilter]}
    />
  );
}