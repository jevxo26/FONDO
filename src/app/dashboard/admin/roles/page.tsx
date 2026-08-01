"use client";

import { useMemo, useState } from "react";
import { ShieldCheck, ShieldPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Button } from "@/components/ui/button";
import { RolesTable } from "@/components/dashboard/admin/roles/roles-table";
import { CreateRoleDialog } from "@/components/dashboard/admin/roles/create-role-dialog";
import { useListPermissionsQuery, useListRolesQuery } from "@/store/api/slices/rbac-api";
import { useHasPermission } from "@/hooks/use-permission";

export default function RolesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { data: roles, isLoading } = useListRolesQuery();
  const { data: permissions } = useListPermissionsQuery();
  const canCreate = useHasPermission("roles:create");

  const permissionCount = useMemo(
    () => Object.values(permissions ?? {}).reduce((acc, p) => acc + p.length, 0),
    [permissions],
  );

  const allRoles = useMemo(() => roles ?? [], [roles]);
  const defaultRoles = allRoles.filter((r) => r.isDefault).length;
  const totalAssignments = allRoles.reduce((acc, r) => acc + (r._count?.userRoles ?? 0), 0);

  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        description="Manage platform roles and their access permissions."
        icon={ShieldCheck}
        actions={
          canCreate && (
            <Button className="rounded-full" onClick={() => setCreateOpen(true)}>
              <ShieldPlus className="size-[18px]" /> Create Role
            </Button>
          )
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Roles" value={allRoles.length} icon={ShieldCheck} accent="bottom" />
        <StatCard label="Permissions" value={permissionCount} icon={ShieldPlus} accent="bottom" />
        <StatCard label="Default Roles" value={defaultRoles} icon={Users} accent="bottom" />
        <StatCard label="Assignments" value={totalAssignments} icon={Users} accent="bottom" />
      </div>
      <div className="mt-8">
        <RolesTable roles={allRoles} isLoading={isLoading} />
      </div>
      <CreateRoleDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
