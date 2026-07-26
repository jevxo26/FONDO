// src/data/vendor-settings.ts
import type { VendorSettings } from "@/types/vendor";

export const vendorSettings: VendorSettings = {
  id: "settings-001",
  vendorId: "vendor-001",
  autoAcceptOrder: true,
  autoAssignRider: false,
  allowCustomMeal: true,
  allowPackage: true,
  notificationEnabled: true,
  smsEnabled: true,
  emailEnabled: true,
  marketingEnabled: false,
  status: "ACTIVE",
  updatedAt: "2024-01-15T10:30:00Z",
};

export const vendorProfile = {
  businessName: "FONDO Kitchen",
  ownerName: "Ahmed Khan",
  phone: "+8801712345678",
  email: "kitchen@fondo.com",
  logo: "/images/logo.png",
  coverImage: "/images/cover.jpg",
  description: "Premium food delivery kitchen serving authentic Mughlai cuisine.",
  businessType: "Food & Beverage",
  businessCategory: "Restaurant",
  foundedYear: "2023",
  employeeCount: "25",
  website: "www.fondo.com",
  facebook: "facebook.com/fondo",
  instagram: "instagram.com/fondo",
  youtube: "youtube.com/fondo",
};

export const vendorDocuments = [
  {
    id: "doc-001",
    documentType: "Trade License",
    documentNumber: "TR-2023-001",
    fileName: "trade-license.pdf",
    fileSize: "2.4 MB",
    issueDate: "2023-01-01",
    expiryDate: "2024-12-31",
    verificationStatus: "VERIFIED",
    uploadedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "doc-002",
    documentType: "BIN",
    documentNumber: "BIN-2023-002",
    fileName: "bin-certificate.pdf",
    fileSize: "1.8 MB",
    issueDate: "2023-01-15",
    expiryDate: "2024-12-31",
    verificationStatus: "VERIFIED",
    uploadedAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "doc-003",
    documentType: "Food License",
    documentNumber: "FL-2023-003",
    fileName: "food-license.pdf",
    fileSize: "3.2 MB",
    issueDate: "2023-02-01",
    expiryDate: "2024-01-31",
    verificationStatus: "PENDING",
    uploadedAt: "2023-02-01T00:00:00Z",
  },
];

export const vendorOperatingHours = [
  { day: "Monday", opening: "8:00 AM", closing: "11:00 PM", isClosed: false },
  { day: "Tuesday", opening: "8:00 AM", closing: "11:00 PM", isClosed: false },
  { day: "Wednesday", opening: "8:00 AM", closing: "11:00 PM", isClosed: false },
  { day: "Thursday", opening: "8:00 AM", closing: "11:00 PM", isClosed: false },
  { day: "Friday", opening: "9:00 AM", closing: "11:30 PM", isClosed: false },
  { day: "Saturday", opening: "8:00 AM", closing: "11:00 PM", isClosed: false },
  { day: "Sunday", opening: "8:00 AM", closing: "10:00 PM", isClosed: false },
];

export const vendorHolidays = [
  {
    id: "hol-001",
    name: "Eid-ul-Fitr",
    date: "2024-04-10",
    description: "Eid-ul-Fitr holiday",
  },
  {
    id: "hol-002",
    name: "Eid-ul-Adha",
    date: "2024-06-17",
    description: "Eid-ul-Adha holiday",
  },
];

export const getDocumentStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    VERIFIED: { label: "Verified", className: "bg-success/10 text-success ring-success/20" },
    PENDING: { label: "Pending", className: "bg-warning/10 text-warning ring-warning/20" },
    REJECTED: { label: "Rejected", className: "bg-destructive/10 text-destructive ring-destructive/20" },
  };
  return variants[status] || variants.PENDING;
};