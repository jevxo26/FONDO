"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RoleDetailForm } from "@/components/dashboard/admin/roles/role-detail-form";
import { PermissionMatrix } from "@/components/dashboard/admin/roles/permission-matrix";
import { AssignRoleDialog } from "@/components/dashboard/admin/roles/assign-role-dialog";
import { useState } from "react";
import { useGetRoleQuery, useListPermissionsQuery } from "@/store/api/slices/rbac-api";
import { useHasPermission } from "@/hooks/use-permission";

export default function RoleDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [assignOpen, setAssignOpen] = useState(false);
  const { data: role, isLoading } = useGetRoleQuery(params.id);
  const { data: permissions, isLoading: permissionsLoading } = useListPermissionsQuery();
  const canAssign = useHasPermission("users:update");

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4 rounded-full text-muted-foreground"
        onClick={() => router.push("/dashboard/admin/roles")}
      >
        <ArrowLeft className="size-4" /> Back to Roles
      </Button>

      {isLoading || !role ? (
        <Skeleton className="h-24 w-full rounded-3xl" />
      ) : (
        <PageHeader
          title={role.name}
          description={role.description ?? "No description."}
          icon={ShieldCheck}
          actions={
            <>
              <Badge variant="outline" className="font-mono">
                {role.slug}
              </Badge>
              {role.isDefault && <Badge variant="secondary">Default</Badge>}
              <Badge
                variant={role.status === "active" ? "default" : "destructive"}
                className="uppercase"
              >
                {role.status}
              </Badge>
              {canAssign && (
                <Button className="rounded-full" onClick={() => setAssignOpen(true)}>
                  <UserPlus className="size-[18px]" /> Assign Role
                </Button>
              )}
            </>
          }
        />
      )}

      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 font-fraunces text-lg font-semibold text-foreground">
              Role Details
            </h3>
            {role && <RoleDetailForm key={role.id} role={role} />}
          </div>
        </div>
        <div className="col-span-12 space-y-5 lg:col-span-4">
          <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-[var(--shadow-card)]">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Summary
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-muted/60 p-3">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" /> Assigned Users
                </span>
                <span className="font-bold text-foreground">{role?._count?.userRoles ?? 0}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted/60 p-3">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4" /> Permissions
                </span>
                <span className="font-bold text-foreground">
                  {role?.rolePermissions.length ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 font-fraunces text-lg font-semibold text-foreground">
            Permission Matrix
          </h3>
          {role && (
            <PermissionMatrix
              key={role.id}
              role={role}
              permissions={permissions}
              isLoading={permissionsLoading}
            />
          )}
        </div>
      </div>

      <AssignRoleDialog open={assignOpen} onOpenChange={setAssignOpen} />
    </div>
  );
}
