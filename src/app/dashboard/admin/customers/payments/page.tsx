"use client";

import { useState } from "react";
import { CreditCard, Download, Plus, Search, CheckCircle, XCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTable } from "@/components/common/table";
import { DataTableColumnHeader } from "@/components/common/table";
import type { ColumnDef } from "@tanstack/react-table";
import { PaymentStatusBadge } from "@/components/dashboard/admin/customers/payments/payment-status-badge";
import { CustomerSearch } from "@/components/dashboard/admin/customers/common/customer-search";
import { useAdminCustomerPayments } from "@/hooks/use-admin-customers";
import type { AdminPayment, AdminCustomer } from "@/types/admin";

const paymentColumns: ColumnDef<AdminPayment>[] = [
  {
    accessorKey: "paymentNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment #" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-foreground">{row.original.paymentNumber}</span>
    ),
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction ID" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">{row.original.transactionId ?? "—"}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{Number(row.original.amount).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <PaymentStatusBadge status={row.original.status as never} />,
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.paymentDate
          ? new Date(row.original.paymentDate).toLocaleDateString()
          : "—"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

export default function PaymentsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const { data, isLoading } = useAdminCustomerPayments(
    selectedCustomer?.id ?? "",
  );

  const payments = data ?? [];
  const total = payments.length;
  const completed = payments.filter((p) => p.status === "COMPLETED").length;
  const failed = payments.filter((p) => p.status === "FAILED").length;
  const refunded = payments.filter((p) => p.status === "REFUNDED" || p.status === "PARTIALLY_REFUNDED").length;
  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <PageHeader
        title="Financial Overview"
        description="Track and manage every financial interaction across the ecosystem."
        icon={CreditCard}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export CSV
            </Button>
            <Button className="rounded-full">
              <Plus className="size-[18px]" />
              Manual Refund
            </Button>
          </>
        }
      />
      <div className="mt-6">
        <CustomerSearch
          selectedCustomer={selectedCustomer}
          onSelect={setSelectedCustomer}
          placeholder="Search customer to view their payments..."
        />
      </div>
      {!selectedCustomer ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-fraunces text-lg font-bold text-foreground">Select a Customer</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Search for a customer above to view their payment history, transaction records, and refund status.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Payments" value={total} icon={CreditCard} accent="top" />
            <StatCard label="Revenue Collected" value={`৳${totalRevenue.toLocaleString()}`} variant="success" icon={CheckCircle} accent="top" />
            <StatCard label="Failed" value={failed} variant="danger" icon={XCircle} accent="top" />
            <StatCard label="Refunded" value={refunded} variant="warning" icon={Ban} accent="top" />
          </div>
          <div className="mt-6">
            <DataTable
              columns={paymentColumns}
              data={payments}
              isLoading={isLoading}
              pageSize={payments.length || 10}
              enableSearch={false}
              enableColumnToggle={false}
              emptyMessage="No payments for this customer."
            />
          </div>
        </>
      )}
    </div>
  );
}
