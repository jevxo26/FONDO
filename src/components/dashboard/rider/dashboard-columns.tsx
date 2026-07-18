"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { RiderDelivery } from "@/data/riders";
import { DeliveryStatusBadge } from "./delivery-status-badge";

export const dashboardColumns: ColumnDef<RiderDelivery>[] = [
  {
    accessorKey: "deliveryCode",
    header: "Code",
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.deliveryCode}</span>,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => <span className="text-foreground">{row.original.customerName}</span>,
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.zone}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DeliveryStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "estimatedDeliveryTime",
    header: "ETA",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.estimatedDeliveryTime}</span>,
  },
];
