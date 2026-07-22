import * as yup from "yup";

export const checkoutSchema = yup.object({
  fulfillment: yup.string().oneOf(["delivery", "pickup"]).required(),
  recipientName: yup.string().required("Recipient name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+?[\d\s-]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  streetAddress: yup.string().when("fulfillment", {
    is: "delivery",
    then: (s) => s.required("Street address is required"),
    otherwise: (s) => s.nullable(),
  }),
  city: yup.string().when("fulfillment", {
    is: "delivery",
    then: (s) => s.required("City is required"),
    otherwise: (s) => s.nullable(),
  }),
  zipCode: yup
    .string()
    .matches(/^\d{4}$/, "Postal code must be 4 digits")
    .when("fulfillment", {
      is: "delivery",
      then: (s) => s.required("ZIP code is required"),
      otherwise: (s) => s.nullable(),
    }),
  paymentMethod: yup
    .string()
    .oneOf(["online", "bkash", "nagad", "cod"])
    .required("Payment method is required"),
  orderNotes: yup.string().nullable(),
});

export type CheckoutInput = yup.InferType<typeof checkoutSchema>;
