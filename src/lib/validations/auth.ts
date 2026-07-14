import * as yup from "yup";

export const loginSchema = yup.object({
  identity: yup.string().required("Email or phone is required"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  token: yup.string().required("Reset token is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export type LoginInput = yup.InferType<typeof loginSchema>;
export type RegisterInput = yup.InferType<typeof registerSchema>;
export type ForgotPasswordInput = yup.InferType<typeof forgotPasswordSchema>;
export type ResetPasswordInput = yup.InferType<typeof resetPasswordSchema>;
