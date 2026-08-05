import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { Package } from "@/types/package";

export interface PackageReviewItem {
    id: string;
    packageId: string;
    customerId: string;
    orderId?: string;
    rating: number;
    review: string;
    status: "pending" | "approved" | "rejected" | string;
    createdAt: string;
    updatedAt: string;
    package?: {
        id: string;
        name: string;
        thumbnail: string;
    };
    customer?: {
        id?: string;
        firstName?: string;
        lastName?: string;
        name?: string;
        avatar?: string;
    };
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

        // Public/Approved reviews endpoint
        getPackageReviews: builder.query<PackageReviewItem[], { packageId?: string; status?: string } | void>({
            query: (params) => ({
                url: "/package/reviews/pending", // or /package/reviews if public
                params: params || {},
            }),
            providesTags: ["Package"],
        }),

        // Get current user's reviews for package
        getUserPackageReviews: builder.query<PackageReviewItem[], { packageId: string }>({
            query: ({ packageId }) => ({
                url: `/package/${packageId}/my-reviews`,
            }),
            providesTags: ["Package"],
        }),

        // Submit a new review
        createPackageReview: builder.mutation<
            PackageReviewItem,
            { packageId: string; rating: number; review: string; orderId?: string }
        >({
            query: ({ packageId, ...body }) => ({
                url: `/package/${packageId}/reviews`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Package"],
        }),

        // Update existing review
        updatePackageReview: builder.mutation<
            PackageReviewItem,
            { id: string; rating: number; review: string }
        >({
            query: ({ id, ...body }) => ({
                url: `/package/reviews/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Package"],
        }),

        // Delete review
        deletePackageReview: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/package/reviews/${id}`,
                method: "DELETE",
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
    useApprovePackageMutation,
    useRejectPackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
    useCreateCustomMealRequestMutation,

    useGetPackageReviewsQuery,
    useGetUserPackageReviewsQuery,
    useCreatePackageReviewMutation,
    useUpdatePackageReviewMutation,
    useDeletePackageReviewMutation,

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

export function usePackageReviews(packageId?: string) {
    const { data, isLoading, refetch } = useGetPackageReviewsQuery(
        packageId ? { packageId } : undefined
    );
    return { reviews: data || [], isLoading, refetch };
}

export function useReviewMutations() {
    const [createReview, { isLoading: isCreating }] = useCreatePackageReviewMutation();
    const [updateReview, { isLoading: isUpdating }] = useUpdatePackageReviewMutation();
    const [deleteReview, { isLoading: isDeleting }] = useDeletePackageReviewMutation();

    return {
        createReview,
        updateReview,
        deleteReview,
        isSubmitting: isCreating || isUpdating || isDeleting,
    };
}