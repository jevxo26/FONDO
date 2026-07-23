"use client";

import { OrdersTable } from "@/components/dashboard/orders/orders-table";
import { vendorOrderColumns, VendorOrder } from "./order-columns";


const mockVendorOrders: VendorOrder[] = [
  { id: "1", orderNumber: "ORD-901", customerName: "Rahim Ahmed", itemsCount: 3, totalAmount: 1250, status: "Pending", date: "2026-07-23" },
  { id: "2", orderNumber: "ORD-902", customerName: "Nusrat Jahan", itemsCount: 2, totalAmount: 850, status: "Preparing", date: "2026-07-23" },
  { id: "3", orderNumber: "ORD-903", customerName: "Tanvir Hossain", itemsCount: 5, totalAmount: 3100, status: "Ready", date: "2026-07-22" },
];

export function VendorOrdersTableSection() {
  return (
    <div className="space-y-4">
      <OrdersTable columns={vendorOrderColumns} data={mockVendorOrders} />
    </div>
  );
}