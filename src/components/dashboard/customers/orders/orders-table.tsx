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
import { ChevronRight } from "lucide-react";

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
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Order #
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Customer
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Items
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Total
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Payment
              </TableHead>
              <TableHead className="text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageOrders.map((order) => (
              <TableRow
                key={order.id}
                className="transition-colors hover:bg-secondary/60"
              >
                <TableCell className="px-6 py-5 font-bold text-foreground">
                  {order.orderNumber}
                </TableCell>
                <TableCell className="px-6 py-5">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {order.customerName}
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {order.customerId}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-5 text-sm text-muted-foreground">
                  {order.items}
                </TableCell>
                <TableCell className="px-6 py-5 font-bold text-foreground">
                  ৳{order.totalAmount.toLocaleString()}
                </TableCell>
                <TableCell className="px-6 py-5">
                  <OrderStatusBadge status={order.orderStatus} />
                </TableCell>
                <TableCell className="px-6 py-5">
                  <span
                    className={`text-[11px] font-bold uppercase ${
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
                <TableCell className="px-6 py-5 text-right">
                  <button className="flex items-center justify-end gap-1 text-[11px] font-bold text-primary transition-all hover:gap-2">
                    View Details <ChevronRight className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={PAGE_SIZE}
        totalItems={orders.length}
        onPageChange={setPage}
      />
    </div>
  );
}
