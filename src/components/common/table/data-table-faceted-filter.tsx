"use client";

import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Column } from "@tanstack/react-table";
import { Filter } from "lucide-react";

interface DataTableFacetedFilterProps<TData> {
  column: Column<TData>;
  title: string;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
}

export function DataTableFacetedFilter<TData>({
  column,
  title,
  options,
  icon,
}: DataTableFacetedFilterProps<TData>) {
  const currentValue = column?.getFilterValue() as string | undefined;

  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        {icon ?? <Filter className="size-4" />}
        {title}
        {currentValue && (
          <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-foreground">
            {options.find((o) => o.value === currentValue)?.label ?? currentValue}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <p className="mb-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
          <Checkbox
            checked={!currentValue}
            onCheckedChange={() => column?.setFilterValue(undefined)}
          />
          All
        </label>
        {options.map((option) => (
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
}
