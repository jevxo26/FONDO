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

// Added interface for the Public Review API Response format
export interface PublicPackageReviewsResponse {
    reviews: PackageReviewItem[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        averageRating: number;
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
                url: `/package/admin/${id}`,
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
        getPackageReviews: builder.query<
            PackageReviewItem[],
            { packageId?: string; status?: string } | void
        >({
            query: (params) => ({
                url: "/package/reviews/pending",
                params: params || {},
            }),
            providesTags: ["Package"],
        }),

        // ✅ FIXED: Public Reviews API Endpoint (Fetches approved reviews for a specific package)
        getPackagePublicReviews: builder.query<
            PublicPackageReviewsResponse,
            { packageId: string; page?: number; limit?: number }
        >({
            query: ({ packageId, page = 1, limit = 10 }) => ({
                url: `/package/${packageId}/reviews`,
                params: { page, limit },
            }),
            providesTags: (result, error, { packageId }) => [
                { type: "Package", id: `REVIEWS_${packageId}` },
            ],
        }),

        // Get current user's reviews for package
        getUserPackageReviews: builder.query<
            PackageReviewItem[],
            { packageId: string }
        >({
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

        // Update review
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
        deletePackageReview: builder.mutation<
            { success: boolean },
            string
        >({
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
    useListAdminPackagesQuery,
    useListVendorPackagesQuery,
    useApprovePackageMutation,
    useRejectPackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
    useCreateCustomMealRequestMutation,

    // Reviews
    useGetPackageReviewsQuery,
    useGetPackagePublicReviewsQuery,
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

export function usePackagePublicReviews(packageId: string, page = 1, limit = 10) {
    const { data, isLoading, isFetching, refetch } = useGetPackagePublicReviewsQuery(
        { packageId, page, limit },
        { skip: !packageId }
    );

    return {
        reviews: data?.reviews || [],
        meta: data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0, averageRating: 0 },
        isLoading,
        isFetching,
        refetch,
    };
}

export function usePackageReviews(packageId?: string) {
    const { data, isLoading, refetch } = useGetPackageReviewsQuery(
        packageId ? { packageId } : undefined
    );

    return {
        reviews: data || [],
        isLoading,
        refetch,
    };
}

export function useReviewMutations() {
    const [createReview, { isLoading: isCreating }] =
        useCreatePackageReviewMutation();

    const [updateReview, { isLoading: isUpdating }] =
        useUpdatePackageReviewMutation();

    const [deleteReview, { isLoading: isDeleting }] =
        useDeletePackageReviewMutation();

    return {
        createReview,
        updateReview,
        deleteReview,
        isSubmitting: isCreating || isUpdating || isDeleting,
    };
}