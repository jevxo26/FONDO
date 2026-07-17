import * as yup from "yup";

export const initiatePaymentSchema = yup.object({
  orderId: yup.string().uuid().required(),
  paymentMethodId: yup.string().uuid().optional(),
  gatewayId: yup.string().uuid().optional(),
  amount: yup.number().positive().required(),
  currency: yup.string().optional().default("BDT"),
});

export const confirmPaymentSchema = yup.object({
  transactionId: yup.string().required(),
  gatewayTransactionId: yup.string().required(),
  status: yup.string().oneOf(["success", "failed"]).required(),
  gatewayResponse: yup.mixed().optional(),
});

export const retryPaymentSchema = yup.object({
  paymentMethodId: yup.string().uuid().optional(),
  gatewayId: yup.string().uuid().optional(),
});

export const refundPaymentSchema = yup.object({
  amount: yup.number().positive().required(),
  reason: yup.string().required(),
});

export const adjustPaymentSchema = yup.object({
  adjustmentType: yup.string().oneOf(["correction", "chargeback", "bonus"]).required(),
  amount: yup.number().positive().required(),
  reason: yup.string().required(),
});

export const listPaymentsSchema = yup.object({
  page: yup.number().positive().optional(),
  limit: yup.number().positive().optional(),
  status: yup.string().optional(),
  customerId: yup.string().uuid().optional(),
  from: yup.string().optional(),
  to: yup.string().optional(),
});
