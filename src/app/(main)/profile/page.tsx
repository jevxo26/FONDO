'use client'
import { OrderHistory, WalletBalance } from "@/components/profile/activity-finance";
import { AddressManager, DeviceRegistry, LoginHistoryTable } from "@/components/profile/adress-manager";
import { ChangePasswordForm, PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { useState } from "react";

export default function CustomerProfileWorkspace() {
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <section className="py-12 bg-[#FAF5EB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control Sidebar */}
        <div className="lg:col-span-3">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Right Feature Panel View */}
        <div className="lg:col-span-9 bg-white border border-[#16100C]/10 rounded-2xl p-6 md:p-8 shadow-sm">
          {activeTab === "personal-info" && <PersonalInfoForm />}
          {activeTab === "change-password" && <ChangePasswordForm />}
          {activeTab === "addresses" && <AddressManager />}
          {activeTab === "login-history" && <LoginHistoryTable />}
          {activeTab === "devices" && <DeviceRegistry />}
          {activeTab === "order-history" && <OrderHistory />}
          {activeTab === "wallet" && <WalletBalance/>}
          
          {/* Default fallback indicator if section under development */}
          {!["personal-info", "change-password", "addresses", "login-history", "devices", "order-history", "wallet"].includes(activeTab) && (
            <div className="text-center py-10 text-xs text-[#16100C]/40 font-sans">
              Section Matrix Loaded Successfully.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}