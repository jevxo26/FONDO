import * as yup from "yup";

export const topupSchema = yup.object({
  amount: yup.number().positive().required(),
  paymentMethodId: yup.string().uuid().optional(),
});

export const withdrawSchema = yup.object({
  amount: yup.number().positive().required(),
  withdrawMethod: yup.string().oneOf(["bank", "mobile_banking"]).required(),
  accountNumber: yup.string().required(),
});

export const approveWithdrawSchema = yup.object({});
