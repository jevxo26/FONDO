import * as yup from "yup";

export const createSettlementSchema = yup.object({
  vendorId: yup.string().uuid().required(),
  settlementPeriodStart: yup.string().required(),
  settlementPeriodEnd: yup.string().required(),
});

export const processSettlementSchema = yup.object({
  transactionId: yup.string().optional(),
  paymentMethod: yup.string().optional(),
  processedAt: yup.string().optional(),
});

export const platformRevenueQuerySchema = yup.object({
  from: yup.string().optional(),
  to: yup.string().optional(),
});
