export interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  logo?: string;
  isDefault: boolean;
}

export interface InitiatePaymentPayload {
  orderId: string;
  amount: number;
  paymentMethodId?: string;
  currency?: string;
}

export interface InitiatePaymentResponse {
  paymentId: string;
  gatewayUrl: string;
  transactionId: string;
}

export interface Payment {
  id: string;
  paymentNumber: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  transactionId: string | null;
  paymentDate: string | null;
  failureReason: string | null;
  createdAt: string;
  order?: { orderNumber: string };
}

// ============================================================
// Admin Payment detail + refunds + adjustments
// ============================================================

export interface PaymentTransaction {
  id: string;
  paymentId: string;
  gatewayTransactionId: string | null;
  transactionType: string | null;
  amount: number;
  currency: string;
  status: string | null;
  responseCode: string | null;
  responseMessage: string | null;
  processedAt: string | null;
  createdAt: string;
}

export interface PaymentRefund {
  id: string;
  paymentId: string;
  orderId: string;
  refundAmount: number;
  reason: string;
  status: string;
  gatewayRefundId: string | null;
  processedBy: string | null;
  processedAt: string | null;
  createdAt: string;
}

export interface PaymentAdjustment {
  id: string;
  paymentId: string;
  adjustmentType: string;
  amount: number;
  reason: string;
  approvedBy: string | null;
  createdAt: string;
}

export interface PaymentInvoice {
  id: string;
  paymentId: string;
  invoiceNumber: string;
  invoiceDate: string;
  subtotal: number | null;
  vat: number | null;
  deliveryCharge: number | null;
  grandTotal: number;
  pdfUrl: string | null;
}

export interface PaymentHistory {
  id: string;
  paymentId: string;
  oldStatus: string | null;
  newStatus: string;
  remarks: string | null;
  changedBy: string | null;
  createdAt: string;
}

export interface PaymentDetail extends Payment {
  transactions: PaymentTransaction[];
  refunds: PaymentRefund[];
  adjustments: PaymentAdjustment[];
  invoice: PaymentInvoice | null;
  histories: PaymentHistory[];
}

export interface RefundPayload {
  amount: number;
  reason: string;
}

export interface AdjustPayload {
  adjustmentType: "correction" | "chargeback" | "bonus";
  amount: number;
  reason: string;
}
