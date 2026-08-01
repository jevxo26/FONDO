"use client";

import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, type RowAction } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Eye, ShieldCheck, Trash2 } from "lucide-react";
import type { RbacRole } from "@/types/rbac";
import { useDeleteRole } from "@/store/api/slices/rbac-api";
import { useHasPermission } from "@/hooks/use-permission";

const permissionCount = (role: RbacRole) => role.rolePermissions.length;

const columns: ColumnDef<RbacRole>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
          <ShieldCheck className="size-4 text-primary" />
        </div>
        <div>
          <p className="font-bold text-foreground">{row.original.name}</p>
          {row.original.description && (
            <p className="max-w-[340px] truncate text-[13px] text-muted-foreground">
              {row.original.description}
            </p>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono text-[11px] tracking-wide">
        {row.original.slug}
      </Badge>
    ),
  },
  {
    accessorKey: "_count.userRoles",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Users" />,
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">{row.original._count?.userRoles ?? 0}</span>
    ),
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Permissions" />,
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">{permissionCount(row.original)}</span>
    ),
  },
  {
    accessorKey: "isDefault",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Default" />,
    cell: ({ row }) =>
      row.original.isDefault ? (
        <Badge variant="secondary">Default</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
          row.original.status === "active"
            ? "bg-success/10 text-success"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
];

export function RolesTable({ roles, isLoading }: { roles: RbacRole[]; isLoading: boolean }) {
  const router = useRouter();
  const { mutate: deleteRole, isPending } = useDeleteRole();
  const canDelete = useHasPermission("roles:delete");

  const rowActions: RowAction<RbacRole>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (row) => router.push(`/dashboard/admin/roles/${row.id}`),
    },
    ...(canDelete
      ? [
          {
            label: "Delete",
            icon: <Trash2 className="size-4" />,
            variant: "destructive" as const,
            onClick: (row: RbacRole) => {
              if (row.isDefault) {
                toast.error("Default roles cannot be deleted");
                return;
              }
              if (window.confirm(`Delete role "${row.name}"?`)) {
                deleteRole(row.id, {
                  onSuccess: () => toast.success("Role deleted"),
                  onError: (err) =>
                    toast.error(err instanceof Error ? err.message : "Delete failed"),
                });
              }
            },
          },
        ]
      : []),
  ];

  return (
    <DataTable
      columns={columns}
      data={roles}
      isLoading={isLoading || isPending}
      onRowClick={(row) => router.push(`/dashboard/admin/roles/${row.id}`)}
      rowActions={rowActions}
      emptyMessage="No roles found."
    />
  );
}
