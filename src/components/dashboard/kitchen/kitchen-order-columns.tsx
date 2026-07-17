"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { KitchenOrder } from "@/data/kitchen";
import { KitchenStatusBadge } from "./kitchen-status-badge";

export const kitchenOrderColumns: ColumnDef<KitchenOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order",
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.orderNumber}</span>,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => <span className="text-foreground">{row.original.customerName}</span>,
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.original.items;
      return <span className="text-muted-foreground">{items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}</span>;
    },
  },
  {
    accessorKey: "mealType",
    header: "Meal",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.mealType}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <KitchenStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "estimatedReadyAt",
    header: "Est. Ready",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.estimatedReadyAt}</span>,
  },
];
