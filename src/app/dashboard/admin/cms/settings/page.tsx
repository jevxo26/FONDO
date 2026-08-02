// /dashboard/admin/cms/settings/page.tsx
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";

// Mock system settings
const initialSettings = [
  { key: "site_name", value: "FONDO" },
  { key: "site_description", value: "Food Delivery Platform" },
  { key: "contact_email", value: "support@fondo.com" },
  { key: "contact_phone", value: "+8801234567890" },
];

// Mock feature flags
const initialFeatureFlags = [
  { key: "blog_enabled", label: "Blog", enabled: true },
  { key: "subscription_enabled", label: "Subscription", enabled: false },
  { key: "coupon_enabled", label: "Coupon", enabled: true },
  { key: "referral_enabled", label: "Referral", enabled: false },
  { key: "maintenance_mode", label: "Maintenance Mode", enabled: false },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [featureFlags, setFeatureFlags] = useState(initialFeatureFlags);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleSettingChange = (index: number, value: string) => {
    const updated = [...settings];
    updated[index].value = value;
    setSettings(updated);
  };

  const handleAddSetting = () => {
    if (newKey && newValue) {
      setSettings([...settings, { key: newKey, value: newValue }]);
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemoveSetting = (index: number) => {
    setSettings(settings.filter((_, i) => i !== index));
  };

  const handleToggleFlag = (index: number) => {
    const updated = [...featureFlags];
    updated[index].enabled = !updated[index].enabled;
    setFeatureFlags(updated);
  };

  const handleSave = () => {
    console.log("Saving settings:", { settings, featureFlags });
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-8">
      <PageHeader title="CMS Settings" description="Manage system settings and feature flags." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold">System Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.map((setting, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">{setting.key}</Label>
                  <Input
                    value={setting.value}
                    onChange={(e) => handleSettingChange(index, e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSetting(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-4 border-t">
              <div className="flex-1">
                <Input
                  placeholder="Key"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleAddSetting}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold">Feature Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {featureFlags.map((flag, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium text-sm">{flag.label}</p>
                  <p className="text-xs text-muted-foreground">{flag.key}</p>
                </div>
                <Switch checked={flag.enabled} onCheckedChange={() => handleToggleFlag(index)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
