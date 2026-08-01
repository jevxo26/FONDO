// src/types/wallet.ts

// ============================================================
// Customer Wallet types
// ============================================================

export interface CustomerWallet {
  id: string;
  walletNumber: string;
  balance: number;
  holdBalance: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerWalletTransaction {
  id: string;
  walletId: string;
  transactionType: string;
  amount: number;
  balanceBefore: number | null;
  balanceAfter: number | null;
  referenceType: string | null;
  referenceId: string | null;
  remarks: string | null;
  createdAt: string;
}

export interface WalletTopupResponse {
  paymentId: string;
  gatewayUrl: string;
}

export interface TopupPayload {
  amount: number;
  paymentMethodId?: string;
}

export interface WithdrawPayload {
  amount: number;
  withdrawMethod: "bank" | "mobile_banking";
  accountNumber: string;
}

export interface WalletWithdraw {
  id: string;
  walletId: string;
  amount: number;
  withdrawMethod: string;
  accountNumber: string;
  status: string;
  approvedBy: string | null;
  processedAt: string | null;
  createdAt: string;
}

// ============================================================
// Vendor Wallet & Settlement types
// ============================================================

export interface VendorWallet {
  id: string;
  vendorId: string;
  balance: number;
  holdBalance: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorWalletTransaction {
  id: string;
  walletId: string;
  transactionType: string;
  amount: number;
  balanceBefore: number | null;
  balanceAfter: number | null;
  referenceId: string | null;
  remarks: string | null;
  createdAt: string;
}

export interface VendorSettlementItem {
  id: string;
  settlementId: string;
  orderId: string;
  orderAmount: number;
  commission: number;
  payableAmount: number;
}

export interface VendorSettlementTransaction {
  id: string;
  settlementId: string;
  transactionId: string | null;
  amount: number;
  paymentMethod: string | null;
  status: string;
  processedAt: string | null;
}

export interface VendorSettlement {
  id: string;
  vendorId: string;
  settlementNumber: string;
  settlementPeriodStart: string;
  settlementPeriodEnd: string;
  totalOrders: number;
  grossAmount: number;
  totalCommission: number;
  vatAmount: number;
  adjustmentAmount: number;
  totalPayable: number;
  netAmount: number;
  paymentStatus: string;
  paymentDate: string | null;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
  items?: VendorSettlementItem[];
  transactions?: VendorSettlementTransaction[];
  vendor?: { businessName: string };
}

export interface CreateSettlementPayload {
  vendorId: string;
  settlementPeriodStart: string;
  settlementPeriodEnd: string;
}

export interface ProcessSettlementPayload {
  settlementId: string;
  transactionId?: string;
  paymentMethod?: string;
  processedAt?: string;
}

// ============================================================
// Platform Revenue types
// ============================================================

export interface PlatformRevenue {
  totalRevenue: number;
  commissionRevenue: number;
  deliveryRevenue: number;
  subscriptionRevenue: number;
  vat: number;
  period: { from: string | null; to: string | null };
}