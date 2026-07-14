import * as yup from "yup";

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
  gender: yup
    .string()
    .oneOf(["MALE", "FEMALE", "OTHER"], "Invalid gender")
    .optional(),
  avatar: yup.string().url("Invalid URL format").optional(),
  dateOfBirth: yup.date().optional(),
});

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").optional(),
  phone: yup.string().optional(),
  password: yup.string().required("Password is required"),
});

export const otpSendSchema = yup.object({
  phone: yup.string().optional(),
  email: yup.string().email("Invalid email format").optional(),
  purpose: yup
    .string()
    .oneOf(["LOGIN", "REGISTER", "FORGOT_PASSWORD", "PHONE_VERIFY", "EMAIL_VERIFY"])
    .required("Purpose is required"),
});

export const otpVerifySchema = yup.object({
  phone: yup.string().optional(),
  email: yup.string().email("Invalid email format").optional(),
  otp: yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
  purpose: yup
    .string()
    .oneOf(["LOGIN", "REGISTER", "FORGOT_PASSWORD", "PHONE_VERIFY", "EMAIL_VERIFY"])
    .required("Purpose is required"),
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
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
});
