"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { approvalColumns } from "./approval-columns";
import { approvalItems, type ApprovalItem } from "@/data/food-approvals";
import { adminFoods } from "@/data/foods";
import {
  Eye, ListChecks, Tag, CheckCircle, XCircle, FileEdit,
} from "lucide-react";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ListChecks className="size-4" />,
  options: [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Changes Req.", value: "CHANGES_REQUESTED" },
  ],
};

const categoryFilter: FacetedFilter = {
  columnId: "category",
  title: "Category",
  icon: <Tag className="size-4" />,
  options: [
    { label: "Bengali", value: "Bengali" },
    { label: "Chinese", value: "Chinese" },
    { label: "Italian", value: "Italian" },
    { label: "Indian", value: "Indian" },
    { label: "Desserts", value: "Desserts" },
  ],
};

export function ApprovalTableSection() {
  const router = useRouter();

  const rowActions: RowAction<ApprovalItem>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (item) => {
        const food = adminFoods.find((f) => f.name === item.foodName);
        if (food) {
          router.push(`/dashboard/foods/${food.id}`);
        } else {
          console.log("View Details (approval)", item.id);
        }
      },
    },
    {
      label: "Approve",
      icon: <CheckCircle className="size-4" />,
      onClick: (item) => console.log("Approve", item.id),
    },
    {
      label: "Reject",
      icon: <XCircle className="size-4" />,
      onClick: (item) => console.log("Reject", item.id),
    },
    {
      label: "Request Changes",
      icon: <FileEdit className="size-4" />,
      onClick: (item) => console.log("Request Changes", item.id),
    },
  ];

  return (
    <DataTable
      data={approvalItems}
      columns={approvalColumns}
      rowActions={rowActions}
      filters={[statusFilter, categoryFilter]}
    />
  );
}
