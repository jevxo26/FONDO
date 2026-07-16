import * as yup from "yup";

export const listCustomersSchema = yup.object({
  page: yup.number().positive().optional(),
  limit: yup.number().positive().optional(),
  search: yup.string().optional(),
  status: yup.string().oneOf(["ACTIVE", "INACTIVE", "SUSPENDED", "BANNED"]).optional(),
});
