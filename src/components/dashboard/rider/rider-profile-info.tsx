"use client";

import {
  Bike,
  MapPin,
  Phone,
  User,
  FileText,
  Car,
  Calendar,
  ShieldAlert,
  Wallet,
  CreditCard,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Rider, useToggleDutyStatusMutation } from "@/store/api/slices/rider-api";

interface ProfileInfoProps {
  rider: Rider;
}

export function RiderProfileInfo({ rider }: ProfileInfoProps) {
  const [toggleDutyStatus, { isLoading: isTogglingDuty }] =
    useToggleDutyStatusMutation();

  const handleToggleDuty = async () => {
    try {
      await toggleDutyStatus({
        riderCode: rider.riderCode,
        isOnline: !rider.isOnline,
      }).unwrap();
    } catch (error) {
      console.error("Failed to toggle duty status:", error);
    }
  };

  const formattedJoinDate = rider.createdAt
    ? new Date(rider.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "N/A";

  const verifiedDocsCount =
    rider.documents?.filter((doc) => doc.status === "VERIFIED").length || 0;
  const totalDocsCount = rider.documents?.length || 0;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left 2 Columns */}
      <div className="space-y-6 lg:col-span-2">
        {/* Personal Details */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Personal Information
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <User className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium text-foreground">
                  {rider.firstName} {rider.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{rider.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Work Zone</p>
                <p className="font-medium text-foreground">
                  {rider.workZone || "N/A"}
                  {rider.workZoneDistrict ? `, ${rider.workZoneDistrict}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-medium text-foreground">{formattedJoinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Details & Verification */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Vehicle & Documents
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Car className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Vehicle Type</p>
                <p className="font-medium text-foreground">
                  {rider.vehicle?.vehicleType || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Reg Number</p>
                <p className="font-medium text-foreground">
                  {rider.vehicle?.vehicleRegNumber || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Documents Status</p>
                <p className="font-medium text-foreground">
                  {totalDocsCount > 0
                    ? `${verifiedDocsCount}/${totalDocsCount} Verified`
                    : "No Documents Uploaded"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Account Status</p>
                <p
                  className={cn(
                    "font-medium",
                    rider.status === "APPROVED"
                      ? "text-emerald-600"
                      : rider.status === "PENDING"
                        ? "text-amber-600"
                        : "text-destructive"
                  )}
                >
                  {rider.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
          <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <ShieldAlert className="size-5 text-amber-500" />
            Emergency Contact
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="font-medium text-foreground">
                {rider.emergencyName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">
                {rider.emergencyPhone || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Relation</p>
              <p className="font-medium text-foreground capitalize">
                {rider.emergencyRelation || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Status Card */}
        <div
          className={cn(
            "rounded-3xl p-6 shadow-[var(--shadow-card)] transition-all",
            rider.isOnline
              ? "bg-gradient-to-br from-success/10 via-card to-success/[0.04]"
              : "bg-gradient-to-br from-muted via-card to-muted/50"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Duty Status
              </p>
              <p
                className={cn(
                  "font-heading text-xl font-bold",
                  rider.isOnline ? "text-success" : "text-muted-foreground"
                )}
              >
                {rider.isOnline ? "Online" : "Offline"}
              </p>
            </div>
            <Bike
              className={cn(
                "size-8",
                rider.isOnline ? "text-success" : "text-muted-foreground"
              )}
            />
          </div>
          <button
            disabled={isTogglingDuty}
            onClick={handleToggleDuty}
            className={cn(
              "mt-4 w-full rounded-xl py-2 text-sm font-semibold transition-all disabled:opacity-50",
              rider.isOnline
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "bg-success/10 text-success hover:bg-success/20"
            )}
          >
            {isTogglingDuty
              ? "Updating..."
              : rider.isOnline
                ? "Go Offline"
                : "Go Online"}
          </button>
        </div>

        {/* Wallet Overview */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
          <h4 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
            <Wallet className="size-4 text-primary" /> Wallet Overview
          </h4>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Balance</span>
              <span className="font-bold text-foreground">
                ৳{(rider.wallet?.currentBalance || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pending Balance</span>
              <span className="font-medium text-amber-600">
                ৳{(rider.wallet?.pendingBalance || 0).toLocaleString()}
              </span>
            </div>
            <hr className="my-2 border-border" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CreditCard className="size-3.5" /> Payout Method
              </span>
              <span className="font-medium text-foreground">
                {rider.payout?.payoutMethod || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mobile Wallet</span>
              <span className="font-medium text-foreground">
                {rider.payout?.mobileWalletNumber || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}