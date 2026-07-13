// OrdersCompletedPage.tsx
"use client";

import { CheckCircle, ArrowUpDown } from "lucide-react";
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
  deliveredAt: string;
  rating: number;
};

const completedOrders: Order[] = [
  { id: "ORD-5001", customer: "Rafiqul Islam", items: "2x Beef Biryani", total: "৳ 700", status: "Completed", date: "Jul 13, 2026", deliveredAt: "2:30 PM", rating: 5 },
  { id: "ORD-5002", customer: "Anika Tasnim", items: "1x Thai Soup", total: "৳ 350", status: "Completed", date: "Jul 13, 2026", deliveredAt: "1:15 PM", rating: 4 },
  { id: "ORD-5003", customer: "Masud Rana", items: "3x Pizza", total: "৳ 1800", status: "Completed", date: "Jul 13, 2026", deliveredAt: "12:45 PM", rating: 5 },
  { id: "ORD-5004", customer: "Sarah Binte", items: "2x Burger", total: "৳ 450", status: "Completed", date: "Jul 12, 2026", deliveredAt: "8:20 PM", rating: 3 },
  { id: "ORD-5005", customer: "Kamal Uddin", items: "1x Mixed Chowmein", total: "৳ 300", status: "Completed", date: "Jul 12, 2026", deliveredAt: "7:50 PM", rating: 4 },
  { id: "ORD-5006", customer: "Tania Akter", items: "2x Pasta", total: "৳ 600", status: "Completed", date: "Jul 12, 2026", deliveredAt: "6:30 PM", rating: 5 },
  { id: "ORD-5007", customer: "Shahidul Islam", items: "1x Steak", total: "৳ 650", status: "Completed", date: "Jul 11, 2026", deliveredAt: "3:10 PM", rating: 4 },
  { id: "ORD-5008", customer: "Nasrin Sultana", items: "3x Sushi", total: "৳ 900", status: "Completed", date: "Jul 11, 2026", deliveredAt: "2:45 PM", rating: 5 },
  { id: "ORD-5009", customer: "Faisal Ahmed", items: "1x Burger, 1x Coke", total: "৳ 350", status: "Completed", date: "Jul 10, 2026", deliveredAt: "9:30 PM", rating: 4 },
  { id: "ORD-5010", customer: "Sabrina Khan", items: "2x Fried Rice", total: "৳ 500", status: "Completed", date: "Jul 10, 2026", deliveredAt: "8:15 PM", rating: 3 },
];

export default function OrdersCompletedPage() {
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
        <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100 border-0">
          {row.getValue("status")}
        </Badge>
      )
    },
    {
      accessorKey: "deliveredAt",
      header: "DELIVERED AT"
    },
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          RATING <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
        title="Completed Orders"
        description="Orders successfully delivered to customers."
        icon={CheckCircle}
      />
      <DataTable
        columns={columns}
        data={completedOrders}
        pageSize={5}
        enableSorting={true}
        enableSearch={true}
        enableColumnToggle={true}
        // enableRowSelection={false}
        isLoading={false}
        emptyMessage="No completed orders found."
        skeletonRows={5}
      />
    </div>
  );
}