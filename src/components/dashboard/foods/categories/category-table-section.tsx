"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction } from "@/components/common/table";
import { categoryColumns } from "./category-columns";
import { adminCategories, type AdminCategory } from "@/data/categories-data";
import { Eye, Edit } from "lucide-react";

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

export function CategoryTableSection() {
  return (
    <DataTable
      data={adminCategories}
      columns={categoryColumns}
      rowActions={rowActions}
    />
  );
}
