// src/lib/schema/kitchen-schema.ts
import * as yup from "yup";

export const inputStyles =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export interface KitchenFormValues {
    name: string;
    code: string;
    branch: string;
    capacity: number;
    currentLoad: number;
    preparationTime: number;
    status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
    headChef: string;
    staffCount: number;
}

export const kitchenSchema = yup.object().shape({
    name: yup.string().required("Kitchen name is required"),
    code: yup.string().required("Kitchen code is required"),
    branch: yup.string().required("Branch is required"),
    capacity: yup.number().min(1, "Capacity must be at least 1").required("Capacity is required"),
    currentLoad: yup
        .number()
        .min(0, "Current load must be 0 or more")
        .required("Current load is required"),
    preparationTime: yup
        .number()
        .min(0, "Preparation time must be 0 or more")
        .required("Preparation time is required"),
    status: yup
        .string()
        .oneOf(["ACTIVE", "INACTIVE", "MAINTENANCE"])
        .required("Status is required"),
    headChef: yup.string().required("Head chef name is required"),
    staffCount: yup.number().min(0, "Staff count must be 0 or more").required("Staff count is required"),
});

export const initialValues: KitchenFormValues = {
    name: "",
    code: "",
    branch: "",
    capacity: 0,
    currentLoad: 0,
    preparationTime: 30,
    status: "ACTIVE",
    headChef: "",
    staffCount: 0,
};