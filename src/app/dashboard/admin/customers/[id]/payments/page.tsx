"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle, XCircle, Ban } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatCard } from "@/components/dashboard/common/stat-card";
import {
  useAdminCustomerPayments,
  type AdminPayment,
} from "@/hooks/use-admin-customers";
import type { ColumnDef } from "@tanstack/react-table";
import { PaymentStatusBadge } from "@/components/dashboard/admin/customers/payments/payment-status-badge";

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
      <span className="font-mono text-sm text-muted-foreground">
        {row.original.transactionId ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        ৳{Number(row.original.amount).toLocaleString()}
      </span>
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

export default function CustomerPaymentsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAdminCustomerPayments(id, { page: 1, limit: 50 });

  const payments = data?.items ?? [];
  const total = payments.length;
  const completed = payments.filter((p) => p.status === "COMPLETED").length;
  const failed = payments.filter((p) => p.status === "FAILED").length;
  const refunded = payments.filter((p) => p.status === "REFUNDED" || p.status === "PARTIALLY_REFUNDED").length;
  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <Link
        href={`/dashboard/admin/customers/${id}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Customer
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-fraunces text-2xl font-bold text-foreground">Payments</h1>
        <div className="flex gap-1">
          <Link href={`/dashboard/admin/customers/${id}`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Overview</Link>
          <Link href={`/dashboard/admin/customers/${id}/orders`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Orders</Link>
          <Link href={`/dashboard/admin/customers/${id}/subscriptions`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Subscriptions</Link>
          <Link href={`/dashboard/admin/customers/${id}/payments`} className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase text-primary-foreground">Payments</Link>
          <Link href={`/dashboard/admin/customers/${id}/wallets`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Wallet</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </div>
  );
}
