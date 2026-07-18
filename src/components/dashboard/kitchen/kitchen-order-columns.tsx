"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { KitchenOrder } from "@/data/kitchen";
import { KitchenStatusBadge } from "./kitchen-status-badge";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";

export const kitchenOrderColumns: ColumnDef<KitchenOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.orderNumber}</span>,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => <span className="text-foreground">{row.original.customerName}</span>,
  },
  {
    accessorKey: "items",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
    enableSorting: false,
    cell: ({ row }) => {
      const items = row.original.items;
      return <span className="text-muted-foreground">{items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}</span>;
    },
  },
  {
    accessorKey: "mealType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Meal" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.mealType}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <KitchenStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "estimatedReadyAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Est. Ready" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.estimatedReadyAt}</span>,
  },
];
