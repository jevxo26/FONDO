"use client";

import {
  useDevices,
  useUnregisterDevice,
} from "@/store/api/slices/security-api";
import { handleApiError } from "@/lib/api-error";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Laptop, Smartphone, Tablet, Monitor, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { UserDevice } from "@/types/security";

function DeviceIcon({ device }: { device: UserDevice }) {
  const Icon =
    device.deviceType === "mobile" ? Smartphone : device.deviceType === "tablet" ? Tablet : device.browser === "Chrome" ? Monitor : Laptop;
  return <Icon className="size-4" />;
}

export function DeviceRegistry() {
  const { data: devices, isLoading } = useDevices();
  const unregister = useUnregisterDevice();

  const handleRevoke = async (id: string) => {
    try {
      await unregister.mutateAsync(id);
      toast.success("Device removed");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1].map((i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <Empty className="rounded-3xl border-dashed py-12">
        <EmptyMedia variant="icon">
          <Laptop className="size-4" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No active devices</EmptyTitle>
          <EmptyDescription>
            Devices you sign in with will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-3">
      {devices.map((device) => (
        <div
          key={device.id}
          className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-card p-4 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-foreground">
              <DeviceIcon device={device} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {device.deviceName || device.browser || device.deviceType}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {[device.operatingSystem, device.osVersion].filter(Boolean).join(" ")}
                {device.ipAddress ? ` · ${device.ipAddress}` : ""}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 rounded-lg text-destructive hover:bg-destructive/10"
            onClick={() => handleRevoke(device.id)}
            disabled={unregister.isPending}
          >
            {unregister.isPending ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
            Revoke
          </Button>
        </div>
      ))}
    </div>
  );
}
