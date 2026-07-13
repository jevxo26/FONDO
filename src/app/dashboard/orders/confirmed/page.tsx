"use client";

import { CheckCircle, ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/table";
import { ColumnDef } from "@tanstack/react-table";

export type Order = {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: string;
  date: string;
};

export const columns: ColumnDef<Order>[] = [
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
  { accessorKey: "items", header: "ITEMS" },
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
    accessorKey: "date", 
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        DATE <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
];

const confirmedOrders: Order[] = [
  { id: "ORD-8001", customer: "Rahim Ahmed", items: "2x Burger", total: "৳ 400", status: "Confirmed", date: "Jul 12, 2026" },
  { id: "ORD-8002", customer: "Saima Akter", items: "1x Pizza, 1x Coke", total: "৳ 750", status: "Confirmed", date: "Jul 12, 2026" },
  { id: "ORD-8003", customer: "Karim Uddin", items: "3x Pasta", total: "৳ 900", status: "Confirmed", date: "Jul 11, 2026" },
  { id: "ORD-8004", customer: "Jannat", items: "1x Salad", total: "৳ 150", status: "Confirmed", date: "Jul 11, 2026" },
  { id: "ORD-8005", customer: "Tanvir", items: "2x Sushi", total: "৳ 800", status: "Confirmed", date: "Jul 10, 2026" },
  { id: "ORD-8006", customer: "Mehedi Hasan", items: "1x Ramen", total: "৳ 350", status: "Confirmed", date: "Jul 10, 2026" },
  { id: "ORD-8007", customer: "Nusrat Jahan", items: "2x Steak", total: "৳ 1200", status: "Confirmed", date: "Jul 09, 2026" },
  { id: "ORD-8008", customer: "Arif Molla", items: "1x Biryani", total: "৳ 280", status: "Confirmed", date: "Jul 09, 2026" },
  { id: "ORD-8009", customer: "Sumaiya", items: "2x Chicken Fry", total: "৳ 550", status: "Confirmed", date: "Jul 08, 2026" },
  { id: "ORD-8010", customer: "Rakib Khan", items: "1x Soup, 1x Sandwich", total: "৳ 320", status: "Confirmed", date: "Jul 08, 2026" },
];

export default function OrdersConfirmedPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
  
      
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <CheckCircle className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Confirmed Orders
          </h2>
          <p className="mt-1 text-muted-foreground">
            Orders confirmed and queued for preparation.
          </p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={confirmedOrders} 
        enableSorting={true}
      />
    </div>
  );
}