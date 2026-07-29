import { api } from "../base-api";
import { getErrorMessage } from "../utils";
import type { Cart, CartItem } from "@/types/cart";
import { toast } from "sonner";

interface AddToCartPayload {
  foodId: string;
  quantity: number;
  unitPrice: number;
  name?: string;
  thumbnail?: string | null;
}
interface UpdateCartItemPayload {
  itemId: string;
  quantity: number;
}

function createTempItem(payload: AddToCartPayload): CartItem {
  return {
    id: `temp-${Date.now()}`,
    foodId: payload.foodId,
    quantity: payload.quantity,
    unitPrice: payload.unitPrice,
    totalPrice: payload.quantity * payload.unitPrice,
    food: { id: payload.foodId, name: payload.name ?? "", thumbnail: payload.thumbnail ?? null },
  };
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<Cart, AddToCartPayload>({
      query: (body) => ({ url: "/cart/items", method: "POST", body }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        let patch: { undo: () => void } | undefined;
        try {
          patch = dispatch(
            cartApi.util.updateQueryData("getCart", undefined, (draft) => {
              const existing = draft.items.find((i) => i.foodId === arg.foodId);
              if (existing) {
                existing.quantity += arg.quantity;
                existing.totalPrice = existing.quantity * existing.unitPrice;
              } else {
                draft.items.unshift(createTempItem(arg));
              }
              draft.subtotal = draft.items.reduce((s, i) => s + i.totalPrice, 0);
              draft.grandTotal = draft.subtotal - draft.discount + draft.deliveryCharge + draft.vat;
            }),
          );
        } catch { /* no cache entry yet — skip optimistic update */ }
        toast.success("Added to cart");
        try {
          await queryFulfilled;
        } catch (err) {
          patch?.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),

    removeFromCart: builder.mutation<Cart, string>({
      query: (id) => ({ url: `/cart/items/${id}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        let patch: { undo: () => void } | undefined;
        try {
          patch = dispatch(
            cartApi.util.updateQueryData("getCart", undefined, (draft) => {
              draft.items = draft.items.filter((i) => i.id !== id);
              draft.subtotal = draft.items.reduce((s, i) => s + i.totalPrice, 0);
              draft.grandTotal = draft.subtotal - draft.discount + draft.deliveryCharge + draft.vat;
            }),
          );
        } catch { /* skip */ }
        toast.success("Item removed");
        try {
          await queryFulfilled;
        } catch (err) {
          patch?.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),

    updateCartItem: builder.mutation<Cart, UpdateCartItemPayload>({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted({ itemId, quantity }, { dispatch, queryFulfilled }) {
        let patch: { undo: () => void } | undefined;
        try {
          patch = dispatch(
            cartApi.util.updateQueryData("getCart", undefined, (draft) => {
              const item = draft.items.find((i) => i.id === itemId);
              if (item) {
                item.quantity = quantity;
                item.totalPrice = quantity * item.unitPrice;
              }
              draft.subtotal = draft.items.reduce((s, i) => s + i.totalPrice, 0);
              draft.grandTotal = draft.subtotal - draft.discount + draft.deliveryCharge + draft.vat;
            }),
          );
        } catch { /* skip */ }
        toast.success("Quantity updated");
        try {
          await queryFulfilled;
        } catch (err) {
          patch?.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({ url: "/cart", method: "DELETE" }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        let patch: { undo: () => void } | undefined;
        try {
          patch = dispatch(
            cartApi.util.updateQueryData("getCart", undefined, (draft) => {
              draft.items = [];
              draft.subtotal = 0;
              draft.grandTotal = -draft.discount + draft.deliveryCharge + draft.vat;
            }),
          );
        } catch { /* skip */ }
        toast.success("Cart cleared");
        try {
          await queryFulfilled;
        } catch (err) {
          patch?.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useClearCartMutation,
} = cartApi;
