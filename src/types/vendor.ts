// src/types/vendor.ts
export interface VendorFood {
  id: string;
  foodId: string;
  name: string;
  category: string;
  subCategory: string;
  sku: string;
  kitchen: string;
  branch: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  maxStock: number;
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  status: "ACTIVE" | "INACTIVE";
  preparationTime: number;
  isFeatured: boolean;
  isPopular: boolean;
  image: string;
  vendorFoodCode: string;
  priority: number;
  isPrimary: boolean;
  totalOrders: number;
  rating: number;
}

export interface FilterConfig {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}

export interface RowAction<TData> {
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: (data: TData) => void;
}

// src/types/vendor.ts (add these types)
export interface VendorOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface VendorOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: VendorOrderItem[];
  totalItems: number;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY_FOR_PICKUP" | "PICKED_UP" | "ON_THE_WAY" | "DELIVERED" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PAID" | "PENDING" | "REFUNDED";
  deliveryAddress: string;
  deliveryDate: string;
  deliverySlot: string;
  createdAt: string;
  updatedAt: string;
}
// src/types/vendor.ts (add these types)
export interface VendorKitchen {
  id: string;
  name: string;
  code: string;
  branch: string;
  branchId: string;
  capacity: number;
  currentLoad: number;
  preparationTime: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  headChef: string;
  staffCount: number;
  dailyOrders: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// src/types/vendor.ts (add these types)
export interface VendorStaff {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  designation: string;
  branch: string;
  branchId: string;
  joiningDate: string;
  salary: number;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
  shift: string;
  roles: string[];
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
// src/types/vendor.ts (add these types)
export interface VendorSettlement {
  id: string;
  settlementNumber: string;
  periodStart: string;
  periodEnd: string;
  totalOrders: number;
  grossAmount: number;
  commissionAmount: number;
  vatAmount: number;
  adjustmentAmount: number;
  netAmount: number;
  paymentStatus: "PAID" | "PROCESSING" | "PENDING";
  paymentDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VendorWalletTransaction {
  id: string;
  walletId: string;
  transactionType: "CREDIT" | "DEBIT" | "ADJUSTMENT";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceType: string;
  referenceId: string;
  remarks: string;
  createdAt: string;
}
// src/types/vendor.ts (add these types)
export interface VendorSettings {
  id: string;
  vendorId: string;
  autoAcceptOrder: boolean;
  autoAssignRider: boolean;
  allowCustomMeal: boolean;
  allowPackage: boolean;
  notificationEnabled: boolean;
  smsEnabled: boolean;
  emailEnabled: boolean;
  marketingEnabled: boolean;
  status: "ACTIVE" | "INACTIVE";
  updatedAt: string;
}

export interface VendorDocument {
  id: string;
  documentType: string;
  documentNumber: string;
  fileName: string;
  fileSize: string;
  issueDate: string;
  expiryDate: string;
  verificationStatus: "VERIFIED" | "PENDING" | "REJECTED";
  uploadedAt: string;
}

export interface VendorOperatingHour {
  day: string;
  opening: string;
  closing: string;
  isClosed: boolean;
}

export interface VendorHoliday {
  id: string;
  name: string;
  date: string;
  description: string;
}

// src/types/vendor.ts (add these types)
export interface VendorBranch {
  id: string;
  vendorId: string;
  branchName: string;
  branchCode: string;
  phone: string;
  email: string;
  country: string;
  division: string;
  district: string;
  upazila: string;
  area: string;
  road: string;
  house: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  isMainBranch: boolean;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}// src/types/vendor.ts (add these types)
export interface VendorBankAccount {
  id: string;
  vendorId: string;
  bankName: string;
  branchName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: "CURRENT" | "SAVINGS" | "MOBILE_BANKING";
  isPrimary: boolean;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
// src/types/vendor.ts (add these types)
export interface VendorServiceArea {
  id: string;
  vendorId: string;
  division: string;
  district: string;
  upazila: string;
  area: string;
  deliveryCharge: number;
  minimumOrderAmount: number;
  estimatedDeliveryTime: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}