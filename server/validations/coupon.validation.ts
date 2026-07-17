import * as yup from "yup";

export const createCouponSchema = yup.object({
  couponCode: yup.string().required().max(50),
  title: yup.string().optional().max(200),
  description: yup.string().optional().max(1000),
  discountType: yup.string().oneOf(["PERCENTAGE", "FIXED"]).required(),
  discountValue: yup.number().positive().required(),
  minimumOrderAmount: yup.number().positive().optional(),
  maximumDiscount: yup.number().positive().optional(),
  usageLimit: yup.number().positive().integer().optional(),
  perUserLimit: yup.number().positive().integer().optional().default(1),
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
  status: yup.string().oneOf(["active", "inactive", "expired"]).optional(),
});

export const updateCouponSchema = yup.object({
  title: yup.string().optional().max(200),
  description: yup.string().optional().max(1000),
  discountType: yup.string().oneOf(["PERCENTAGE", "FIXED"]).optional(),
  discountValue: yup.number().positive().optional(),
  minimumOrderAmount: yup.number().positive().optional().nullable(),
  maximumDiscount: yup.number().positive().optional().nullable(),
  usageLimit: yup.number().positive().integer().optional().nullable(),
  perUserLimit: yup.number().positive().integer().optional(),
  startDate: yup.string().optional().nullable(),
  endDate: yup.string().optional().nullable(),
  status: yup.string().oneOf(["active", "inactive", "expired"]).optional(),
});

export const listCouponsSchema = yup.object({
  page: yup.number().positive().optional(),
  limit: yup.number().positive().optional(),
  search: yup.string().optional(),
  status: yup.string().oneOf(["active", "inactive", "expired"]).optional(),
  discountType: yup.string().oneOf(["PERCENTAGE", "FIXED"]).optional(),
});
