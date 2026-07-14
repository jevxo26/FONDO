// OrdersDeliveryPage.tsx
"use client";

import { Truck, ArrowUpDown } from "lucide-react";
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
  deliveryAddress: string;
  deliveryBoy: string;
};

const deliveryOrders: Order[] = [
  { id: "ORD-6001", customer: "Rahim Ahmed", items: "2x Pizza", total: "৳ 1200", status: "Out for Delivery", date: "Jul 13, 2026", deliveryAddress: "Mirpur 10, Dhaka", deliveryBoy: "Kamal Hossain" },
  { id: "ORD-6002", customer: "Saima Akter", items: "1x Burger, 1x Fries", total: "৳ 450", status: "Out for Delivery", date: "Jul 13, 2026", deliveryAddress: "Dhanmondi 27, Dhaka", deliveryBoy: "Rafiqul Islam" },
  { id: "ORD-6003", customer: "Karim Uddin", items: "3x Pasta", total: "৳ 900", status: "Out for Delivery", date: "Jul 13, 2026", deliveryAddress: "Gulshan 2, Dhaka", deliveryBoy: "Shahidul Haque" },
  { id: "ORD-6004", customer: "Jannat Khan", items: "1x Salad, 1x Soup", total: "৳ 320", status: "Out for Delivery", date: "Jul 12, 2026", deliveryAddress: "Banani 11, Dhaka", deliveryBoy: "Mizanur Rahman" },
  { id: "ORD-6005", customer: "Tanvir Hasan", items: "2x Sushi", total: "৳ 800", status: "Out for Delivery", date: "Jul 12, 2026", deliveryAddress: "Uttara 12, Dhaka", deliveryBoy: "Nurul Islam" },
  { id: "ORD-6006", customer: "Mehedi Hasan", items: "1x Ramen", total: "৳ 350", status: "Out for Delivery", date: "Jul 12, 2026", deliveryAddress: "Mohammadpur, Dhaka", deliveryBoy: "Aminul Haque" },
  { id: "ORD-6007", customer: "Nusrat Jahan", items: "2x Steak", total: "৳ 1200", status: "Out for Delivery", date: "Jul 11, 2026", deliveryAddress: "Baridhara, Dhaka", deliveryBoy: "Rashidul Islam" },
  { id: "ORD-6008", customer: "Arif Molla", items: "1x Biryani", total: "৳ 280", status: "Out for Delivery", date: "Jul 11, 2026", deliveryAddress: "Khilkhet, Dhaka", deliveryBoy: "Fazlul Haque" },
  { id: "ORD-6009", customer: "Sumi Khatun", items: "2x Chicken Fry", total: "৳ 550", status: "Out for Delivery", date: "Jul 10, 2026", deliveryAddress: "Rampura, Dhaka", deliveryBoy: "Jahangir Alam" },
  { id: "ORD-6010", customer: "Rakib Khan", items: "1x Sandwich", total: "৳ 250", status: "Out for Delivery", date: "Jul 10, 2026", deliveryAddress: "Shyamoli, Dhaka", deliveryBoy: "Morshed Ali" },
];

export default function OrdersDeliveryPage() {
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
        <Badge className="rounded-full bg-purple-100 text-purple-700 hover:bg-purple-100 border-0">
          {row.getValue("status")}
        </Badge>
      )
    },
    {
      accessorKey: "deliveryBoy",
      header: "DELIVERY BOY"
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
        title="Delivery Queue"
        description="Orders out for delivery to customers."
        icon={Truck}
      />
      <DataTable
        columns={columns}
        data={deliveryOrders}
        pageSize={5}
        enableSorting={true}
        enableSearch={true}
        enableColumnToggle={true}
        // enableRowSelection={false}
        isLoading={false}
        emptyMessage="No orders out for delivery."
        skeletonRows={5}
      />
    </div>
  );
}