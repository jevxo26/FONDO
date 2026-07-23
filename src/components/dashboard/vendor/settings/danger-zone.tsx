// src/components/dashboard/vendor/settings/danger-zone.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function DangerZone() {
  const handleDeactivate = () => {
    if (confirm("Are you sure you want to deactivate your account? This action can be reversed.")) {
      console.log("Deactivate account");
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      console.log("Delete account");
    }
  };

  return (
    <Card className="border-destructive/20 bg-destructive/5 p-6">
      <div className="flex items-start gap-4">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-destructive">Danger Zone</h4>
            <p className="text-xs text-muted-foreground">
              Permanently deactivate or delete your business account
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={handleDeactivate}>
              Deactivate Account
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}