"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { categoryColumns } from "./category-columns";
import { adminCategories, type AdminCategory } from "@/data/categories-data";
import { Eye, Edit, ListChecks } from "lucide-react";

const rowActions: RowAction<AdminCategory>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (cat) => console.log("View Details", cat.id),
  },
  {
    label: "Edit Category",
    icon: <Edit className="size-4" />,
    onClick: (cat) => console.log("Edit", cat.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ListChecks className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
  ],
};

export function CategoryTableSection() {
  return (
    <DataTable
      data={adminCategories}
      columns={categoryColumns}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
