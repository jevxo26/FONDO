import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { PermissionsByModule, RbacRole, UserRoleAssignment } from "@/types/rbac";

interface CreateRolePayload {
  name: string;
  slug: string;
  description?: string;
  status?: string;
}

interface UpdateRolePayload {
  id: string;
  name?: string;
  slug?: string;
  description?: string | null;
  status?: string;
}

interface AssignPermissionsPayload {
  id: string;
  permissionSlugs: string[];
}

interface AssignRolePayload {
  userId: string;
  roleId: string;
}

interface RemoveRolePayload {
  userId: string;
  roleId: string;
}

export const rbacApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // --- QUERIES ---
    listRoles: builder.query<RbacRole[], void>({
      query: () => "/admin/roles",
      providesTags: ["Role"],
    }),

    getRole: builder.query<RbacRole, string>({
      query: (id) => `/admin/roles/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Role" as const, id }],
    }),

    listPermissions: builder.query<PermissionsByModule, void>({
      query: () => "/admin/permissions",
      providesTags: ["Permission"],
    }),

    getUserRoles: builder.query<UserRoleAssignment[], string>({
      query: (userId) => `/admin/users/${userId}/roles`,
      providesTags: ["Role"],
    }),

    // --- MUTATIONS ---
    createRole: builder.mutation<RbacRole, CreateRolePayload>({
      query: (body) => ({ url: "/admin/roles", method: "POST", body }),
      invalidatesTags: ["Role"],
    }),

    updateRole: builder.mutation<RbacRole, UpdateRolePayload>({
      query: ({ id, ...body }) => ({ url: `/admin/roles/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Role" as const, id }],
    }),

    deleteRole: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/roles/${id}`, method: "DELETE" }),
      invalidatesTags: ["Role"],
    }),

    assignPermissions: builder.mutation<RbacRole, AssignPermissionsPayload>({
      query: ({ id, permissionSlugs }) => ({
        url: `/admin/roles/${id}/permissions`,
        method: "PUT",
        body: { permissionSlugs },
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Role" as const, id }],
    }),

    assignRoleToUser: builder.mutation<UserRoleAssignment, AssignRolePayload>({
      query: ({ userId, roleId }) => ({
        url: `/admin/users/${userId}/roles`,
        method: "POST",
        body: { roleId },
      }),
      invalidatesTags: ["Role"],
    }),

    removeRoleFromUser: builder.mutation<void, RemoveRolePayload>({
      query: ({ userId, roleId }) => ({
        url: `/admin/users/${userId}/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListRolesQuery,
  useGetRoleQuery,
  useListPermissionsQuery,
  useGetUserRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignPermissionsMutation,
  useAssignRoleToUserMutation,
  useRemoveRoleFromUserMutation,
} = rbacApi;

export function useCreateRole() {
  const [trigger, { isLoading }] = useCreateRoleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateRole() {
  const [trigger, { isLoading }] = useUpdateRoleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteRole() {
  const [trigger, { isLoading }] = useDeleteRoleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useAssignPermissions() {
  const [trigger, { isLoading }] = useAssignPermissionsMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useAssignRoleToUser() {
  const [trigger, { isLoading }] = useAssignRoleToUserMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRemoveRoleFromUser() {
  const [trigger, { isLoading }] = useRemoveRoleFromUserMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
