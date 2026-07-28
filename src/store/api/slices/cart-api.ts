import { api } from "../base-api";
import { getErrorMessage } from "../utils";
import type { Cart, CartItem } from "@/types/cart";
import { toast } from "sonner";

interface AddToCartPayload {
  foodId: string;
  quantity: number;
  unitPrice: number;
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
    food: { id: payload.foodId, name: "", thumbnail: null },
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
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const existing = draft.items.find((i) => i.foodId === arg.foodId);
            if (existing) {
              existing.quantity += arg.quantity;
              existing.totalPrice = existing.quantity * existing.unitPrice;
            } else {
              draft.items.unshift(createTempItem(arg));
            }
            if (draft.summary) {
              draft.summary.subtotal = draft.items.reduce((s, i) => s + i.totalPrice, 0);
            }
          }),
        );
        try {
          await queryFulfilled;
          toast.success("Added to cart");
        } catch (err) {
          patch.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),

    removeFromCart: builder.mutation<Cart, string>({
      query: (id) => ({ url: `/cart/items/${id}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const idx = draft.items.findIndex((i) => i.id === id);
            if (idx !== -1) draft.items.splice(idx, 1);
          }),
        );
        try {
          await queryFulfilled;
          toast.success("Item removed");
        } catch (err) {
          patch.undo();
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
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.items.find((i) => i.id === itemId);
            if (item) {
              item.quantity = quantity;
              item.totalPrice = quantity * item.unitPrice;
            }
          }),
        );
        try {
          await queryFulfilled;
          toast.success("Quantity updated");
        } catch (err) {
          patch.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({ url: "/cart", method: "DELETE" }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            draft.items = [];
            if (draft.summary) {
              draft.summary.subtotal = 0;
            }
          }),
        );
        try {
          await queryFulfilled;
          toast.success("Cart cleared");
        } catch (err) {
          patch.undo();
          toast.error(getErrorMessage(err));
        }
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
