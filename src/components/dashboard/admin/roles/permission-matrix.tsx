"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import type { PermissionsByModule, RbacRole } from "@/types/rbac";
import { useAssignPermissions } from "@/store/api/slices/rbac-api";

function titleCase(module: string) {
  return module.charAt(0).toUpperCase() + module.slice(1);
}

export function PermissionMatrix({
  role,
  permissions,
  isLoading,
}: {
  role: RbacRole;
  permissions: PermissionsByModule | undefined;
  isLoading: boolean;
}) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(role.rolePermissions.map((rp) => rp.permission.slug)),
  );
  const { mutate, isPending } = useAssignPermissions();
  const readOnly = role.isDefault;

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const toggleModule = (module: string, slugs: string[]) => {
    const allChecked = slugs.every((s) => selected.has(s));
    setSelected((prev) => {
      const next = new Set(prev);
      for (const s of slugs) {
        if (allChecked) next.delete(s);
        else next.add(s);
      }
      return next;
    });
  };

  const handleSave = () => {
    mutate(
      { id: role.id, permissionSlugs: [...selected] },
      {
        onSuccess: () => toast.success("Permissions updated"),
        onError: (err) => toast.error(err instanceof Error ? err.message : "Update failed"),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {selected.size} of{" "}
          {Object.values(permissions ?? {}).reduce((acc, p) => acc + p.length, 0)} permissions
          granted
        </p>
        <Button onClick={handleSave} disabled={isPending || readOnly}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Permissions
        </Button>
      </div>

      {!permissions || Object.keys(permissions).length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No permissions defined.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(permissions).map(([module, perms]) => {
            const slugs = perms.map((p) => p.slug);
            const allChecked = slugs.every((s) => selected.has(s));
            return (
              <div
                key={module}
                className="rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-primary/25"
              >
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Checkbox
                    checked={allChecked}
                    disabled={readOnly}
                    onCheckedChange={() => toggleModule(module, slugs)}
                  />
                  <p className="text-sm font-bold text-foreground">{titleCase(module)}</p>
                  <span className="ml-auto text-[11px] text-muted-foreground">
                    {slugs.filter((s) => selected.has(s)).length}/{slugs.length}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {perms.map((p) => (
                    <label
                      key={p.id}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-0.5 transition-colors hover:bg-muted"
                    >
                      <Checkbox
                        checked={selected.has(p.slug)}
                        disabled={readOnly}
                        onCheckedChange={() => toggle(p.slug)}
                      />
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-foreground">{p.name}</p>
                        <p className="truncate font-mono text-[11px] text-muted-foreground">
                          {p.slug}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {readOnly && (
        <p className="text-xs text-muted-foreground">
          Default role permissions are system-managed and cannot be changed.
        </p>
      )}
    </div>
  );
}
