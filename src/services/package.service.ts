"use client";

import {

  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetPackageByIdQuery,
  useGetPackagesQuery,
  useUpdatePackageMutation,

} from "@/store/api/slices/packages-api";

export function useGetPackages(params?: string) {
  const { data, isLoading, error } = useGetPackagesQuery(params);
  return { data, isLoading, error };
}

export function useGetPackage(id: string) {

  const { data, isLoading, error } = useGetPackageByIdQuery(id, {
    skip: !id,
  });

  return { data, isLoading, error };

}

export function useCreatePackage() {

  const [createPackage, result] = useCreatePackageMutation();

  return {

    createPackage,

    ...result,

  };

}

export function useUpdatePackage() {

  const [updatePackage, result] = useUpdatePackageMutation();

  return {

    updatePackage,

    ...result,

  };

}
export function useDeletePackage() {

  const [deletePackage, result] = useDeletePackageMutation();

  return {

    deletePackage,

    ...result,

  };

}