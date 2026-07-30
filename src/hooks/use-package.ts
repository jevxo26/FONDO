import { useGetPackageCategoriesQuery } from "@/store/api/slices/packages-api";

export function useGetPackageCategories() {
    const { data, isLoading, error } = useGetPackageCategoriesQuery(10);
    return {
        data,
        isLoading,
        error,
    };

}