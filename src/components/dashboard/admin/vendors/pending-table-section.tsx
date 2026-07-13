"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { pendingColumns } from "./pending-columns";
import type { PendingVendor } from "@/data/vendors";
import { pendingVendors } from "@/data/vendors";
import { VendorApprovalDialog } from "./vendor-approval-dialog";
import { CheckCircle, Eye, Store, XCircle } from "lucide-react";

export function PendingTableSection() {
  const [data, setData] = useState(pendingVendors);
  const [selectedVendor, setSelectedVendor] = useState<PendingVendor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (vendor: PendingVendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    if (!selectedVendor) return;
    setData((prev) =>
      prev.map((v) => (v.id === selectedVendor.id ? { ...v, status: "Approved" } : v)),
    );
    setSelectedVendor((prev) => (prev ? { ...prev, status: "Approved" } : null));
  };

  const handleReject = () => {
    if (!selectedVendor) return;
    setData((prev) =>
      prev.map((v) => (v.id === selectedVendor.id ? { ...v, status: "Rejected" } : v)),
    );
    setSelectedVendor((prev) => (prev ? { ...prev, status: "Rejected" } : null));
  };

  const rowActions: RowAction<PendingVendor>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (vendor) => handleViewDetails(vendor),
    },
    {
      label: "Reject",
      icon: <XCircle className="size-4" />,
      variant: "destructive",
      onClick: (_vendor) => {
        // Quick reject from dropdown
      },
    },
  ];

  const statusFilter: FacetedFilter = {
    columnId: "status",
    title: "Status",
    icon: <CheckCircle className="size-4" />,
    options: [
      { label: "Pending", value: "Pending" },
      { label: "Documents Pending", value: "Documents Pending" },
      { label: "Approved", value: "Approved" },
      { label: "Rejected", value: "Rejected" },
    ],
  };

  const typeFilter: FacetedFilter = {
    columnId: "type",
    title: "Type",
    icon: <Store className="size-4" />,
    options: [
      { label: "Mughlai", value: "Mughlai" },
      { label: "Biryani", value: "Biryani" },
      { label: "Indian", value: "Indian" },
      { label: "Japanese", value: "Japanese" },
      { label: "Italian", value: "Italian" },
      { label: "Thai", value: "Thai" },
      { label: "Fast Food", value: "Fast Food" },
      { label: "Chinese", value: "Chinese" },
      { label: "Mediterranean", value: "Mediterranean" },
      { label: "Pakistani", value: "Pakistani" },
      { label: "American", value: "American" },
      { label: "Cafe", value: "Cafe" },
      { label: "Dessert", value: "Dessert" },
      { label: "Bakery", value: "Bakery" },
    ],
  };

  return (
    <>
      <DataTable
        columns={pendingColumns}
        data={data}
        rowActions={rowActions}
        filters={[statusFilter, typeFilter]}
        onRowClick={handleViewDetails}
      />
      <VendorApprovalDialog
        vendor={selectedVendor as PendingVendor | null}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
}
