import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";

export const packagesApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getPackages: builder.query({
            query: (params) => ({
                url: "/package",
                params,
            }),
            providesTags: ["Package"],
        }),

        getPackageById: builder.query({
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

    }),
});

export const {

    useGetPackagesQuery,
    useGetPackageByIdQuery,
    useGetPackageCategoriesQuery,
    useCreatePackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,

} = packagesApi;

// Query wrappers
export function useGetPackageCategories() {
    const { data, isLoading, error } = useGetPackageCategoriesQuery();
    return { data, isLoading, error };
}

export function useGetPackages(params?: string) {
    const { data, isLoading, error } = useGetPackagesQuery(params);
    return { data, isLoading, error };
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