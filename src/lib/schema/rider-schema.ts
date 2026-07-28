import * as yup from "yup";

export const riderFormSchema = yup.object({
  fullName: yup.string().required("Full legal name is required").min(3, "At least 3 characters"),
  phone: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit phone required")
    .required("Phone required"),
  email: yup.string().email("Enter a valid email").required("Email required"),
  nidNumber: yup
    .string()
    .matches(/^\d{10,17}$/, "NID must be 10-17 digits")
    .required("NID is required"),
  dob: yup.string().required("Date of birth is required"),

  emergencyName: yup.string().required("Emergency contact name required"),
  emergencyPhone: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit phone required")
    .required("Emergency phone required"),
  emergencyRelation: yup.string().required("Select relationship"),

  workZone: yup.string().required("Preferred work zone is required"),
  vehicleType: yup.string().required("Select vehicle type"),
  drivingLicenseNo: yup.string().when("vehicleType", {
    is: (val: string) => val === "motorbike" || val === "scooter",
    then: (schema) => schema.required("Driving license is required for motor vehicles"),
    otherwise: (schema) => schema.optional(),
  }),
  vehicleRegNumber: yup.string().when("vehicleType", {
    is: (val: string) => val === "motorbike" || val === "scooter",
    then: (schema) => schema.required("Vehicle registration number is required"),
    otherwise: (schema) => schema.optional(),
  }),

  payoutMethod: yup.string().required("Select payout method"),
  mobileWalletNumber: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit number required")
    .required("Wallet number required"),
  bankName: yup.string().optional(),
  bankAccountNumber: yup.string().optional(),

  termsAccepted: yup.boolean().oneOf([true], "Must agree to Terms").required(),
  safetyCodeAccepted: yup.boolean().oneOf([true], "Must agree to Safety Code").required(),
  backgroundCheckAccepted: yup
    .boolean()
    .oneOf([true], "Must consent to background check")
    .required(),
});

export type RiderFormData = yup.InferType<typeof riderFormSchema>;
