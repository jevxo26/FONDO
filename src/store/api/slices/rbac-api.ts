import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type {
  ModulePermission,
  ToggleModulePayload,
  UserPermissionOverride,
} from "@/types/rbac";

export const rbacApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // --- QUERIES ---
    listPermissionModules: builder.query<ModulePermission[], string>({
      query: (userId) => ({
        url: "/admin/permissions",
        params: { userId },
      }),
      providesTags: ["Permission"],
    }),

    // --- MUTATIONS ---
    toggleUserModule: builder.mutation<UserPermissionOverride, { userId: string } & ToggleModulePayload>({
      query: ({ userId, module, enabled }) => ({
        url: `/admin/users/${userId}/permissions`,
        method: "POST",
        body: { module, enabled },
      }),
      invalidatesTags: ["Permission"],
    }),
  }),
  overrideExisting: true,
});

export const { useListPermissionModulesQuery, useToggleUserModuleMutation } = rbacApi;

export function useToggleUserModule() {
  const [trigger, { isLoading }] = useToggleUserModuleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
