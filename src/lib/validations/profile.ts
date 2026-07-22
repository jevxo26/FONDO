import * as yup from "yup";

export const profileSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  gender: yup.string().oneOf(["male", "female", "other"]).nullable(),
  dateOfBirth: yup.string().nullable(),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export type ProfileInput = yup.InferType<typeof profileSchema>;
export type ChangePasswordInput = yup.InferType<typeof changePasswordSchema>;
