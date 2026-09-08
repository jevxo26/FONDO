// /dashboard/admin/cms/blogs/blog-columns.tsx
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { type ColumnDef } from "@tanstack/react-table";
import { type Blog } from "@/data/mock-blogs";
import { mockBlogCategories } from "@/data/mock-blog-categories";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { format } from "date-fns";

export const blogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div className="flex items-center gap-3">
          {blog.thumbnail && (
            <Image src={blog.thumbnail} alt={blog.title} width={64} height={48} className="h-12 w-16 rounded object-cover" />
          )}
          <div>
            <p className="font-medium line-clamp-1">{blog.title}</p>
            <p className="text-sm text-muted-foreground">By {blog.author}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "categoryId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const categoryId = row.getValue("categoryId") as string;
      const category = mockBlogCategories.find((c) => c.id === categoryId);
      return <span className="text-sm">{category?.name || "—"}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge variant={status === "PUBLISHED" ? "default" : "secondary"}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return <span className="text-sm">{format(new Date(date), "MMM dd, yyyy")}</span>;
    },
  },
];
