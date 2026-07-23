// src/data/vendor-branches.ts
import type { VendorBranch } from "@/types/vendor";

export const vendorBranches: VendorBranch[] = [
  {
    id: "br-001",
    vendorId: "vendor-001",
    branchName: "Gulshan Branch",
    branchCode: "BR-001",
    phone: "+8801712345678",
    email: "gulshan@fondo.com",
    country: "Bangladesh",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Gulshan",
    area: "Gulshan-1",
    road: "Road #5",
    house: "House #12",
    postalCode: "1212",
    latitude: "23.7925",
    longitude: "90.4078",
    isMainBranch: true,
    status: "ACTIVE",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "br-002",
    vendorId: "vendor-001",
    branchName: "Banani Branch",
    branchCode: "BR-002",
    phone: "+8801812345678",
    email: "banani@fondo.com",
    country: "Bangladesh",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Banani",
    area: "Banani",
    road: "Road #11",
    house: "House #45",
    postalCode: "1213",
    latitude: "23.7945",
    longitude: "90.4065",
    isMainBranch: false,
    status: "ACTIVE",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "br-003",
    vendorId: "vendor-001",
    branchName: "Dhanmondi Branch",
    branchCode: "BR-003",
    phone: "+8801912345678",
    email: "dhanmondi@fondo.com",
    country: "Bangladesh",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Dhanmondi",
    area: "Dhanmondi",
    road: "Road #12",
    house: "House #22",
    postalCode: "1205",
    latitude: "23.7525",
    longitude: "90.3855",
    isMainBranch: false,
    status: "INACTIVE",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-14T16:00:00Z",
  },
];

export const branchStatuses = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

export const getBranchStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    ACTIVE: { label: "Active", className: "bg-success/10 text-success ring-success/20" },
    INACTIVE: { label: "Inactive", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  };
  return variants[status] || variants.INACTIVE;
};