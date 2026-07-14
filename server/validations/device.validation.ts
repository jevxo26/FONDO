import * as yup from "yup";

export const registerDeviceSchema = yup.object({
  deviceId: yup.string().required("Device ID is required"),
  deviceName: yup.string().optional(),
  deviceType: yup
    .string()
    .oneOf(["mobile", "tablet", "desktop"])
    .required("Device type is required"),
  operatingSystem: yup.string().optional(),
  osVersion: yup.string().optional(),
  appVersion: yup.string().optional(),
  browser: yup.string().optional(),
  pushToken: yup.string().required("Push token is required"),
  ipAddress: yup.string().optional(),
});
