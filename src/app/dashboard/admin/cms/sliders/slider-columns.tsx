// /dashboard/admin/cms/sliders/slider-columns.tsx
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { type ColumnDef } from "@tanstack/react-table";
import { type Slider } from "@/data/mock-sliders";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";

const statusColors = {
  ACTIVE: "text-green-600 dark:text-green-400",
  INACTIVE: "text-red-600 dark:text-red-400",
};

export const sliderColumns: ColumnDef<Slider>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const slider = row.original;
      return (
        <div className="flex items-center gap-3">
          {slider.image && (
            <Image src={slider.image} alt={slider.title} width={80} height={48} className="h-12 w-20 rounded object-cover" />
          )}
          <div>
            <p className="font-medium">{slider.title}</p>
            {slider.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">{slider.description}</p>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "buttonText",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Button" />,
    cell: ({ row }) => <span className="text-sm">{row.getValue("buttonText")}</span>,
  },
  {
    accessorKey: "buttonUrl",
    header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground truncate max-w-[150px] block">
        {row.getValue("buttonUrl")}
      </span>
    ),
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
    cell: ({ row }) => <span className="text-sm">{row.getValue("displayOrder")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as Slider["status"];
      const color = statusColors[status] || "";
      return (
        <Badge variant={status === "ACTIVE" ? "default" : "secondary"} className={color}>
          {status}
        </Badge>
      );
    },
  },
];
