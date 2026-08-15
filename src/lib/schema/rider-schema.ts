import * as yup from "yup";

export const riderFormSchema = yup.object({
  // --- Personal Info ---
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "At least 2 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "At least 2 characters"),
  phone: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit phone required")
    .required("Phone required"),
  email: yup.string().email("Enter a valid email").required("Email required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  nidNumber: yup
    .string()
    .matches(/^\d{10,17}$/, "NID must be 10-17 digits")
    .required("NID is required"),
  dob: yup.string().required("Date of birth is required"),

  // --- Present Address ---
  division: yup.string().required("Division is required"),
  district: yup.string().required("District is required"),
  upazilaOrThana: yup.string().required("Upazila or Thana is required"),

  // --- Emergency Contact ---
  emergencyName: yup.string().required("Emergency contact name required"),
  emergencyPhone: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit phone required")
    .required("Emergency phone required"),
  emergencyRelation: yup.string().required("Select relationship"),

  // --- Work Zone & Vehicle ---
  workZoneDivision: yup.string().required("Work zone division is required"),
  workZoneDistrict: yup.string().required("Work zone district is required"),
  workZone: yup.string().required("Preferred work area is required"),
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

  // --- Payout Info ---
  payoutMethod: yup.string().required("Select payout method"),
  mobileWalletNumber: yup
    .string()
    .matches(/^01[3-9]\d{8}$/, "Valid 11-digit number required")
    .required("Wallet number required"),
  bankName: yup.string().optional(),
  bankAccountNumber: yup.string().optional(),

  // --- Document Uploads ---
  nidFront: yup.mixed().required("NID Front side image is required"),
  nidBack: yup.mixed().required("NID Back side image is required"),
  licenseFront: yup.string().when("vehicleType", {
    is: (val: string) => val === "motorbike" || val === "scooter",
    then: (schema) => schema.required("License front side image is required"),
    otherwise: (schema) => schema.optional(),
  }),
  licenseBack: yup.string().when("vehicleType", {
    is: (val: string) => val === "motorbike" || val === "scooter",
    then: (schema) => schema.required("License back side image is required"),
    otherwise: (schema) => schema.optional(),
  }),

  // --- Agreements ---
  termsAccepted: yup.boolean().oneOf([true], "Must agree to Terms").required(),
  safetyCodeAccepted: yup.boolean().oneOf([true], "Must agree to Safety Code").required(),
  backgroundCheckAccepted: yup
    .boolean()
    .oneOf([true], "Must consent to background check")
    .required(),
});

export type RiderFormData = yup.InferType<typeof riderFormSchema>;