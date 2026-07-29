"use client";

import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetOrderQuery, useUpdateOrderStatusMutation } from "@/store/api/slices/orders-api";
import { useGetAllAdminOrdersQuery } from "@/store/api/slices/admin-customers-api";
import type { Order, OrderItem, OrderTimeline as OrderTimelineType } from "@/types/order";
import type { OrderStatus } from "@/data/orders";
import OrderNotFound from "@/components/dashboard/admin/orders/order-detail/order-not-found";
import OrderHeaderSection from "@/components/dashboard/admin/orders/order-detail/order-header-section";
import OrderTimeline from "@/components/dashboard/admin/orders/order-detail/order-timeline";
import OrderItemsPricing from "@/components/dashboard/admin/orders/order-detail/order-items-pricing";
import OrderCustomerInfo from "@/components/dashboard/admin/orders/order-detail/order-customer-info";
import OrderVendorRiderInfo from "@/components/dashboard/admin/orders/order-detail/order-vendor-rider-info";

function OrderDetailContent({ orderId }: { orderId: string }) {
  const { data: order, isLoading, error } = useGetOrderQuery(orderId);
  useGetAllAdminOrdersQuery();

  const [confirmOrder, { isLoading: isConfirming }] = useUpdateOrderStatusMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) return <OrderNotFound />;

  const isPending = order.orderStatus === "PENDING";
  const orderStatus = order.orderStatus as OrderStatus;

  const timelineItems = (order.timeline as OrderTimelineType[]).map((t) => ({
    label: t.title,
    time: t.createdAt ? new Date(t.createdAt).toLocaleString() : null,
    done: true,
  }));

  const itemRows = (order.items as OrderItem[]).map((item) => ({
    name: item.food?.name ?? "Unknown item",
    quantity: item.quantity,
    price: Number(item.totalPrice),
  }));

  const subtotal = Number(order.subtotal);
  const deliveryFee = Number(order.deliveryCharge);
  const discount = Number(order.discount);
  const total = Number(order.totalAmount);

  const customerName = `${order.customer.firstName} ${order.customer.lastName}`;
  const customerPhone = order.customer.phone;
  const vendorName =
    (order as Order & { vendor?: { businessName: string } }).vendor?.businessName ??
    "Not assigned yet";
  const riderName = order.delivery?.rider?.fullName ?? "Not assigned yet";

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to All Orders
        </Link>
      </div>

      <OrderHeaderSection
        orderNumber={order.orderNumber}
        orderStatus={orderStatus}
        placedAt={order.placedAt}
        isPending={isPending}
        isConfirming={isConfirming}
        onConfirm={async () => {
          try {
            await confirmOrder({ orderId, status: "CONFIRMED" }).unwrap();
            toast.success("Order confirmed");
          } catch {
            toast.error("Failed to confirm order");
          }
        }}
      />

      <div className="mb-8 grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <OrderTimeline timelineItems={timelineItems} />
          <OrderItemsPricing
            items={itemRows}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
          />
        </div>

        <div className="space-y-5">
          <OrderCustomerInfo name={customerName} phone={customerPhone} />
          <OrderVendorRiderInfo vendor={vendorName} rider={riderName} />
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <OrderDetailContent orderId={id} />;
}
