import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { Package } from "@/types/package";

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