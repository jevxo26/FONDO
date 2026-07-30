import { api } from "../base-api";

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