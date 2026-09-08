"use client";

import { useState } from "react";
import { Banknote, ShoppingBag, Truck, Percent, FileText } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { usePlatformRevenue } from "@/store/api/slices/admin-payments-api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function PlatformRevenuePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { data, isLoading } = usePlatformRevenue({ from: from || undefined, to: to || undefined });

  const breakdown = [
    { name: "Commission", value: Number(data?.commissionRevenue ?? 0) },
    { name: "Delivery", value: Number(data?.deliveryRevenue ?? 0) },
    { name: "Service", value: Number(data?.subscriptionRevenue ?? 0) },
    { name: "VAT", value: Number(data?.vat ?? 0) },
  ];

  return (
    <div>
      <PageHeader title="Platform Revenue" description="Track platform-wide revenue and commission." icon={Banknote} />

      <div className="mt-8 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`৳${Number(data?.totalRevenue ?? 0).toLocaleString()}`} icon={Banknote} accent="right" />
        <StatCard label="Commission" value={`৳${Number(data?.commissionRevenue ?? 0).toLocaleString()}`} icon={Percent} variant="success" accent="right" />
        <StatCard label="Delivery" value={`৳${Number(data?.deliveryRevenue ?? 0).toLocaleString()}`} icon={Truck} variant="warning" accent="right" />
        <StatCard label="VAT" value={`৳${Number(data?.vat ?? 0).toLocaleString()}`} icon={FileText} accent="right" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="mb-2 flex items-center gap-2 font-heading text-lg font-bold text-foreground">
            <ShoppingBag className="size-4 text-foreground" /> Revenue Breakdown
          </h2>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading revenue data...</p>
          ) : (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="var(--chart-1)" name="Revenue (৳)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Revenue Mix</h2>
          <div className="space-y-3">
            {breakdown.map((b) => (
              <div key={b.name} className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">{b.name}</span>
                <span className="font-heading text-base font-bold text-foreground">৳{b.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3">
              <span className="text-sm font-bold text-foreground">Total</span>
              <span className="font-heading text-lg font-bold text-foreground">৳{Number(data?.totalRevenue ?? 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}