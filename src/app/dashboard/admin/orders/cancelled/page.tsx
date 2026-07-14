// OrdersCancelledPage.tsx
"use client";

import { XCircle, ArrowUpDown } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { DataTable } from "@/components/common/table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

type Order = {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: string;
  date: string;
  reason: string;
  refundStatus: string;
};

const cancelledOrders: Order[] = [
  { id: "ORD-4001", customer: "Rahim Ahmed", items: "2x Pizza", total: "৳ 1200", status: "Cancelled", date: "Jul 13, 2026", reason: "Customer cancelled", refundStatus: "Completed" },
  { id: "ORD-4002", customer: "Saima Akter", items: "1x Burger", total: "৳ 250", status: "Cancelled", date: "Jul 13, 2026", reason: "Out of stock", refundStatus: "Processing" },
  { id: "ORD-4003", customer: "Karim Uddin", items: "3x Pasta", total: "৳ 900", status: "Cancelled", date: "Jul 12, 2026", reason: "Wrong address", refundStatus: "Completed" },
  { id: "ORD-4004", customer: "Jannat Khan", items: "1x Salad", total: "৳ 150", status: "Cancelled", date: "Jul 12, 2026", reason: "Delayed delivery", refundStatus: "Processing" },
  { id: "ORD-4005", customer: "Tanvir Hasan", items: "2x Sushi", total: "৳ 800", status: "Cancelled", date: "Jul 11, 2026", reason: "Customer cancelled", refundStatus: "Completed" },
  { id: "ORD-4006", customer: "Mehedi Hasan", items: "1x Ramen", total: "৳ 350", status: "Cancelled", date: "Jul 11, 2026", reason: "Payment failed", refundStatus: "Processing" },
  { id: "ORD-4007", customer: "Nusrat Jahan", items: "2x Steak", total: "৳ 1200", status: "Cancelled", date: "Jul 10, 2026", reason: "Restaurant cancelled", refundStatus: "Completed" },
  { id: "ORD-4008", customer: "Arif Molla", items: "1x Biryani", total: "৳ 280", status: "Cancelled", date: "Jul 10, 2026", reason: "Customer cancelled", refundStatus: "Pending" },
  { id: "ORD-4009", customer: "Sumi Khatun", items: "2x Chicken Fry", total: "৳ 550", status: "Cancelled", date: "Jul 09, 2026", reason: "Out of stock", refundStatus: "Completed" },
  { id: "ORD-4010", customer: "Rakib Khan", items: "1x Sandwich", total: "৳ 250", status: "Cancelled", date: "Jul 09, 2026", reason: "Wrong item", refundStatus: "Processing" },
];

export default function OrdersCancelledPage() {
  const columns = useMemo<ColumnDef<Order>[]>(() => [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ORDER ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          CUSTOMER <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "items",
      header: "ITEMS"
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          TOTAL <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <Badge className="rounded-full bg-red-100 text-red-700 hover:bg-red-100 border-0">
          {row.getValue("status")}
        </Badge>
      )
    },
    {
      accessorKey: "reason",
      header: "REASON"
    },
    {
      accessorKey: "refundStatus",
      header: "REFUND STATUS",
      cell: ({ row }) => {
        const status = row.getValue("refundStatus") as string;
        const variant = status === "Processing" ? "bg-yellow-100 text-yellow-700" : 
                       status === "Completed" ? "bg-green-100 text-green-700" : 
                       "bg-gray-100 text-gray-700";
        return (
          <Badge className={`rounded-full ${variant} hover:${variant} border-0`}>
            {status}
          </Badge>
        );
      }
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          DATE <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
  ], []);

  return (
    <div className="p-4 md:0 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Cancelled Orders"
        description="Orders that were cancelled or refunded."
        icon={XCircle}
      />
      <DataTable
        columns={columns}
        data={cancelledOrders}
        pageSize={5}
        enableSorting={true}
        enableSearch={true}
        enableColumnToggle={true}
        // enableRowSelection={false}
        isLoading={false}
        emptyMessage="No cancelled orders found."
        skeletonRows={5}
      />
    </div>
  );
}