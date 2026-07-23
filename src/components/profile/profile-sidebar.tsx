"use client";

import { useAuth } from "@/hooks/use-auth";
import {
  User,
  Lock,
  MapPin,
  Bell,
  ShieldAlert,
  Laptop,
  ShoppingBag,
  CalendarDays,
  Wallet,
  Heart,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ProfileSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { user } = useAuth();
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "??";

  const coreTabs = [
    { id: "personal-info", label: "Personal Info", icon: User },
    { id: "change-password", label: "Change Password", icon: Lock },
    { id: "addresses", label: "My Addresses", icon: MapPin },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "login-history", label: "Login History", icon: ShieldAlert },
    { id: "devices", label: "Active Devices", icon: Laptop },
  ];

  const activityTabs = [
    { id: "order-history", label: "Order History", icon: ShoppingBag },
    { id: "subscriptions", label: "Subscriptions", icon: CalendarDays },
    { id: "wallet", label: "Wallet Balance", icon: Wallet },
    { id: "favorites", label: "Favorites List", icon: Heart },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center font-fraunces text-lg font-bold text-primary">
          {initials}
        </div>
        <div>
          <h4 className="font-fraunces text-sm font-bold text-foreground">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </h4>
          <p className="font-sans text-[10px] text-muted-foreground">{user?.email ?? "—"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 px-3 mb-2 block">
          Core Profile
        </span>
        {coreTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary font-bold"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <tab.icon className="size-3.5" />
            {tab.label}
          </button>
        ))}

        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 px-3 mt-4 mb-2 block">
          Activity & Finances
        </span>
        {activityTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary font-bold"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <tab.icon className="size-3.5" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
