// /dashboard/admin/cms/blog-categories/blog-category-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type BlogCategory } from "@/data/mock-blog-categories";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";

export const blogCategoryColumns: ColumnDef<BlogCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("slug")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => (
      <span className="text-sm line-clamp-1">{row.getValue("description") || "—"}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>{status}</Badge>;
    },
  },
];
