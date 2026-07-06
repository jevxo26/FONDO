"use client";

import { useEffect, useRef, useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Settings2, Filter } from "lucide-react";
import type { FacetedFilter } from "./data-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarActions?: React.ReactNode;
  filters?: FacetedFilter[];
}

function humanize(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function DataTableToolbar<TData>({
  table,
  toolbarActions,
  filters,
}: DataTableToolbarProps<TData>) {
  const [search, setSearch] = useState("");
  const [showColumns, setShowColumns] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      table.setGlobalFilter(search || undefined);
    }, 300);
    return () => clearTimeout(timeoutRef.current);
  }, [search, table]);

  useEffect(() => {
    if (!showColumns) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowColumns(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showColumns]);

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search across all columns..."
          className="w-72 rounded-full bg-secondary py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3" ref={panelRef}>
        {filters?.map((filter) => {
          const column = table.getColumn(filter.columnId);
          const currentValue = column?.getFilterValue() as
            | string
            | undefined;

          return (
            <Popover key={filter.columnId}>
              <PopoverTrigger className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-bold transition-colors hover:bg-muted data-[state=open]:text-primary">
                <Filter className="size-4" />
                {filter.title}
                {currentValue && (
                  <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                    {filter.options.find((o) => o.value === currentValue)
                      ?.label ?? currentValue}
                  </span>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <p className="mb-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {filter.title}
                </p>
                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
                  <Checkbox
                    checked={!currentValue}
                    onCheckedChange={() =>
                      column?.setFilterValue(undefined)
                    }
                  />
                  All
                </label>
                {filter.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                  >
                    <Checkbox
                      checked={currentValue === option.value}
                      onCheckedChange={() => {
                        if (currentValue === option.value) {
                          column?.setFilterValue(undefined);
                        } else {
                          column?.setFilterValue(option.value);
                        }
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </PopoverContent>
            </Popover>
          );
        })}

        {toolbarActions}

        <div className="relative">
          <button
            onClick={() => setShowColumns(!showColumns)}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted"
          >
            <Settings2 className="size-4" />
            View
          </button>
          {showColumns && (
            <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-border bg-card p-2 shadow-lg">
              <p className="mb-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Toggle Columns
              </p>
              {table.getAllLeafColumns().map((column) => (
                <label
                  key={column.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                >
                  <Checkbox
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  />
                  {humanize(column.id)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
