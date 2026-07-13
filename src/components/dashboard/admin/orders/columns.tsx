"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type Order = {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: string;
  date: string;
};

export const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "ORDER ID" },
  { accessorKey: "customer", header: "CUSTOMER" },
  { accessorKey: "items", header: "ITEMS" },
  { accessorKey: "total", header: "TOTAL" },
  { 
    accessorKey: "status", 
    header: "STATUS",
    cell: ({ row }) => (
      <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100 border-0">
        {row.getValue("status")}
      </Badge>
    )
  },
  { accessorKey: "date", header: "DATE" },
];