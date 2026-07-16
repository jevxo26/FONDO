import * as yup from "yup";

export const updateOrderSchema = yup.object({
  notes: yup.string().optional(),
  deliverySchedule: yup.object({
    deliveryDate: yup.date().required("Delivery date is required"),
    deliverySlot: yup.string().optional(),
  }).optional(),
});

export const cancelOrderSchema = yup.object({
  reason: yup.string().required("Cancellation reason is required"),
  cancelledBy: yup.string().oneOf(["customer", "admin"]).required("Cancelled by is required"),
});

export const updateStatusSchema = yup.object({
  status: yup.string()
    .oneOf(
      ["CONFIRMED", "PREPARING", "READY_FOR_PICKUP", "PICKED_UP", "ON_THE_WAY", "DELIVERED", "CANCELLED"],
      "Invalid status transition",
    )
    .required("Status is required"),
  remarks: yup.string().optional(),
});

export const assignVendorSchema = yup.object({
  vendorId: yup.string().required("Vendor ID is required"),
});

export const assignRiderSchema = yup.object({
  riderId: yup.string().required("Rider ID is required"),
});

export const processRefundSchema = yup.object({
  amount: yup.number().positive("Amount must be positive").required("Amount is required"),
  refundMethod: yup.string().optional(),
  reason: yup.string().required("Refund reason is required"),
});

export const submitFeedbackSchema = yup.object({
  rating: yup.number().min(1).max(5).required("Rating is required (1-5)"),
  review: yup.string().optional(),
});

export const updateMealStatusSchema = yup.object({
  status: yup.string().required("Status is required"),
});
