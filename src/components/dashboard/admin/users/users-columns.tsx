"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/auth";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  VENDOR: "Vendor",
  RIDER: "Rider",
  CUSTOMER: "Customer",
};

export function RoleBadge({ role }: { role: string }) {
  const color =
    role === "SUPER_ADMIN"
      ? "bg-destructive/10 text-destructive"
      : role === "ADMIN"
        ? "bg-primary/10 text-primary"
          : role === "VENDOR"
            ? "bg-success/10 text-success"
            : role === "RIDER"
            ? "bg-muted text-foreground"
            : "bg-muted text-muted-foreground";
  return (
    <Badge variant="outline" className={color}>
      {ROLE_LABELS[role] ?? role.replace(/_/g, " ")}
    </Badge>
  );
}

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {`${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
            status === "ACTIVE"
              ? "bg-success/10 text-success"
              : status === "SUSPENDED"
                ? "bg-destructive/10 text-destructive"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.phone || "—"}</span>
    ),
  },
  {
    accessorKey: "lastLoginAt",
    header: "Last Login",
    cell: ({ row }) => {
      const date = row.original.lastLoginAt;
      if (!date) return <span className="text-sm text-muted-foreground">Never</span>;
      return (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </span>
      );
    },
  },
];
