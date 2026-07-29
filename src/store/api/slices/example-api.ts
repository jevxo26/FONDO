import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";

/* ============================================================
   EXAMPLE — Copy this file to slices/{domain}-api.ts and:
   1. Replace "Example" with your domain name
   2. Replace payload types below
   3. Replace endpoint paths with real routes
   4. Add tag to src/store/api/tags.ts if new domain
   ============================================================ */

interface Item {
  id: string;
  name: string;
}
interface CreatePayload {
  name: string;
}
interface UpdatePayload {
  id: string;
  name: string;
}

export const exampleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // --- QUERIES ---
    listExamples: builder.query<Item[], void>({
      query: () => "/examples",
      providesTags: ["Example"],
    }),

    getExample: builder.query<Item, string>({
      query: (id) => `/examples/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Example" as const, id }],
    }),

    // --- MUTATIONS ---
    createExample: builder.mutation<Item, CreatePayload>({
      query: (body) => ({ url: "/examples", method: "POST", body }),
      invalidatesTags: ["Example"],
    }),

    updateExample: builder.mutation<Item, UpdatePayload>({
      query: ({ id, ...body }) => ({ url: `/examples/${id}`, method: "PATCH", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Example" as const, id }],
    }),

    deleteExample: builder.mutation<void, string>({
      query: (id) => ({ url: `/examples/${id}`, method: "DELETE" }),
      invalidatesTags: ["Example"],
    }),
  }),
  overrideExisting: true,
});

// RTK Query auto-generated hooks
export const {
  useListExamplesQuery,
  useGetExampleQuery,
  useCreateExampleMutation,
  useUpdateExampleMutation,
  useDeleteExampleMutation,
} = exampleApi;

// Wrapped mutation hooks — { mutate, mutateAsync, isPending }
// Write 3 lines for each mutation:
export function useCreateExample() {
  const [trigger, { isLoading }] = useCreateExampleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateExample() {
  const [trigger, { isLoading }] = useUpdateExampleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteExample() {
  const [trigger, { isLoading }] = useDeleteExampleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
