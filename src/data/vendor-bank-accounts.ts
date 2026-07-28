// src/data/vendor-bank-accounts.ts
import type { VendorBankAccount } from "@/types/vendor";

export const vendorBankAccounts: VendorBankAccount[] = [
  {
    id: "ba-001",
    vendorId: "vendor-001",
    bankName: "Dutch Bangla Bank",
    branchName: "Gulshan Branch",
    accountName: "FONDO Kitchen",
    accountNumber: "1234567890",
    routingNumber: "010123456",
    accountType: "CURRENT",
    isPrimary: true,
    status: "ACTIVE",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "ba-002",
    vendorId: "vendor-001",
    bankName: "bKash",
    branchName: "",
    accountName: "FONDO Kitchen",
    accountNumber: "01712345678",
    routingNumber: "",
    accountType: "MOBILE_BANKING",
    isPrimary: false,
    status: "ACTIVE",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "ba-003",
    vendorId: "vendor-001",
    bankName: "City Bank",
    branchName: "Banani Branch",
    accountName: "FONDO Kitchen",
    accountNumber: "9876543210",
    routingNumber: "020987654",
    accountType: "SAVINGS",
    isPrimary: false,
    status: "ACTIVE",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-14T16:00:00Z",
  },
  {
    id: "ba-004",
    vendorId: "vendor-001",
    bankName: "Nagad",
    branchName: "",
    accountName: "FONDO Kitchen",
    accountNumber: "01812345678",
    routingNumber: "",
    accountType: "MOBILE_BANKING",
    isPrimary: false,
    status: "INACTIVE",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-13T11:00:00Z",
  },
];

export const bankAccountTypes = [
  { value: "ALL", label: "All Types" },
  { value: "CURRENT", label: "Current Account" },
  { value: "SAVINGS", label: "Savings Account" },
  { value: "MOBILE_BANKING", label: "Mobile Banking" },
];

export const bankNames = [
  { value: "ALL", label: "All Banks" },
  { value: "Dutch Bangla Bank", label: "Dutch Bangla Bank" },
  { value: "bKash", label: "bKash" },
  { value: "City Bank", label: "City Bank" },
  { value: "Nagad", label: "Nagad" },
  { value: "BRAC Bank", label: "BRAC Bank" },
  { value: "Eastern Bank", label: "Eastern Bank" },
  { value: "Rocket", label: "Rocket" },
];

export const getAccountTypeBadge = (type: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    CURRENT: { label: "Current", className: "bg-blue-500/10 text-blue-500 ring-blue-500/20" },
    SAVINGS: { label: "Savings", className: "bg-green-500/10 text-green-500 ring-green-500/20" },
    MOBILE_BANKING: { label: "Mobile Banking", className: "bg-purple-500/10 text-purple-500 ring-purple-500/20" },
  };
  return variants[type] || variants.CURRENT;
};

export const getBankAccountStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    ACTIVE: { label: "Active", className: "bg-success/10 text-success ring-success/20" },
    INACTIVE: { label: "Inactive", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  };
  return variants[status] || variants.INACTIVE;
};