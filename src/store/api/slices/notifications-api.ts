import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { NotificationSettings } from "@/types/notification";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationSettings: builder.query<NotificationSettings, void>({
      query: () => "/users/me/notification-settings",
      providesTags: ["Notification"],
    }),

    updateNotificationSettings: builder.mutation<NotificationSettings, Partial<NotificationSettings>>({
      query: (body) => ({
        url: "/users/me/notification-settings",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = notificationsApi;

export const useNotificationSettings = () => {
  const { data, isLoading, error } = useGetNotificationSettingsQuery();
  return { data, isLoading, error };
};

export function useUpdateNotificationSettings() {
  const [trigger, { isLoading }] = useUpdateNotificationSettingsMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
