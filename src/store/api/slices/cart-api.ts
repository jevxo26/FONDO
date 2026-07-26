import { api } from "../base-api";
import { getErrorMessage } from "../utils";
import type { Cart } from "@/types/cart";
import { toast } from "sonner";

interface AddToCartPayload { foodId: string; quantity: number; unitPrice: number }
interface UpdateCartItemPayload { itemId: string; quantity: number }

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<Cart, AddToCartPayload>({
      query: (body) => ({ url: "/cart/items", method: "POST", body }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { queryFulfilled }) {
        try { await queryFulfilled; toast.success("Added to cart") }
        catch (err) { toast.error(getErrorMessage(err)) }
      },
    }),

    removeFromCart: builder.mutation<Cart, string>({
      query: (id) => ({ url: `/cart/items/${id}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { queryFulfilled }) {
        try { await queryFulfilled; toast.success("Item removed") }
        catch (err) { toast.error(getErrorMessage(err)) }
      },
    }),

    updateCartItem: builder.mutation<Cart, UpdateCartItemPayload>({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { queryFulfilled }) {
        try { await queryFulfilled; toast.success("Quantity updated") }
        catch (err) { toast.error(getErrorMessage(err)) }
      },
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({ url: "/cart", method: "DELETE" }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { queryFulfilled }) {
        try { await queryFulfilled; toast.success("Cart cleared") }
        catch (err) { toast.error(getErrorMessage(err)) }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useClearCartMutation,
} = cartApi;
