"use client";

import { useMemo, useState } from "react";
import { CreditCard, Download, Search, UserPlus, UserCheck, UserX, Users, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { CustomerCard } from "@/components/dashboard/common/customer-card";
import { StatusMetrics } from "@/components/dashboard/admin/customers/profiles/customer-status";
import { useAdminCustomers } from "@/hooks/use-admin-customers";

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} mins ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} days ago`;
  return `${Math.floor(days / 30)} months ago`;
}

const statusOptions = [
  { label: "All", value: "" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data } = useAdminCustomers();

  const allCustomers = data ?? [];

  const filtered = useMemo(() => {
    let list = allCustomers;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q),
      );
    }
    if (statusFilter) {
      list = list.filter((c) => c.status === statusFilter);
    }
    return list;
  }, [allCustomers, search, statusFilter]);

  const adapted = useMemo(
    () =>
      filtered.map((c) => ({
        id: c.id,
        fullName: c.fullName,
        phone: c.phone,
        email: c.email,
        status: c.status as "ACTIVE" | "SUSPENDED" | "INACTIVE",
        totalOrders: c.totalOrders,
        walletBalance: c.walletBalance,
        lastActive: timeAgo(c.lastOrderDate ?? c.joinedAt),
      })),
    [filtered],
  );

  const totalHoldings = filtered.reduce((s, c) => s + c.walletBalance, 0);
  const activeCount = filtered.filter((c) => c.status === "ACTIVE").length;
  const suspendedCount = filtered.filter((c) => c.status === "SUSPENDED").length;

  return (
    <div>
      <PageHeader
        title="Customer Operations"
        description="View and manage customer profiles, segments, and account statuses."
        icon={Users}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export List
            </Button>
            <Button className="rounded-full">
              <UserPlus className="size-[18px]" />
              Add New Customer
            </Button>
          </>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Customers" value={allCustomers.length} icon={Users} accent="bottom" />
        <StatCard label="Active" value={allCustomers.filter((c) => c.status === "ACTIVE").length} variant="success" icon={UserCheck} accent="bottom" />
        <StatCard label="Suspended" value={allCustomers.filter((c) => c.status === "SUSPENDED").length} variant="warning" icon={UserX} accent="bottom" />
        <StatCard label="Wallet Holdings" value={`৳${allCustomers.reduce((s, c) => s + c.walletBalance, 0).toLocaleString()}`} variant="default" icon={Wallet} accent="bottom" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
            <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
            <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
            <div className="relative z-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-fraunces text-xl font-semibold text-foreground">Active Profiles</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search name, email, phone..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-9 w-56 rounded-full bg-muted pl-9 text-sm"
                    />
                  </div>
                  <div className="flex gap-1">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setStatusFilter(opt.value)}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase transition-all ${
                          statusFilter === opt.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {adapted.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))}
              </div>
              {adapted.length === 0 && (
                <p className="py-12 text-center text-sm text-muted-foreground">No customers match your search.</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 mt-8 space-y-8 lg:col-span-4 lg:mt-0">
          <DarkCard icon={<Wallet className="size-40" />}>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">Total Assets</p>
                <h4 className="font-fraunces text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] md:text-4xl">
                  ৳{(totalHoldings).toLocaleString()}
                </h4>
              </div>
              <Wallet className="size-8 text-primary drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <div className="mb-6 space-y-3">
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Cust. Wallet Holdings</p>
                <p className="mt-1 text-base font-bold text-white">৳{totalHoldings.toLocaleString()}</p>
              </div>
            </div>
            <Button className="w-full rounded-xl shadow-lg shadow-black/10">
              <CreditCard className="size-[18px]" />
              Manage Settlement
            </Button>
          </DarkCard>
          <GlassCard icon={<Users className="size-5 text-primary" />} iconBg="bg-primary/10" title="Recent Activity" value={filtered.length.toString()} subtitle="active profiles">
            <div className="mt-4 space-y-2">
              {adapted.slice(0, 5).map((c) => (
                <a
                  key={c.id}
                  href={`/dashboard/admin/customers/${c.id}`}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {c.fullName[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground truncate">{c.fullName}</p>
                    <p className="text-[10px] text-muted-foreground">{c.totalOrders} orders · ৳{c.totalOrders > 0 ? Math.round(allCustomers.find((x) => x.id === c.id)?.totalSpent ?? 0 / c.totalOrders) : 0} avg</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    c.status === "ACTIVE" ? "bg-success/10 text-success" : c.status === "SUSPENDED" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                  }`}>
                    {c.status}
                  </span>
                </a>
              ))}
            </div>
          </GlassCard>
          <StatusMetrics activeCount={activeCount} suspendedCount={suspendedCount} totalCustomers={allCustomers.length} />
        </div>
      </div>
    </div>
  );
}
