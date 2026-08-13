"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Clock,
  FileCheck2,
  ShieldCheck,
  Store,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useGetVendorByCodeQuery } from "@/store/api/slices/admin-vendor-api";
import { useGetVendorWalletQuery } from "@/store/api/slices/vendor-settlement-api";

export default function VendorDetailsPage() {
  const { id: vendorCode } = useParams() as { id: string };
  console.log("Vendor Code from params:", vendorCode); // Debugging line
  const {
    data: vendor,
    isLoading: isVendorLoading,
    isError,
  } = useGetVendorByCodeQuery(vendorCode);

  const { data: wallet, isLoading: isWalletLoading } =
    useGetVendorWalletQuery(vendorCode);

  if (isVendorLoading) {
    return (
      <div className="flex h-96 items-center justify-center rounded-2xl border bg-card text-muted-foreground">
        Loading vendor details...
      </div>
    );
  }

  if (isError || !vendor) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-destructive/20 bg-card p-12 text-center">
        <h2 className="text-xl font-bold text-destructive">Vendor Not Found</h2>
        <p className="text-sm text-muted-foreground">
          Could not fetch details for vendor code: {vendorCode}
        </p>
        <Button variant="outline">
          <Link href="/dashboard/admin/vendors">
            <ArrowLeft className="mr-2 size-4" /> Back to Vendors List
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/admin/vendors"
              className="text-xs text-muted-foreground hover:underline"
            >
              Vendors
            </Link>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs font-mono font-medium">{vendor.vendorCode}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight md:text-3xl">
            {vendor.businessName}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Managed by {vendor.ownerName}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="outline" >
            <Link href={`/dashboard/admin/vendors/${vendor.vendorCode}/edit`}>
              Edit Info
            </Link>
          </Button>
          <Button >
            <Link href={`/dashboard/admin/vendors/${vendor.vendorCode}/branches`}>
              View Branches ({vendor._count?.branches ?? 0})
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Banner / Cover */}
      {vendor.coverImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={vendor.coverImage}
            alt={vendor.businessName}
            fill
            className="object-cover"
            priority
          />
          {vendor.logo && (
            <div className="absolute bottom-4 left-6 size-20 overflow-hidden rounded-2xl border-4 border-background shadow-lg">
              <Image
                src={vendor.logo}
                alt={vendor.businessName}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Core Info */}
        <div className="col-span-3 space-y-6">
          {/* Business Information Card */}
          <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
            <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                  <Store className="size-5" />
                </div>
                <h2 className="text-lg font-semibold">Business Information</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Business Name</p>
                  <p className="font-medium">{vendor.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Owner Name</p>
                  <p className="font-medium">{vendor.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{vendor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{vendor.phone}</p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm text-foreground/80">
                    {vendor.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics & Commission Settings */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
              <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                    <Clock className="size-5" />
                  </div>
                  <h2 className="text-lg font-semibold">Operating Hours</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Opening Time</span>
                    <span className="font-medium">{vendor.openingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Closing Time</span>
                    <span className="font-medium">{vendor.closingTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
              <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                    <Building2 className="size-5" />
                  </div>
                  <h2 className="text-lg font-semibold">Commission Config</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="font-medium">{vendor.commissionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Value</span>
                    <span className="font-medium">
                      {vendor.commissionType === "PERCENTAGE"
                        ? `${vendor.commissionValue}%`
                        : `৳${vendor.commissionValue}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Legal Credentials */}
          <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
            <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                  <FileCheck2 className="size-5" />
                </div>
                <h2 className="text-lg font-semibold">Legal & Verification</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Trade License</p>
                  <p className="font-mono text-sm font-medium">
                    {vendor.tradeLicenseNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">TIN Number</p>
                  <p className="font-mono text-sm font-medium">
                    {vendor.tinNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">BIN Number</p>
                  <p className="font-mono text-sm font-medium">
                    {vendor.binNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status & Wallet Controls */}
        <div className="space-y-6">
          {/* Status Box */}
          <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
            <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                  <ShieldCheck className="size-5" />
                </div>
                <h2 className="text-lg font-semibold">Current Status</h2>
              </div>
              <Badge
                variant={
                  vendor.status === "APPROVED"
                    ? "default"
                    : vendor.status === "PENDING"
                      ? "secondary"
                      : "destructive"
                }
                className="mb-4 w-full justify-center py-1"
              >
                {vendor.status}
              </Badge>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Online</span>
                  <span
                    className={`text-sm font-bold ${vendor.isOnline ? "text-emerald-600" : "text-muted-foreground"
                      }`}
                  >
                    {vendor.isOnline ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Flag</span>
                  <span
                    className={`text-sm font-bold ${vendor.isActive ? "text-emerald-600" : "text-destructive"
                      }`}
                  >
                    {vendor.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Verification</span>
                  <span className="text-sm font-bold text-foreground">
                    {vendor.verificationStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Summary Widget */}
          <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
            <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                  <Wallet className="size-5" />
                </div>
                <h2 className="text-lg font-semibold">Financials</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground">Available Balance</span>
                  <p className="text-2xl font-bold">
                    {isWalletLoading
                      ? "..."
                      : `৳${wallet?.balance.toLocaleString() ?? 0}`}
                  </p>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-xs text-muted-foreground">
                    Pending Settlements
                  </span>
                  <span className="text-xs font-semibold">
                    ৳{wallet?.holdBalance?.toLocaleString() ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}