export interface AdminCustomer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: string;
  totalOrders: number;
  totalSpent: number;
  subscriptionCount: number;
  walletBalance: number;
  lastOrderDate: string | null;
  joinedAt: string;
}

export interface AdminCustomerDetail {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatar: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  status: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  lastLoginAt: string | null;
  joinedAt: string;
  totalOrders: number;
  totalSubscriptions: number;
  totalPayments: number;
  totalSpent: number;
  lastOrder: {
    placedAt: string;
    orderStatus: string;
    totalAmount: number;
  } | null;
}

export interface AdminCustomerOrder {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  placedAt: string;
  items: number;
  customerName?: string;
  customerId?: string;
}

export interface AdminSubscription {
  id: string;
  subscriptionNumber: string;
  customerId: string;
  packageId: string | null;
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
  autoRenew: boolean;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
}

export interface AdminWalletTransaction {
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

export interface AdminWallet {
  id: string;
  walletNumber: string;
  balance: number;
  holdBalance: number;
  currency: string;
  status: string;
}

export interface AdminPayment {
  id: string;
  paymentNumber: string;
  orderId: string;
  transactionId: string | null;
  amount: number;
  currency: string;
  status: string;
  paymentDate: string | null;
  failureReason: string | null;
  createdAt: string;
  order?: { orderNumber: string };
}

export interface WalletResponse {
  wallet: AdminWallet | null;
  transactions: AdminWalletTransaction[];
}
