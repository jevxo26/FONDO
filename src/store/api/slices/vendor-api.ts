import { api } from "../base-api";
import type { VendorBranch, VendorSettings } from "@/types/vendor";

export const vendorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getVendorBranches: builder.query<VendorBranch[], string>({
            query: (vendorCode) => `/vendor/${vendorCode}/branches`,
            providesTags: ["Vendor"],
        }),

        createVendorBranch: builder.mutation<VendorBranch, { vendorCode: string; data: Partial<VendorBranch> }>({
            query: ({ vendorCode, data }) => ({
                url: `/vendor/${vendorCode}/branches`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Vendor"],
        }),

        getVendorSettings: builder.query<VendorSettings, string>({
            query: (vendorCode) => `/vendor/${vendorCode}/settings`,
            providesTags: ["Vendor"],
        }),

        updateVendorSettings: builder.mutation<VendorSettings, { vendorCode: string; data: Partial<VendorSettings> }>({
            query: ({ vendorCode, data }) => ({
                url: `/vendor/${vendorCode}/settings`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Vendor"],
        }),

        createVendorKitchen: builder.mutation<unknown, { branchId: string; data: { name: string; status?: string } }>({
            query: ({ branchId, data }) => ({
                url: `/vendor/branches/${branchId}/kitchens`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Vendor"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetVendorBranchesQuery,
    useCreateVendorBranchMutation,
    useGetVendorSettingsQuery,
    useUpdateVendorSettingsMutation,
    useCreateVendorKitchenMutation,
} = vendorApi;