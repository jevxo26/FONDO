"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Mail, MapPin, Phone, Shield } from "lucide-react";

interface CustomerProfileHeaderProps {
  fullName: string;
  email: string;
  phone: string;
  joinedAt: string | null;
  gender: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt: string | null;
  statusLabel: string;
  statusStyle: string;
}

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CustomerProfileHeader({
  fullName,
  email,
  phone,
  joinedAt,
  gender,
  isEmailVerified,
  isPhoneVerified,
  lastLoginAt,
  statusLabel,
  statusStyle,
}: CustomerProfileHeaderProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] md:p-8">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="size-16 md:size-20">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl font-bold text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-primary/10">
                {fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-fraunces text-2xl font-bold text-foreground md:text-3xl">
                  {fullName}
                </h1>
                <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase ${statusStyle}`}>
                  {statusLabel}
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5" /> {email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" /> {phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> Joined {formatDate(joinedAt)}
                </span>
                {gender && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> {gender}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Shield className="size-3.5" />
                  {isEmailVerified ? "Email verified" : "Email unverified"}
                  {isPhoneVerified ? " · Phone verified" : " · Phone unverified"}
                </span>
              </div>
            </div>
          </div>
          {lastLoginAt && (
            <div className="text-right text-xs text-muted-foreground">
              Last login: {formatDate(lastLoginAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
