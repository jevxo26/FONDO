"use client";

import { useEffect, useRef, useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Settings2, Filter } from "lucide-react";
import type { FacetedFilter } from "./types";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      table.setGlobalFilter(search || undefined);
    }, 300);
    return () => clearTimeout(timeoutRef.current);
  }, [search, table]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search across all columns..."
          className="w-full rounded-full bg-secondary pl-10 md:w-72"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {filters?.map((filter) => {
          const column = table.getColumn(filter.columnId);
          const currentValue = column?.getFilterValue() as
            | string
            | undefined;

          return (
            <Popover key={filter.columnId}>
              <PopoverTrigger
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
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

        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Settings2 className="size-4" />
            View
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table.getAllLeafColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {humanize(column.id)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
