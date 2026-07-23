// src/data/vendor-kitchens.ts
import type { VendorKitchen } from "@/types/vendor";

export const vendorKitchens: VendorKitchen[] = [
  {
    id: "1",
    name: "Main Kitchen",
    code: "KIT-001",
    branch: "Gulshan Branch",
    branchId: "br-001",
    capacity: 50,
    currentLoad: 42,
    preparationTime: 25,
    status: "ACTIVE",
    headChef: "Ahmed Khan",
    staffCount: 12,
    dailyOrders: 45,
    rating: 4.8,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Grill Kitchen",
    code: "KIT-002",
    branch: "Banani Branch",
    branchId: "br-002",
    capacity: 35,
    currentLoad: 28,
    preparationTime: 20,
    status: "ACTIVE",
    headChef: "Rahul Sharma",
    staffCount: 8,
    dailyOrders: 32,
    rating: 4.9,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    name: "Seafood Kitchen",
    code: "KIT-003",
    branch: "Dhanmondi Branch",
    branchId: "br-003",
    capacity: 30,
    currentLoad: 18,
    preparationTime: 30,
    status: "ACTIVE",
    headChef: "Maria Islam",
    staffCount: 6,
    dailyOrders: 20,
    rating: 4.7,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "4",
    name: "Fast Food Kitchen",
    code: "KIT-004",
    branch: "Banani Branch",
    branchId: "br-002",
    capacity: 25,
    currentLoad: 10,
    preparationTime: 15,
    status: "INACTIVE",
    headChef: "Sajid Ahmed",
    staffCount: 4,
    dailyOrders: 15,
    rating: 4.5,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-14T16:00:00Z",
  },
  {
    id: "5",
    name: "Salad Kitchen",
    code: "KIT-005",
    branch: "Gulshan Branch",
    branchId: "br-001",
    capacity: 20,
    currentLoad: 8,
    preparationTime: 10,
    status: "MAINTENANCE",
    headChef: "Nadia Rahman",
    staffCount: 3,
    dailyOrders: 12,
    rating: 4.6,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
];

export const kitchenStatuses = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "MAINTENANCE", label: "Maintenance" },
];

export const branches = [
  { value: "ALL", label: "All Branches" },
  { value: "Gulshan Branch", label: "Gulshan Branch" },
  { value: "Banani Branch", label: "Banani Branch" },
  { value: "Dhanmondi Branch", label: "Dhanmondi Branch" },
];

export const getKitchenStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    ACTIVE: { label: "Active", className: "bg-success/10 text-success ring-success/20" },
    INACTIVE: { label: "Inactive", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
    MAINTENANCE: { label: "Maintenance", className: "bg-warning/10 text-warning ring-warning/20" },
  };
  return variants[status] || variants.INACTIVE;
};