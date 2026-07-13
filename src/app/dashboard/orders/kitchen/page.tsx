"use client";

import { CookingPot, Download, Plus } from "lucide-react";
import { PendingOrdersTable } from "@/components/dashboard/orders/pending-orders-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/common/cards/stat-card";

type Order = { id: string; customer: string; items: string; total: string; status: string; date: string; };

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "ORDER ID" },
  { accessorKey: "customer", header: "CUSTOMER" },
  { accessorKey: "items", header: "ITEMS" },
  { 
    accessorKey: "status", 
    header: "STATUS",
    cell: ({ row }) => (
      <Badge className="rounded-full bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
        In Kitchen
      </Badge>
    )
  },
  { accessorKey: "date", header: "DATE" },
];

const kitchenOrders: Order[] = [
  { id: "ORD-7001", customer: "Rafiqul Islam", items: "2x Beef Biryani", total: "৳ 700", status: "In Kitchen", date: "Jul 13, 2026" },
  { id: "ORD-7002", customer: "Anika Tasnim", items: "1x Thai Soup", total: "৳ 350", status: "In Kitchen", date: "Jul 13, 2026" },
  { id: "ORD-7003", customer: "Masud Rana", items: "3x Pizza", total: "৳ 1800", status: "In Kitchen", date: "Jul 13, 2026" },
  { id: "ORD-7004", customer: "Sarah Binte", items: "2x Burger", total: "৳ 450", status: "In Kitchen", date: "Jul 13, 2026" },
  { id: "ORD-7005", customer: "Kamal Uddin", items: "1x Mixed Chowmein", total: "৳ 300", status: "In Kitchen", date: "Jul 12, 2026" },
];

export default function OrdersKitchenPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <CookingPot className="size-8 text-primary" />
        </div>
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-fraunces text-4xl font-bold text-foreground">Kitchen Queue</h2>
            <p className="mt-1 text-muted-foreground">Orders currently being prepared in kitchens.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full"><Download className="size-4 mr-2" /> Export</Button>
            <Button className="rounded-full"><Plus className="size-4 mr-2" /> Assign Chef</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total in Kitchen" value={kitchenOrders.length} />
        <StatCard label="Active Chefs" value="6" />
        <StatCard label="Avg. Prep Time" value="15m" />
        <StatCard label="Delayed" value="1" />
      </div>

      {/* Table */}
      <div className="mt-6">
        <PendingOrdersTable columns={columns} data={kitchenOrders} />
      </div>
    </div>
  );
}