// /dashboard/admin/cms/banners/banner-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type Banner } from "@/data/mock-banners";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { format } from "date-fns";

export const bannerColumns: ColumnDef<Banner>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const banner = row.original;
      return (
        <div className="flex items-center gap-3">
          {banner.imageUrl && (
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="h-12 w-20 rounded object-cover"
            />
          )}
          <div>
            <p className="font-medium">{banner.title}</p>
            {banner.subtitle && <p className="text-sm text-muted-foreground">{banner.subtitle}</p>}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "redirectType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Redirect" />,
    cell: ({ row }) => {
      const type = row.getValue("redirectType") as string;
      return <span className="text-sm capitalize">{type.replace("_", " ")}</span>;
    },
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
    cell: ({ row }) => <span className="text-sm">{row.getValue("displayOrder")}</span>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => {
      const date = row.getValue("startDate") as string;
      return date ? (
        <span className="text-sm">{format(new Date(date), "MMM dd, yyyy")}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    cell: ({ row }) => {
      const date = row.getValue("endDate") as string;
      return date ? (
        <span className="text-sm">{format(new Date(date), "MMM dd, yyyy")}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];
