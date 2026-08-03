"use client";

import { ShieldCheck, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/common/table/data-table";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { CreateUserDialog } from "@/components/dashboard/admin/users/create-user-dialog";
import { UserPermissionsDialog } from "@/components/dashboard/admin/users/user-permissions-dialog";
import { userColumns } from "@/components/dashboard/admin/users/users-columns";
import { useDeleteUser, useListUsersQuery, useUpdateUser } from "@/store/api/slices/users-api";
import { useAppSelector } from "@/store/store";
import type { User } from "@/types/auth";

function errorMessage(error: unknown, fallback: string): string {
  return error && typeof error === "object" && "message" in error
    ? String((error as { message: unknown }).message)
    : fallback;
}

function RoleDropdown({ user }: { user: User }) {
  const [role, setRole] = useState(user.role);
  const { mutate, isPending } = useUpdateUser();

  const handleChange = (next: string) => {
    setRole(next);
    if (next === user.role) return;
    mutate(
      { id: user.id, role: next },
      {
        onSuccess: () => toast.success("Role updated"),
        onError: (error: unknown) => toast.error(errorMessage(error, "Update failed")),
      },
    );
  };

  return (
    <select
      value={role}
      disabled={isPending}
      onChange={(e) => handleChange(e.target.value)}
      className="h-8 rounded-lg border border-border bg-card px-2 text-xs font-semibold disabled:opacity-50"
    >
      {["SUPER_ADMIN", "ADMIN", "VENDOR", "RIDER", "CUSTOMER"].map((r) => (
        <option key={r} value={r}>
          {r.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}

export default function UsersPage() {
  const { data, isLoading } = useListUsersQuery();
  const { mutate: deleteUser } = useDeleteUser();
  const currentUserId = useAppSelector((s) => s.auth.user?.id);
  const [permissionUser, setPermissionUser] = useState<User | null>(null);

  const users = data ?? [];

  const handleDelete = (user: User) => {
    if (user.id === currentUserId) {
      toast.error("You cannot delete your own account");
      return;
    }
    deleteUser(user.id, {
      onSuccess: () => toast.success("User deleted"),
      onError: (error: unknown) => toast.error(errorMessage(error, "Delete failed")),
    });
  };

  const activeCount = users.filter((u) => u.status === "ACTIVE").length;
  const adminCount = users.filter((u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN").length;
  const vendorCount = users.filter((u) => u.role === "VENDOR").length;
  const riderCount = users.filter((u) => u.role === "RIDER").length;

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Manage accounts, roles, and per-user module permissions."
        icon={Users}
        actions={<CreateUserDialog />}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={users.length} icon={Users} accent="bottom" />
        <StatCard label="Active" value={activeCount} variant="success" icon={Users} accent="bottom" />
        <StatCard label="Admins" value={adminCount} variant="default" icon={Users} accent="bottom" />
        <StatCard label="Vendors / Riders" value={`${vendorCount} / ${riderCount}`} icon={Users} accent="bottom" />
      </div>
      <div className="mt-8">
        <DataTable<User>
          columns={[
            ...userColumns,
            {
              id: "roleEdit",
              header: "Change Role",
              cell: ({ row }) => <RoleDropdown user={row.original} />,
            },
          ]}
          data={users}
          isLoading={isLoading}
          emptyMessage="No users found."
          rowActions={[
            {
              label: "Permissions",
              icon: <ShieldCheck className="size-4" />,
              onClick: (user) => setPermissionUser(user),
            },
            {
              label: "Delete",
              icon: <Trash2 className="size-4" />,
              variant: "destructive",
              onClick: (user) => handleDelete(user),
            },
          ]}
        />
      </div>
      {permissionUser && (
        <UserPermissionsDialog
          key={permissionUser.id}
          user={permissionUser}
          open
          onOpenChange={(open) => !open && setPermissionUser(null)}
        />
      )}
    </div>
  );
}
