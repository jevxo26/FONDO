// src/components/dashboard/vendor/staff/staff-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorStaff } from "@/types/vendor";
import { getStaffStatusBadge } from "@/data/vendor-staff";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const staffColumns: ColumnDef<VendorStaff>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="h-4 w-4 rounded border-border accent-primary"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-border accent-primary"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff" />
    ),
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-full border border-border/50">
            <AvatarImage src={staff.avatar} alt={staff.fullName} />
            <AvatarFallback className="bg-primary/10 text-xs font-medium">
              {staff.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{staff.fullName}</p>
            <p className="text-xs text-muted-foreground">{staff.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{staff.designation}</span>
          <div className="flex flex-wrap gap-1">
            {staff.roles.slice(0, 2).map((role, index) => (
              <Badge key={index} variant="outline" className="text-[10px] uppercase tracking-wider">
                {role}
              </Badge>
            ))}
            {staff.roles.length > 2 && (
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                +{staff.roles.length - 2}
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("branch")}</span>
    ),
  },
  {
    accessorKey: "shift",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shift" />
    ),
    cell: ({ row }) => {
      const shift = row.getValue("shift") as string;
      const shiftColors = {
        Morning: "bg-blue-500/10 text-blue-500",
        Evening: "bg-orange-500/10 text-orange-500",
        Night: "bg-purple-500/10 text-purple-500",
      };
      return (
        <Badge variant="outline" className={cn("ring-1", shiftColors[shift as keyof typeof shiftColors] || "bg-muted")}>
          {shift}
        </Badge>
      );
    },
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    cell: ({ row }) => {
      const salary = row.getValue("salary") as number;
      return (
        <span className="font-fraunces font-semibold text-sm">
          ৳{salary.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "joiningDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("joiningDate") as string;
      return <span className="text-sm">{new Date(date).toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as VendorStaff["status"];
      const badge = getStaffStatusBadge(status);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
];