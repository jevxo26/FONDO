"use client";

import { useState } from "react";
import type { CustomerOrder } from "@/data/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "./order-status-badge";
import { Pagination } from "./pagination";

interface OrdersTableProps {
  orders: CustomerOrder[];
}

const PAGE_SIZE = 10;

export function OrdersTable({ orders }: OrdersTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageOrders = orders.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium text-foreground">
                {order.orderNumber}
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.customerId}
                  </p>
                </div>
              </TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell className="font-medium">
                ৳{order.totalAmount.toLocaleString()}
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.orderStatus} />
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs font-bold ${
                    order.paymentStatus === "PAID"
                      ? "text-success"
                      : order.paymentStatus === "REFUNDED"
                        ? "text-muted-foreground"
                        : "text-destructive"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {order.placedAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
