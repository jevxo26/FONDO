"use client";

import type { Table } from "@tanstack/react-table";
import type { FacetedFilter } from "./types";
import { DataTableSearch } from "./data-table-search";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableColumnToggle } from "./data-table-column-toggle";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarActions?: React.ReactNode;
  filters?: FacetedFilter[];
  enableSearch?: boolean;
  enableColumnToggle?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  toolbarActions,
  filters,
  enableSearch = true,
  enableColumnToggle = true,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 bg-card px-4 py-4">
      {enableSearch && <DataTableSearch table={table} />}

      <div className="flex flex-wrap items-center gap-3">
        {filters?.map((filter) => (
          <DataTableFacetedFilter
            key={filter.columnId}
            column={table.getColumn(filter.columnId)!}
            title={filter.title}
            options={filter.options}
            icon={filter.icon}
          />
        ))}

        {toolbarActions}

        {enableColumnToggle && <DataTableColumnToggle table={table} />}
      </div>
    </div>
  );
}
