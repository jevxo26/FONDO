// src/components/dashboard/vendor/settings/settings-cards.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { vendorSettings } from "@/data/vendor-settings";

export function SettingsCards() {
  const [settings, setSettings] = useState(vendorSettings);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsConfig = [
    {
      key: "autoAcceptOrder",
      title: "Auto-accept Order",
      description: "Automatically accept incoming orders",
    },
    {
      key: "autoAssignRider",
      title: "Auto-assign Rider",
      description: "Automatically assign riders to deliveries",
    },
    {
      key: "allowCustomMeal",
      title: "Allow Custom Meal",
      description: "Allow customers to customize meals",
    },
    {
      key: "allowPackage",
      title: "Allow Package",
      description: "Enable meal package subscriptions",
    },
    {
      key: "notificationEnabled",
      title: "Push Notifications",
      description: "Send push notifications to staff",
    },
    {
      key: "smsEnabled",
      title: "SMS Notifications",
      description: "Send SMS notifications to staff",
    },
    {
      key: "emailEnabled",
      title: "Email Notifications",
      description: "Send email notifications to staff",
    },
    {
      key: "marketingEnabled",
      title: "Marketing & Promotions",
      description: "Receive marketing and promotional updates",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="font-semibold text-sm">Preferences</h4>
        <p className="text-xs text-muted-foreground">Configure your business preferences and notifications</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {settingsConfig.map((setting) => (
          <Card key={setting.key} className="p-4 transition-all hover:shadow-[var(--shadow-elevated)]">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">{setting.title}</Label>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
              <Switch
                checked={settings[setting.key as keyof typeof settings] as boolean}
                onCheckedChange={() => toggleSetting(setting.key as keyof typeof settings)}
                className="ml-4"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}