import * as yup from "yup";

export const togglePermissionSchema = yup.object({
  module: yup.string().required("Module is required"),
  enabled: yup.boolean().required("enabled is required"),
});
