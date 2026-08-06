"use client";

import {
  useNotificationSettings,
  useUpdateNotificationSettings,
} from "@/store/api/slices/notifications-api";
import { handleApiError } from "@/lib/api-error";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { BellRing, Mail, MessageSquare, Megaphone } from "lucide-react";
import { toast } from "sonner";

interface Pref {
  key:
    | "pushNotification"
    | "emailNotification"
    | "smsNotification"
    | "orderNotification"
    | "paymentNotification"
    | "promotionNotification"
    | "chatNotification"
    | "marketingNotification"
    | "systemNotification";
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PREFS: Pref[] = [
  {
    key: "pushNotification",
    label: "Push Notifications",
    description: "Real-time alerts on your device",
    icon: BellRing,
  },
  {
    key: "emailNotification",
    label: "Email Notifications",
    description: "Updates delivered to your inbox",
    icon: Mail,
  },
  {
    key: "smsNotification",
    label: "SMS Notifications",
    description: "Text alerts for critical updates",
    icon: MessageSquare,
  },
  {
    key: "orderNotification",
    label: "Order Updates",
    description: "Status changes for your orders",
    icon: BellRing,
  },
  {
    key: "paymentNotification",
    label: "Payment Updates",
    description: "Payments, refunds and wallet activity",
    icon: BellRing,
  },
  {
    key: "promotionNotification",
    label: "Promotions",
    description: "Offers, discounts and special deals",
    icon: Megaphone,
  },
  {
    key: "chatNotification",
    label: "Chat Messages",
    description: "Messages from support and the team",
    icon: MessageSquare,
  },
  {
    key: "marketingNotification",
    label: "Marketing Updates",
    description: "News about products and launches",
    icon: Megaphone,
  },
  {
    key: "systemNotification",
    label: "System Alerts",
    description: "Important account & service notices",
    icon: BellRing,
  },
];

export function NotificationPrefsForm() {
  const { data: settings, isLoading } = useNotificationSettings();
  const update = useUpdateNotificationSettings();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
        ))}
      </div>
    );
  }

  const handleToggle = (key: Pref["key"], checked: boolean) => {
    update.mutate(
      { [key]: checked },
      {
        onSuccess: () => toast.success("Notification preference updated"),
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  return (
    <div className="divide-y divide-border/40 rounded-3xl border border-border/40 bg-card shadow-[var(--shadow-card)]">
      {PREFS.map(({ key, label, description, icon: Icon }) => (
        <div key={key} className="flex items-center justify-between gap-4 p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          <Switch
            checked={settings?.[key] ?? false}
            onCheckedChange={(checked) => handleToggle(key, checked)}
            disabled={update.isPending}
          />
        </div>
      ))}
    </div>
  );
}
