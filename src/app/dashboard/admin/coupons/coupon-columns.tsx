// /app/dashboard/admin/coupons/coupon-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type Coupon } from "@/data/mock-coupons";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { format } from "date-fns";

const statusColors = {
  ACTIVE: "bg-green-500 hover:bg-green-600",
  INACTIVE: "bg-gray-500 hover:bg-gray-600",
  EXPIRED: "bg-red-500 hover:bg-red-600",
  SCHEDULED: "bg-yellow-500 hover:bg-yellow-600",
  DRAFT: "bg-blue-500 hover:bg-blue-600",
  DISABLED: "bg-gray-400 hover:bg-gray-500",
};

const statusLabels = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  EXPIRED: "Expired",
  SCHEDULED: "Scheduled",
  DRAFT: "Draft",
  DISABLED: "Disabled",
};

export const couponColumns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Coupon" />,
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <div>
          <p className="font-medium">{coupon.title}</p>
          <code className="text-xs font-mono text-muted-foreground">{coupon.code}</code>
        </div>
      );
    },
  },
  {
    accessorKey: "discountType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
    cell: ({ row }) => {
      const coupon = row.original;
      const value =
        coupon.discountType === "PERCENTAGE"
          ? `${coupon.discountValue}%`
          : `$${coupon.discountValue}`;
      return <span className="font-medium">{value}</span>;
    },
  },
  {
    accessorKey: "appliesTo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Applies To" />,
    cell: ({ row }) => {
      const value = row.getValue("appliesTo") as string;
      return <span className="text-sm capitalize">{value.toLowerCase()}</span>;
    },
  },
  {
    accessorKey: "usedCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Usage" />,
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <span className="text-sm">
          {coupon.usedCount}
          {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
        </span>
      );
    },
  },
  {
    accessorKey: "expiry",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expiry" />,
    cell: ({ row }) => {
      const date = row.getValue("expiry") as string;
      return date ? (
        <span className="text-sm">{format(new Date(date), "MMM dd, yyyy")}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusColors;
      const color = statusColors[status] || "bg-gray-500 hover:bg-gray-600";
      const label = statusLabels[status] || status;
      return <Badge className={`${color} text-white`}>{label}</Badge>;
    },
  },
];
