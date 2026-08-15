"use client";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useListPermissionModulesQuery,
  useToggleUserModule,
} from "@/store/api/slices/rbac-api";
import type { User } from "@/types/auth";

export function UserPermissionsDialog({
  user,
  open,
  onOpenChange,
}: {
  user: User;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { data: modules, isLoading } = useListPermissionModulesQuery(user.id, { skip: !open });
  const { mutate, isPending } = useToggleUserModule();

  const handleToggle = (module: string, enabled: boolean) => {
    mutate(
      { userId: user.id, module, enabled },
      {
        onSuccess: () => toast.success(`${module} ${enabled ? "granted" : "revoked"}`),
        onError: (error: unknown) => {
          const message =
            error && typeof error === "object" && "message" in error
              ? String((error as { message: unknown }).message)
              : "Update failed";
          toast.error(message);
        },
      },
    );
  };

  const toggleable = modules?.filter((m) => m.toggleable) ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Module Permissions</DialogTitle>
          <DialogDescription>
            Grant or revoke modules for {user.firstName} {user.lastName}. Effective after their next
            login. Toggling off removes the module even if the role grants it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
          ) : toggleable.length === 0 ? (
            <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
              No toggleable modules for this role.
            </p>
          ) : (
            toggleable.map((m) => {
              const base = m.base;
              const granted = m.granted;
              const effective = granted ?? base;
              return (
                <div
                  key={m.module}
                  className="flex items-center justify-between rounded-xl border border-border p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{m.label}</span>
                    {base && (
                      <Badge variant="outline" className="text-[10px]">
                        role
                      </Badge>
                    )}
                  </div>
                  <Switch
                    checked={effective}
                    disabled={isPending}
                    onCheckedChange={(checked) => handleToggle(m.module, checked)}
                  />
                </div>
              );
            })
          )}
        </div>
        <DialogFooter>
          <span className="text-xs text-muted-foreground">
            Changes apply after the user logs in again.
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
