import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { User } from "@/types/auth";

export interface UpdateUserPayload {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  role?: string;
  status?: string;
  avatar?: string | null;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_r, _e, id) => [{ type: "User" as const, id }],
    }),

    createUser: builder.mutation<User, CreateUserPayload>({
      query: (body) => ({ url: "/users", method: "POST", body }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<User, UpdateUserPayload>({
      query: ({ id, ...body }) => ({ url: `/users/${id}`, method: "PATCH", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "User" as const, id }],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;

export function useCreateUser() {
  const [trigger, { isLoading }] = useCreateUserMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateUser() {
  const [trigger, { isLoading }] = useUpdateUserMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteUser() {
  const [trigger, { isLoading }] = useDeleteUserMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
