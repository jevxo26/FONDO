"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminCustomer, useAdminCustomerOrders } from "@/hooks/use-admin-customers";
import CustomerProfileHeader from "@/components/dashboard/admin/customers/detail/customer-profile-header";
import CustomerStatCards from "@/components/dashboard/admin/customers/detail/customer-stat-cards";
import CustomerRecentOrders from "@/components/dashboard/admin/customers/detail/customer-recent-orders";
import CustomerAccountInfo from "@/components/dashboard/admin/customers/detail/customer-account-info";

const statusConfig: Record<string, { label: string; style: string }> = {
  ACTIVE: { label: "Active", style: "bg-success/10 text-success border-success/20" },
  INACTIVE: { label: "Inactive", style: "bg-muted text-muted-foreground border-border" },
  SUSPENDED: {
    label: "Suspended",
    style: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: customer, isLoading } = useAdminCustomer(id);
  const { data: recentOrders } = useAdminCustomerOrders(id);

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
        <Link
          href="/dashboard/admin/customers"
          className="mt-2 text-sm text-primary hover:underline"
        >
          Back to customers
        </Link>
      </div>
    );
  }

  const status = statusConfig[customer.status] ?? {
    label: customer.status,
    style: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <Link
        href="/dashboard/admin/customers"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Customers
      </Link>

      <CustomerProfileHeader
        fullName={customer.fullName}
        email={customer.email}
        phone={customer.phone}
        joinedAt={customer.joinedAt}
        gender={customer.gender}
        isEmailVerified={customer.isEmailVerified}
        isPhoneVerified={customer.isPhoneVerified}
        lastLoginAt={customer.lastLoginAt}
        statusLabel={status.label}
        statusStyle={status.style}
      />

      <CustomerStatCards
        totalOrders={customer.totalOrders}
        totalSpent={customer.totalSpent}
        totalSubscriptions={customer.totalSubscriptions}
        totalPayments={customer.totalPayments}
      />

      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <CustomerRecentOrders orders={recentOrders ?? []} customerId={id} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CustomerAccountInfo
            id={customer.id}
            dateOfBirth={customer.dateOfBirth}
            isEmailVerified={customer.isEmailVerified}
            isPhoneVerified={customer.isPhoneVerified}
            lastOrder={customer.lastOrder}
          />
        </div>
      </div>
    </div>
  );
}
