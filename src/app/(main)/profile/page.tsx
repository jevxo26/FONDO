"use client";

import { useState } from "react";
import { OrderHistory, WalletBalance } from "@/components/profile/activity-finance";
import { AddressManager, DeviceRegistry, LoginHistoryTable } from "@/components/profile/adress-manager";
import { ChangePasswordForm, PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import FavoritesList from "@/components/profile/favorites-list";

export default function CustomerProfileWorkspace() {
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <section className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="lg:col-span-9 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          {activeTab === "personal-info" && <PersonalInfoForm />}
          {activeTab === "change-password" && <ChangePasswordForm />}
          {activeTab === "addresses" && <AddressManager />}
          {activeTab === "login-history" && <LoginHistoryTable />}
          {activeTab === "devices" && <DeviceRegistry />}
          {activeTab === "order-history" && <OrderHistory />}
          {activeTab === "wallet" && <WalletBalance />}
          {activeTab === "favorites" && <FavoritesList />}

          {!["personal-info", "change-password", "addresses", "login-history", "devices", "order-history", "wallet", "favorites"].includes(activeTab) && (
            <div className="text-center py-10 text-xs text-muted-foreground/50 font-sans">
              Section coming soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
