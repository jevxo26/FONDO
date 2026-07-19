"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Shield,
  Wallet,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { useAdminCustomer, useAdminCustomerOrders } from "@/hooks/use-admin-customers";
import { OrderStatusBadge } from "@/components/dashboard/admin/customers/orders/order-status-badge";

const statusConfig: Record<string, { label: string; style: string }> = {
  ACTIVE: { label: "Active", style: "bg-success/10 text-success border-success/20" },
  INACTIVE: { label: "Inactive", style: "bg-muted text-muted-foreground border-border" },
  SUSPENDED: { label: "Suspended", style: "bg-destructive/10 text-destructive border-destructive/20" },
};

const tabs = [
  { label: "Overview", href: "" },
  { label: "Orders", href: "/orders" },
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Payments", href: "/payments" },
  { label: "Wallet", href: "/wallets" },
];

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: customer, isLoading } = useAdminCustomer(id);
  const { data: recentOrders } = useAdminCustomerOrders(id, { page: 1, limit: 5 });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-3xl" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <XCircle className="size-12 text-destructive" />
        <h2 className="mt-4 font-fraunces text-xl font-bold">Customer not found</h2>
        <Link href="/dashboard/admin/customers" className="mt-2 text-sm text-primary hover:underline">
          Back to customers
        </Link>
      </div>
    );
  }

  const statusStyle = statusConfig[customer.status] ?? { label: customer.status, style: "bg-muted text-muted-foreground" };

  return (
    <div>
      <Link
        href="/dashboard/admin/customers"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Customers
      </Link>

      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] md:p-8">
        <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
        <div className="relative z-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="size-16 md:size-20">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl font-bold text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-primary/10">
                  {customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-fraunces text-2xl font-bold text-foreground md:text-3xl">
                    {customer.fullName}
                  </h1>
                  <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase ${statusStyle.style}`}>
                    {statusStyle.label}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5" /> {customer.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="size-3.5" /> {customer.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" /> Joined {formatDate(customer.joinedAt)}
                  </span>
                  {customer.gender && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" /> {customer.gender}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Shield className="size-3.5" />
                    {customer.isEmailVerified ? "Email verified" : "Email unverified"}
                    {customer.isPhoneVerified ? " · Phone verified" : " · Phone unverified"}
                  </span>
                </div>
              </div>
            </div>
            {customer.lastLoginAt && (
              <div className="text-right text-xs text-muted-foreground">
                Last login: {formatDate(customer.lastLoginAt)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const href = tab.href ? `/dashboard/admin/customers/${id}${tab.href}` : `/dashboard/admin/customers/${id}`;
            const isActive = tab.href === "";
            return (
              <Link
                key={tab.label}
                href={href}
                className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={customer.totalOrders} icon={ShoppingBag} accent="bottom" />
        <StatCard label="Total Spent" value={`৳${customer.totalSpent.toLocaleString()}`} icon={CreditCard} accent="bottom" />
        <StatCard label="Subscriptions" value={customer.totalSubscriptions} icon={Package} accent="bottom" />
        <StatCard label="Payments" value={customer.totalPayments} icon={Wallet} accent="bottom" />
      </div>

      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
            <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-fraunces text-xl font-semibold text-foreground">Recent Orders</h3>
                <Link
                  href={`/dashboard/admin/customers/${id}/orders`}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="mt-6 space-y-3">
                {recentOrders?.items.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <div>
                      <p className="text-sm font-bold text-foreground">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items} items · {formatDate(order.placedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-foreground">৳{order.totalAmount.toLocaleString()}</span>
                      <OrderStatusBadge status={order.orderStatus as never} />
                    </div>
                  </div>
                ))}
                {(!recentOrders?.items || recentOrders.items.length === 0) && (
                  <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
            <div className="relative z-10">
              <h3 className="font-fraunces text-lg font-semibold text-foreground">Account Info</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">Customer ID</span>
                  <span className="text-sm font-bold text-foreground">{customer.id.slice(0, 8)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">Date of Birth</span>
                  <span className="text-sm font-bold text-foreground">{formatDate(customer.dateOfBirth)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">Email Verified</span>
                  {customer.isEmailVerified ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    <XCircle className="size-4 text-destructive" />
                  )}
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">Phone Verified</span>
                  {customer.isPhoneVerified ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    <XCircle className="size-4 text-destructive" />
                  )}
                </div>
                {customer.lastOrder && (
                  <>
                    <div className="my-2 border-t border-primary/10" />
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Order</p>
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                      <div>
                        <p className="text-sm font-bold text-foreground">৳{customer.lastOrder.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(customer.lastOrder.placedAt)}</p>
                      </div>
                      <OrderStatusBadge status={customer.lastOrder.orderStatus as never} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
