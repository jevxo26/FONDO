"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DataTablePagination } from "@/components/common/table";
import {
  mockVendors,
  PAGE_SIZE,
  type Vendor,
} from "./vendor-approval-data";
import { VendorApprovalFilters } from "./vendor-approval-filters";
import { VendorApprovalTable } from "./vendor-approval-table";
import { VendorApprovalDialog } from "./vendor-approval-dialog";

export function VendorApprovalQueue() {
  const [vendors, setVendors] = useState(mockVendors);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredVendors = vendors
    .filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || v.status === statusFilter;
      const matchesType = typeFilter === "all" || v.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const aVal = a[sortField as keyof typeof a] || "";
      const bVal = b[sortField as keyof typeof b] || "";
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const totalItems = filteredVendors.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, totalItems);
  const currentVendors = filteredVendors.slice(start, end);
  const uniqueTypes = [...new Set(vendors.map((v) => v.type))];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(0);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setCurrentPage(0);
  };

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    if (!selectedVendor) return;
    setVendors((prev) =>
      prev.map((v) => (v.id === selectedVendor.id ? { ...v, status: "Approved" } : v)),
    );
    setSelectedVendor({ ...selectedVendor, status: "Approved" });
  };

  const handleReject = () => {
    if (!selectedVendor) return;
    setVendors((prev) =>
      prev.map((v) => (v.id === selectedVendor.id ? { ...v, status: "Rejected" } : v)),
    );
    setSelectedVendor({ ...selectedVendor, status: "Rejected" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vendor Approval Queue</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="secondary">Filter</Button>
        </div>
      </div>

      <VendorApprovalFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        uniqueTypes={uniqueTypes}
        onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(0); }}
        onStatusChange={(v) => { setStatusFilter(v || "all"); setCurrentPage(0); }}
        onTypeChange={(v) => { setTypeFilter(v || "all"); setCurrentPage(0); }}
        onClear={handleClearFilters}
      />

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto">
            <VendorApprovalTable
              vendors={currentVendors}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onViewDetails={handleViewDetails}
            />
            {filteredVendors.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No vendors found</div>
            )}
          </div>

          {filteredVendors.length > 0 && (
            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              start={start}
              end={end}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      <VendorApprovalDialog
        vendor={selectedVendor}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
