"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal, SearchX } from "lucide-react";
import { useMemo } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import type { FacetedFilter, RowAction } from "./types";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  pageSize?: number;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  toolbarActions?: React.ReactNode;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  rowActions?: RowAction<TData>[];
  filters?: FacetedFilter[];
}

export function DataTable<TData>({
  columns,
  data,
  pageSize = 10,
  enableSorting = true,
  enableRowSelection = false,
  toolbarActions,
  onRowClick,
  isLoading = false,
  emptyMessage = "No results found.",
  rowActions,
  filters,
}: DataTableProps<TData>) {
  const allColumns = useMemo(() => {
    if (!rowActions) return columns;
    return [
      ...columns,
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }: { row: { original: TData } }) => (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "size-8",
              })}
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              {rowActions.map((action) => (
                <DropdownMenuItem
                  key={action.label}
                  variant={action.variant}
                  onClick={() => action.onClick(row.original)}
                >
                  {action.icon}
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      } as ColumnDef<TData>,
    ];
  }, [columns, rowActions]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting,
    enableRowSelection,
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
      <div className="relative z-10">
        <DataTableToolbar table={table} toolbarActions={toolbarActions} filters={filters} />
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-amber-50/80 dark:bg-amber-950/30">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground md:px-6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j} className="px-4 py-4 md:px-6 md:py-5">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      "bg-card transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/8",
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-4 md:px-6 md:py-5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-40 text-center">
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia>
                          <SearchX className="size-8 text-muted-foreground" />
                        </EmptyMedia>
                        <EmptyTitle>{emptyMessage}</EmptyTitle>
                      </EmptyHeader>
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination
          currentPage={table.getState().pagination.pageIndex}
          totalPages={table.getPageCount()}
          start={table.getState().pagination.pageIndex * pageSize}
          end={Math.min((table.getState().pagination.pageIndex + 1) * pageSize, data.length)}
          totalItems={data.length}
          onPageChange={(page) => table.setPageIndex(page)}
        />
      </div>
    </div>
  );
}
