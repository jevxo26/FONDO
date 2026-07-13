"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { statuses } from "./vendor-approval-data";

interface VendorApprovalFiltersProps {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  uniqueTypes: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string | null) => void;
  onTypeChange: (value: string | null) => void;
  onClear: () => void;
}

export function VendorApprovalFilters({
  searchTerm,
  statusFilter,
  typeFilter,
  uniqueTypes,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClear,
}: VendorApprovalFiltersProps) {
  const hasFilters = searchTerm || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {statuses.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {uniqueTypes.map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasFilters && (
        <Button variant="ghost" onClick={onClear} className="gap-2">
          <X className="h-4 w-4" /> Clear Filters
        </Button>
      )}
    </div>
  );
}
