import * as yup from "yup";

export const addressSchema = yup.object({
  label: yup.string().required("Label is required"),
  receiverName: yup.string().required("Receiver name is required"),
  receiverPhone: yup
    .string()
    .matches(/^\+?[\d\s-]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  division: yup.string().required("Division is required"),
  district: yup.string().required("District is required"),
  area: yup.string().required("Area is required"),
  road: yup.string().nullable(),
  house: yup.string().nullable(),
  floor: yup.string().nullable(),
  apartment: yup.string().nullable(),
  landmark: yup.string().nullable(),
  postalCode: yup
    .string()
    .matches(/^\d{4}$/, "Postal code must be 4 digits")
    .nullable(),
  deliveryInstruction: yup.string().nullable(),
});

export type AddressInput = yup.InferType<typeof addressSchema>;
