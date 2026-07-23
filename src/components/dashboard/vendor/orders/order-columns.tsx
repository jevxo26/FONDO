"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type VendorOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  itemsCount: number;
  totalAmount: number;
  status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
  date: string;
};

export const vendorOrderColumns: ColumnDef<VendorOrder>[] = [
  { accessorKey: "orderNumber", header: "ORDER #" },
  { accessorKey: "customerName", header: "CUSTOMER" },
  { accessorKey: "itemsCount", header: "ITEMS" },
  { 
    accessorKey: "totalAmount", 
    header: "TOTAL",
    cell: ({ row }) => `৳ ${row.getValue("totalAmount")}`
  },
  { 
    accessorKey: "status", 
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "Pending" ? "secondary" : "default"} className="rounded-full">
          {status}
        </Badge>
      );
    }
  },
  { accessorKey: "date", header: "DATE" },
];