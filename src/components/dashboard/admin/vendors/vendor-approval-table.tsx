"use client";

import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "./vendor-approval-data";
import type { Vendor } from "./vendor-approval-data";

interface VendorApprovalTableProps {
  vendors: Vendor[];
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  onViewDetails: (vendor: Vendor) => void;
}

function SortHeader({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
}: {
  label: string;
  field: string;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
}) {
  return (
    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-1 hover:text-foreground"
      >
        {label}
        {sortField === field &&
          (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
      </button>
    </th>
  );
}

export function VendorApprovalTable({
  vendors,
  sortField,
  sortDirection,
  onSort,
  onViewDetails,
}: VendorApprovalTableProps) {
  return (
    <table className="w-full">
      <thead className="bg-[var(--muted)]">
        <tr>
          <SortHeader label="Name" field="name" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
          <SortHeader label="Type" field="type" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
          <SortHeader label="Location" field="location" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
          <SortHeader label="Status" field="status" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Action</th>
        </tr>
      </thead>
      <tbody>
        {vendors.map((vendor) => (
          <tr key={vendor.id} className="border-t border-border/50 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/5">
            <td className="px-4 py-3 text-sm font-medium">{vendor.name}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{vendor.type}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{vendor.location}</td>
            <td className="px-4 py-3">
              <Badge variant={getStatusVariant(vendor.status)}>{vendor.status}</Badge>
            </td>
            <td className="px-4 py-3">
              <Button variant="ghost" size="sm" onClick={() => onViewDetails(vendor)} className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
