"use client";

import { DataTable, DataTableColumnHeader } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, ShieldBan, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteVendor, Vendor } from "@/store/api/slices/admin-vendor-api";


const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "vendorCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor Code" />,
    cell: ({ row }) => <span className="font-mono text-xs font-semibold">{row.original.vendorCode}</span>,
  },
  {
    accessorKey: "businessName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Business Name" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{row.original.businessName}</span>
        <span className="text-xs text-muted-foreground">{row.original.ownerName}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "APPROVED"
              ? "default"
              : status === "PENDING"
                ? "secondary"
                : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact" />,
    cell: ({ row }) => (
      <div className="flex flex-col text-xs">
        <span>{row.original.phone}</span>
        <span className="text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "_count.branches",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Branches" />,
    cell: ({ row }) => <span>{row.original._count?.branches ?? 0}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined Date" />,
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ShieldCheck className="size-4" />,
  options: [
    { label: "Approved", value: "APPROVED" },
    { label: "Pending", value: "PENDING" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Suspended", value: "SUSPENDED" },
  ],
};

export function VendorsTable({ vendors }: { vendors: Vendor[] }) {
  const router = useRouter();
  const { mutateAsync: deleteVendor } = useDeleteVendor();

  const rowActions: RowAction<Vendor>[] = [
    {
      label: "View Details / Request",
      icon: <Eye className="size-4" />,
      onClick: (vendor) => {
        if (vendor.status === "PENDING") {
          router.push(`/dashboard/admin/vendors/requests/${vendor.vendorCode}`);
        } else {
          router.push(`/dashboard/admin/vendors/${vendor.vendorCode}`);
        }
      },
    },
    {
      label: "Delete Vendor",
      icon: <ShieldBan className="size-4" />,
      variant: "destructive",
      onClick: async (vendor) => {
        if (confirm(`Are you sure you want to delete ${vendor.businessName}?`)) {
          await deleteVendor(vendor.vendorCode);
        }
      },
    },
  ];

  return (
    <DataTable
      data={vendors}
      columns={columns}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}