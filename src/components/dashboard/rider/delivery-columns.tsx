"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { RiderDelivery } from "@/data/riders";
import { DeliveryStatusBadge } from "./delivery-status-badge";

export const deliveryColumns: ColumnDef<RiderDelivery>[] = [
  {
    accessorKey: "deliveryCode",
    header: "Delivery Code",
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.deliveryCode}</span>,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-foreground">{row.original.customerName}</p>
        <p className="text-xs text-muted-foreground">{row.original.customerPhone}</p>
      </div>
    ),
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.zone}</span>,
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.items.join(", ")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DeliveryStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "estimatedDeliveryTime",
    header: "Est. Time",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.estimatedDeliveryTime}</span>,
  },
];
