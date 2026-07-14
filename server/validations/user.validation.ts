import * as yup from "yup";

export const createUserSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),

  password: yup.string().min(6, "Password must be at least 6 characters").optional(),

  gender: yup
    .string()
    .oneOf(["MALE", "FEMALE", "OTHER"], "Invalid gender")
    .required("Gender is required"),

  avatar: yup.string().url("Invalid URL format").optional(),
  dateOfBirth: yup.date().optional(),
});

export const updateProfileSchema = yup.object({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().email("Invalid email format").optional(),
  avatar: yup.string().url("Invalid URL format").optional(),
  gender: yup.string().oneOf(["MALE", "FEMALE", "OTHER"], "Invalid gender").optional(),
  dateOfBirth: yup.date().optional(),
});
