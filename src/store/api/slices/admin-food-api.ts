import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type {
  AdminFoodCategory,
  AdminFoodDetail,
  AdminFoodListResponse,
  AdminFoodTag,
  AddonItemPayload,
  AddonPayload,
  AllergenPayload,
  AvailabilityPayload,
  CategoryPayload,
  CreateFoodPayload,
  DietPayload,
  DiscountPayload,
  IngredientPayload,
  LabelPayload,
  NutritionPayload,
  PricePayload,
  SchedulePayload,
  SubCategoryPayload,
  UpdateFoodPayload,
  VariantPayload,
  VisibilityPayload,
} from "@/types/admin-food";

interface FoodQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  categoryId?: string;
  foodType?: string;
  spiceLevel?: string;
  featured?: string;
  popular?: string;
}

export const adminFoodApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ─── Queries ────────────────────────────────────────────
    getAdminFoods: builder.query<AdminFoodListResponse, FoodQueryParams | void>({
      query: (params) => {
        const { page, limit, ...rest } = params ?? {};
        return {
          url: "/admin/foods",
          params: {
            ...(page ? { page } : {}),
            ...(limit ? { limit } : {}),
            ...rest,
          },
        };
      },
      providesTags: ["Food"],
    }),

    getAdminFood: builder.query<AdminFoodDetail, string>({
      query: (id) => `/admin/foods/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Food" as const, id }],
    }),

    getAdminFoodCategories: builder.query<AdminFoodCategory[], void>({
      query: () => "/admin/categories",
      providesTags: ["Category"],
    }),

    getAdminFoodTags: builder.query<AdminFoodTag[], void>({
      query: () => "/admin/tags",
      providesTags: ["Food"],
    }),

    // ─── Food ───────────────────────────────────────────────
    createFood: builder.mutation<AdminFoodDetail, CreateFoodPayload>({
      query: (body) => ({ url: "/admin/foods", method: "POST", body }),
      invalidatesTags: ["Food"],
    }),

    updateFood: builder.mutation<AdminFoodDetail, { id: string; body: UpdateFoodPayload }>({
      query: ({ id, body }) => ({ url: `/admin/foods/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Food" as const, id }, "Food" as const],
    }),

    deleteFood: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/foods/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Category ───────────────────────────────────────────
    createCategory: builder.mutation<AdminFoodCategory, CategoryPayload>({
      query: (body) => ({ url: "/admin/categories", method: "POST", body }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<AdminFoodCategory, { id: string; body: CategoryPayload }>({
      query: ({ id, body }) => ({ url: `/admin/categories/${id}`, method: "PUT", body }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Category"],
    }),

    // ─── SubCategory ────────────────────────────────────────
    createSubCategory: builder.mutation<
      AdminFoodCategory,
      { categoryId: string; body: SubCategoryPayload }
    >({
      query: ({ categoryId, body }) => ({
        url: `/admin/categories/${categoryId}/subcategories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    updateSubCategory: builder.mutation<
      AdminFoodCategory,
      { id: string; body: SubCategoryPayload }
    >({
      query: ({ id, body }) => ({ url: `/admin/subcategories/${id}`, method: "PUT", body }),
      invalidatesTags: ["Category"],
    }),

    deleteSubCategory: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/subcategories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Category"],
    }),

    // ─── Variant ────────────────────────────────────────────
    createVariant: builder.mutation<AdminFoodDetail, { foodId: string; body: VariantPayload }>({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/variants`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    updateVariant: builder.mutation<AdminFoodDetail, { id: string; body: VariantPayload }>({
      query: ({ id, body }) => ({ url: `/admin/variants/${id}`, method: "PUT", body }),
      invalidatesTags: ["Food"],
    }),

    deleteVariant: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/variants/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Addon ──────────────────────────────────────────────
    createAddon: builder.mutation<AdminFoodDetail, { foodId: string; body: AddonPayload }>({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/addons`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    updateAddon: builder.mutation<AdminFoodDetail, { id: string; body: AddonPayload }>({
      query: ({ id, body }) => ({ url: `/admin/addons/${id}`, method: "PUT", body }),
      invalidatesTags: ["Food"],
    }),

    deleteAddon: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/addons/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Addon Item ─────────────────────────────────────────
    createAddonItem: builder.mutation<AdminFoodDetail, { addonId: string; body: AddonItemPayload }>(
      {
        query: ({ addonId, body }) => ({
          url: `/admin/addons/${addonId}/items`,
          method: "POST",
          body,
        }),
        invalidatesTags: ["Food"],
      },
    ),

    updateAddonItem: builder.mutation<
      AdminFoodDetail,
      { id: string; body: AddonItemPayload }
    >({
      query: ({ id, body }) => ({ url: `/admin/addon-items/${id}`, method: "PUT", body }),
      invalidatesTags: ["Food"],
    }),

    deleteAddonItem: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/addon-items/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Nutrition ──────────────────────────────────────────
    updateNutrition: builder.mutation<
      AdminFoodDetail,
      { foodId: string; body: NutritionPayload }
    >({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/nutrition`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    // ─── Ingredient ─────────────────────────────────────────
    createIngredient: builder.mutation<
      AdminFoodDetail,
      { foodId: string; body: IngredientPayload }
    >({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/ingredients`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    deleteIngredient: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/ingredients/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Allergen ───────────────────────────────────────────
    createAllergen: builder.mutation<AdminFoodDetail, { foodId: string; body: AllergenPayload }>({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/allergens`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    deleteAllergen: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/allergens/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Price ──────────────────────────────────────────────
    createPrice: builder.mutation<AdminFoodDetail, { foodId: string; body: PricePayload }>({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/prices`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    deletePrice: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/prices/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Discount ───────────────────────────────────────────
    createDiscount: builder.mutation<AdminFoodDetail, { foodId: string; body: DiscountPayload }>({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/discounts`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    deleteDiscount: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/discounts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Tags ───────────────────────────────────────────────
    addFoodTags: builder.mutation<void, { foodId: string; tagIds: string[] }>({
      query: ({ foodId, tagIds }) => ({
        url: `/admin/foods/${foodId}/tags`,
        method: "POST",
        body: { tagIds },
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    removeFoodTag: builder.mutation<void, { foodId: string; tagId: string }>({
      query: ({ foodId, tagId }) => ({
        url: `/admin/foods/${foodId}/tags/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    createTag: builder.mutation<AdminFoodTag, { name: string; slug: string }>({
      query: (body) => ({ url: "/admin/tags", method: "POST", body }),
      invalidatesTags: ["Food"],
    }),

    // ─── Label ──────────────────────────────────────────────
    createLabel: builder.mutation<AdminFoodDetail, { foodId: string; body: LabelPayload }>({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/labels`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    deleteLabel: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/labels/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Availability ───────────────────────────────────────
    updateAvailability: builder.mutation<
      AdminFoodDetail,
      { foodId: string; body: AvailabilityPayload }
    >({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/availability`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    // ─── Schedule ───────────────────────────────────────────
    createSchedule: builder.mutation<AdminFoodDetail, { foodId: string; body: SchedulePayload }>({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/schedules`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    deleteSchedule: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/schedules/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),

    // ─── Visibility ─────────────────────────────────────────
    updateVisibility: builder.mutation<
      AdminFoodDetail,
      { foodId: string; body: VisibilityPayload }
    >({
      query: ({ foodId, body }) => ({
        url: `/admin/foods/${foodId}/visibility`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    // ─── Food Image ─────────────────────────────────────────
    createFoodImage: builder.mutation<AdminFoodDetail, { foodId: string; image: string }>({
      query: ({ foodId, image }) => ({
        url: `/admin/foods/${foodId}/images`,
        method: "POST",
        body: { image },
      }),
      invalidatesTags: (_r, _e, { foodId }) => [{ type: "Food" as const, id: foodId }],
    }),

    deleteFoodImage: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/food-images/${id}`, method: "DELETE" }),
      invalidatesTags: ["Food"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAdminFoodsQuery,
  useGetAdminFoodQuery,
  useGetAdminFoodCategoriesQuery,
  useGetAdminFoodTagsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useCreateAddonMutation,
  useUpdateAddonMutation,
  useDeleteAddonMutation,
  useCreateAddonItemMutation,
  useUpdateAddonItemMutation,
  useDeleteAddonItemMutation,
  useUpdateNutritionMutation,
  useCreateIngredientMutation,
  useDeleteIngredientMutation,
  useCreateAllergenMutation,
  useDeleteAllergenMutation,
  useCreatePriceMutation,
  useDeletePriceMutation,
  useCreateDiscountMutation,
  useDeleteDiscountMutation,
  useAddFoodTagsMutation,
  useRemoveFoodTagMutation,
  useCreateTagMutation,
  useCreateLabelMutation,
  useDeleteLabelMutation,
  useUpdateAvailabilityMutation,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useUpdateVisibilityMutation,
  useCreateFoodImageMutation,
  useDeleteFoodImageMutation,
} = adminFoodApi;

// ─── Query wrappers ─────────────────────────────────────────

export function useAdminFoods(params?: FoodQueryParams) {
  const { data, isLoading, error } = useGetAdminFoodsQuery(params ?? undefined);
  return { data, isLoading, error };
}

export function useAdminFood(id: string) {
  const { data, isLoading, error } = useGetAdminFoodQuery(id, { skip: !id });
  return { data, isLoading, error };
}

export function useAdminFoodCategories() {
  const { data, isLoading, error } = useGetAdminFoodCategoriesQuery();
  return { data, isLoading, error };
}

export function useAdminFoodTags() {
  const { data, isLoading, error } = useGetAdminFoodTagsQuery();
  return { data, isLoading, error };
}

// ─── Mutation wrappers ──────────────────────────────────────

export function useCreateFood() {
  const [trigger, { isLoading }] = useCreateFoodMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateFood() {
  const [trigger, { isLoading }] = useUpdateFoodMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteFood() {
  const [trigger, { isLoading }] = useDeleteFoodMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateCategory() {
  const [trigger, { isLoading }] = useCreateCategoryMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateCategory() {
  const [trigger, { isLoading }] = useUpdateCategoryMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteCategory() {
  const [trigger, { isLoading }] = useDeleteCategoryMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateSubCategory() {
  const [trigger, { isLoading }] = useCreateSubCategoryMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateSubCategory() {
  const [trigger, { isLoading }] = useUpdateSubCategoryMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteSubCategory() {
  const [trigger, { isLoading }] = useDeleteSubCategoryMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateVariant() {
  const [trigger, { isLoading }] = useCreateVariantMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateVariant() {
  const [trigger, { isLoading }] = useUpdateVariantMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteVariant() {
  const [trigger, { isLoading }] = useDeleteVariantMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateAddon() {
  const [trigger, { isLoading }] = useCreateAddonMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateAddon() {
  const [trigger, { isLoading }] = useUpdateAddonMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteAddon() {
  const [trigger, { isLoading }] = useDeleteAddonMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateAddonItem() {
  const [trigger, { isLoading }] = useCreateAddonItemMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateAddonItem() {
  const [trigger, { isLoading }] = useUpdateAddonItemMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteAddonItem() {
  const [trigger, { isLoading }] = useDeleteAddonItemMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateNutrition() {
  const [trigger, { isLoading }] = useUpdateNutritionMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateIngredient() {
  const [trigger, { isLoading }] = useCreateIngredientMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteIngredient() {
  const [trigger, { isLoading }] = useDeleteIngredientMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateAllergen() {
  const [trigger, { isLoading }] = useCreateAllergenMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteAllergen() {
  const [trigger, { isLoading }] = useDeleteAllergenMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreatePrice() {
  const [trigger, { isLoading }] = useCreatePriceMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeletePrice() {
  const [trigger, { isLoading }] = useDeletePriceMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateDiscount() {
  const [trigger, { isLoading }] = useCreateDiscountMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteDiscount() {
  const [trigger, { isLoading }] = useDeleteDiscountMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useAddFoodTags() {
  const [trigger, { isLoading }] = useAddFoodTagsMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRemoveFoodTag() {
  const [trigger, { isLoading }] = useRemoveFoodTagMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateTag() {
  const [trigger, { isLoading }] = useCreateTagMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateLabel() {
  const [trigger, { isLoading }] = useCreateLabelMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteLabel() {
  const [trigger, { isLoading }] = useDeleteLabelMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateAvailability() {
  const [trigger, { isLoading }] = useUpdateAvailabilityMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateSchedule() {
  const [trigger, { isLoading }] = useCreateScheduleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteSchedule() {
  const [trigger, { isLoading }] = useDeleteScheduleMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateVisibility() {
  const [trigger, { isLoading }] = useUpdateVisibilityMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateFoodImage() {
  const [trigger, { isLoading }] = useCreateFoodImageMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteFoodImage() {
  const [trigger, { isLoading }] = useDeleteFoodImageMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

// Re-export diet payload type for form usage
export type { DietPayload };
