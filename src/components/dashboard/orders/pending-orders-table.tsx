"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"; // সার্চ ইনপুটের জন্য
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: string;
  date: string;
}

export function PendingOrdersTable({ orders }: { orders: Order[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Order>[] = [
    { accessorKey: "id", header: "ORDER ID" },
    { accessorKey: "customer", header: "CUSTOMER" },
    { accessorKey: "items", header: "ITEMS" },
    { accessorKey: "total", header: "TOTAL" },
    { 
      accessorKey: "status", 
      header: "STATUS",
      cell: ({ row }) => (
        <Badge className="rounded-full bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
          {row.getValue("status")}
        </Badge>
      )
    },
    { accessorKey: "date", header: "DATE" },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      {/* Filter search bar */}
      <Input
        placeholder="Search orders..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="overflow-hidden rounded-lg border border-border/40 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="pl-6">
                    <Button variant="ghost" onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-border/40">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}