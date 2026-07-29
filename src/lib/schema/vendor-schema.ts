import * as yup from "yup";

export const vendorFormSchema = yup.object({
  businessName: yup.string().required("Business name is required").min(3, "At least 3 characters"),
  businessType: yup.string().required("Select business type"),
  businessEmail: yup.string().email("Enter valid email").required("Email required"),
  businessPhone: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit phone required")
    .required("Phone required"),
  website: yup.string().url("Enter valid URL").optional(),
  description: yup.string().required("Description required").min(20, "At least 20 characters"),

  ownerName: yup.string().required("Owner name required"),
  ownerPhone: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit phone required")
    .required("Phone required"),
  ownerEmail: yup.string().email("Enter valid email").required("Email required"),
  nid: yup
    .string()
    .matches(/^\d{10,17}$/, "NID must be 10-17 digits")
    .required("NID required"),
  dob: yup.string().required("Date of birth required"),

  streetAddress: yup.string().required("Address required"),
  city: yup.string().required("City required"),
  postalCode: yup.string().required("Postal code required"),
  deliveryRadius: yup.string().required("Delivery radius required"),

  branchCount: yup.number().min(1, "Minimum 1 branch").required("Required"),
  branchName: yup.string().required("Main branch name required"),
  kitchenType: yup.string().required("Kitchen type required"),

  cuisines: yup.array().of(yup.string().required()).min(1, "Select at least 1 cuisine").required(),

  tradeLicenseNumber: yup.string().required("Trade license required"),
  tinNumber: yup.string().required("TIN number required"),
  vatNumber: yup.string().optional(),
  foodLicenseNumber: yup.string().required("Food safety license required"),

  bankName: yup.string().required("Bank name required"),
  accountName: yup.string().required("Account name required"),
  accountNumber: yup.string().required("Account number required"),
  routingNumber: yup.string().required("Routing number required"),
  mobileBankingProvider: yup.string().required("Select mobile wallet"),
  mobileBankingNumber: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid mobile number required")
    .required("Number required"),

  useFondoDelivery: yup.boolean().default(true),
  selfDelivery: yup.boolean().default(false),
  pickupAvailable: yup.boolean().default(true),
  scheduledDelivery: yup.boolean().default(true),

  termsAccepted: yup.boolean().oneOf([true], "Must accept Terms").required(),
  authenticDocsAccepted: yup.boolean().oneOf([true], "Must confirm authenticity").required(),
  policiesAccepted: yup.boolean().oneOf([true], "Must accept policies").required(),
});

export type VendorFormData = yup.InferType<typeof vendorFormSchema>;
