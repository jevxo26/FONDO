"use client";

import { useState } from "react";
import { Bike, MapPin, Phone, User, Shield, FileText, Car, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Rider } from "@/data/riders";

interface ProfileInfoProps {
  rider: Rider;
}

export function RiderProfileInfo({ rider }: ProfileInfoProps) {
  const [online, setOnline] = useState(rider.status === "ACTIVE");

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-heading text-lg font-semibold text-foreground">Personal Information</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <User className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{rider.name}</p>
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
                <p className="text-xs text-muted-foreground">Zone</p>
                <p className="font-medium text-foreground">{rider.zone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-medium text-foreground">{rider.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-heading text-lg font-semibold text-foreground">Vehicle & Documents</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Car className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Vehicle Type</p>
                <p className="font-medium text-foreground">{rider.vehicleType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Documents</p>
                <p className="font-medium text-green-600">Verified ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className={cn(
          "rounded-3xl p-6 shadow-[var(--shadow-card)] transition-all",
          online
            ? "bg-gradient-to-br from-success/10 via-card to-success/[0.04]"
            : "bg-gradient-to-br from-muted via-card to-muted/50",
        )}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Status</p>
              <p className={cn("font-heading text-xl font-bold", online ? "text-success" : "text-muted-foreground")}>
                {online ? "Online" : "Offline"}
              </p>
            </div>
            <Bike className={cn("size-8", online ? "text-success" : "text-muted-foreground")} />
          </div>
          <button
            onClick={() => setOnline(!online)}
            className={cn(
              "mt-4 w-full rounded-xl py-2 text-sm font-semibold transition-all",
              online
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "bg-success/10 text-success hover:bg-success/20",
            )}
          >
            {online ? "Go Offline" : "Go Online"}
          </button>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
          <h4 className="font-heading text-base font-semibold text-foreground">Stats</h4>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Deliveries</span>
              <span className="font-medium text-foreground">{rider.totalDeliveries}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rating</span>
              <span className="font-medium text-amber-500">{rider.rating} ★</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Earnings</span>
              <span className="font-medium text-foreground">৳{rider.earnings.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Completed Today</span>
              <span className="font-medium text-foreground">{rider.completedToday}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
