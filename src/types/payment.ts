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
}

export interface PaymentListResponse {
  items: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
