import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { Package } from "@/types/package";

export interface AdminPackageListItem {
  id: string;
  packageCode: string;
  name: string;
  slug: string;
  description?: string | null;
  thumbnail: string;
  packageType: string;
  durationDays: number;
  totalMeals: number;
  price: number;
  discountPrice?: number | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string | null;
  createdAt: string;
  packageCategory?: { id: string; name: string } | null;
  vendor?: { id: string; businessName: string } | null;
  approver?: { id: string; firstName: string; lastName: string } | null;
  _count?: { days: number; reviews: number };
}

export interface AdminPackageListResult {
  items: AdminPackageListItem[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export const packagesApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getPackages: builder.query<Package[], void>({
            query: () => ({
                url: "/package",
            }),
            providesTags: ["Package"],
        }),

        getPackageById: builder.query<Package, string>({
            query: (id) => `/package/${id}`,
            providesTags: (result, error, id) => [
                { type: "Package", id },
            ],
        }),

        createPackage: builder.mutation({
            query: (body) => ({
                url: "/package/vendor/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Package"],
        }),

        createAdminPackage: builder.mutation({
            query: (body) => ({
                url: "/package/admin/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Package"],
        }),

        listAdminPackages: builder.query<AdminPackageListResult, { status?: string; vendorId?: string; search?: string; page?: number; limit?: number }>({
            query: (params) => ({
                url: "/package/admin",
                params,
            }),
            providesTags: ["Package"],
        }),

        listVendorPackages: builder.query<AdminPackageListItem[], void>({
            query: () => "/package/vendor/packages",
            providesTags: ["Package"],
        }),

        approvePackage: builder.mutation({
            query: (id) => ({
                url: `/package/admin/${id}/approve`,
                method: "PATCH",
            }),
            invalidatesTags: ["Package"],
        }),

        rejectPackage: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/package/admin/${id}/reject`,
                method: "PATCH",
                body: { reason },
            }),
            invalidatesTags: ["Package"],
        }),

        updatePackage: builder.mutation({
            query: ({ id, body }) => ({
                url: `/package/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Package"],
        }),

        deletePackage: builder.mutation({
            query: (id) => ({
                url: `/package/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Package"],
        }),
        getPackageCategories: builder.query({
            query: () => "/package/categories",
        }),
        createCustomMealRequest: builder.mutation({
            query: (body) => ({
                url: "/package/custom-request",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Package"],
        }),

    }),
});

export const {

    useGetPackagesQuery,
    useGetPackageByIdQuery,
    useGetPackageCategoriesQuery,
    useCreatePackageMutation,
    useCreateAdminPackageMutation,
    useListAdminPackagesQuery,
    useListVendorPackagesQuery,
    useApprovePackageMutation,
    useRejectPackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
    useCreateCustomMealRequestMutation,

} = packagesApi;

// Query wrappers
export function useGetPackageCategories() {
    const { data, isLoading, error } = useGetPackageCategoriesQuery(undefined);
    return { data, isLoading, error };
}

export function useGetPackages() {
    const { data, isLoading } = useGetPackagesQuery(undefined);
    return { data, isLoading };
}

export function useGetPackage(id: string) {
    const { data, isLoading, error } = useGetPackageByIdQuery(id, { skip: !id });
    return { data, isLoading, error };
}

// Mutation wrappers — example-api pattern
export function useCreatePackage() {
    const [createPackage, { isLoading }] = useCreatePackageMutation();
    return { createPackage, isPending: isLoading };
}

export function useCreateAdminPackage() {
    const [createAdminPackage, { isLoading }] = useCreateAdminPackageMutation();
    return { createAdminPackage, isPending: isLoading };
}

export function useApprovePackage() {
    const [approvePackage, { isLoading }] = useApprovePackageMutation();
    return { approvePackage, ...createMutationWrapper(approvePackage), isPending: isLoading };
}

export function useRejectPackage() {
    const [rejectPackage, { isLoading }] = useRejectPackageMutation();
    return { rejectPackage, ...createMutationWrapper(rejectPackage), isPending: isLoading };
}

export function useUpdatePackage() {
    const [updatePackage, { isLoading }] = useUpdatePackageMutation();
    return { updatePackage, ...createMutationWrapper(updatePackage), isPending: isLoading };
}

export function useDeletePackage() {
    const [deletePackage, { isLoading }] = useDeletePackageMutation();
    return { deletePackage, ...createMutationWrapper(deletePackage), isPending: isLoading };
}

export function useCreateCustomMealRequest() {
  const [createCustomMealRequest, { isLoading }] =
    useCreateCustomMealRequestMutation();

  return {
    createCustomMealRequest,
    isPending: isLoading,
  };
}