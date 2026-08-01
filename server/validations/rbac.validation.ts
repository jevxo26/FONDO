import * as yup from "yup";

export const createRoleSchema = yup.object({
  name: yup.string().required("Role name is required").max(100),
  slug: yup
    .string()
    .required("Role slug is required")
    .matches(/^[a-zA-Z0-9_]+$/, "Slug must be letters, numbers, or underscore")
    .max(50),
  description: yup.string().optional().max(500),
  status: yup.string().oneOf(["active", "inactive"]).optional(),
});

export const updateRoleSchema = yup.object({
  name: yup.string().optional().max(100),
  slug: yup
    .string()
    .optional()
    .matches(/^[a-zA-Z0-9_]+$/, "Slug must be letters, numbers, or underscore")
    .max(50),
  description: yup.string().optional().nullable().max(500),
  status: yup.string().oneOf(["active", "inactive"]).optional(),
});

export const assignPermissionsSchema = yup.object({
  permissionSlugs: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one permission")
    .required(),
});

export const assignRoleSchema = yup.object({
  roleId: yup.string().required("Role is required"),
});
