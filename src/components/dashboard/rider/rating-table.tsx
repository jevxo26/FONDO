"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/data-table";
import type { DeliveryRating } from "@/data/riders";
import { Star } from "lucide-react";

const columns: ColumnDef<DeliveryRating>[] = [
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.customerName}</span>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-amber-500">
        {row.original.rating} <Star className="size-3.5 fill-current" />
      </span>
    ),
  },
  {
    accessorKey: "review",
    header: "Review",
    cell: ({ row }) => <span className="text-muted-foreground italic">"{row.original.review}"</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.date}</span>,
  },
];

interface RatingTableProps {
  data: DeliveryRating[];
  isLoading?: boolean;
}

export function RatingTable({ data, isLoading }: RatingTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      pageSize={5}
      enableSearch={false}
      enableColumnToggle={false}
      emptyMessage="No ratings yet."
    />
  );
}
