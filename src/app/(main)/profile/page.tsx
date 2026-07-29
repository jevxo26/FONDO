"use client";

import { useState } from "react";
import { User, Settings, MapPin, Clock, Smartphone, ShoppingBag, Wallet, Heart } from "lucide-react";
import { OrderHistory, WalletBalance } from "@/components/profile/activity-finance";
import { AddressManager } from "@/components/profile/address-manager";
import { LoginHistoryTable } from "@/components/profile/login-history-table";
import { DeviceRegistry } from "@/components/profile/device-registry";
import { ChangePasswordForm, PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import FavoritesList from "@/components/profile/favorites-list";

const tabIcons: Record<string, React.ReactNode> = {
  "personal-info": <User className="size-4" />,
  "change-password": <Settings className="size-4" />,
  "addresses": <MapPin className="size-4" />,
  "login-history": <Clock className="size-4" />,
  "devices": <Smartphone className="size-4" />,
  "order-history": <ShoppingBag className="size-4" />,
  "wallet": <Wallet className="size-4" />,
  "favorites": <Heart className="size-4" />,
};

export default function CustomerProfileWorkspace() {
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <section className="py-12 bg-gradient-to-br from-primary/[0.01] via-background to-primary/[0.01] min-h-screen relative">
      <div className="pointer-events-none absolute -top-40 -right-40 z-0 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 z-0 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="lg:col-span-9 rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] p-6 md:p-8 shadow-[var(--shadow-card)] relative overflow-hidden">
          <div className="pointer-events-none absolute -top-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 z-0 size-24 rounded-full bg-primary/5 blur-2xl" />
          <div className="pointer-events-none absolute right-4 top-4 z-10 size-[7px] rotate-45 border border-primary/30" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/40">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                {tabIcons[activeTab] || <User className="size-4 text-primary" />}
              </div>
              <h2 className="font-heading text-lg font-semibold text-foreground capitalize">
                {activeTab.replace(/-/g, " ")}
              </h2>
            </div>
            {activeTab === "personal-info" && <PersonalInfoForm />}
            {activeTab === "change-password" && <ChangePasswordForm />}
            {activeTab === "addresses" && <AddressManager />}
            {activeTab === "login-history" && <LoginHistoryTable />}
            {activeTab === "devices" && <DeviceRegistry />}
            {activeTab === "order-history" && <OrderHistory />}
            {activeTab === "wallet" && <WalletBalance />}
            {activeTab === "favorites" && <FavoritesList />}

            {![
              "personal-info",
              "change-password",
              "addresses",
              "login-history",
              "devices",
              "order-history",
              "wallet",
              "favorites",
            ].includes(activeTab) && (
              <div className="text-center py-10 text-xs text-muted-foreground/50 font-sans">
                <Settings className="size-6 mx-auto mb-2 text-muted-foreground/30" />
                Section coming soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
