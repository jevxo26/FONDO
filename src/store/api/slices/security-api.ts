import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { LoginHistoryEntry, UserDevice } from "@/types/security";

export interface RegisterDevicePayload {
  deviceId: string;
  deviceName?: string;
  deviceType: "mobile" | "tablet" | "desktop";
  operatingSystem?: string;
  osVersion?: string;
  appVersion?: string;
  browser?: string;
  pushToken: string;
  ipAddress?: string;
}

export const securityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDevices: builder.query<UserDevice[], void>({
      query: () => "/users/me/devices",
      providesTags: ["Device"],
    }),

    registerDevice: builder.mutation<UserDevice, RegisterDevicePayload>({
      query: (body) => ({ url: "/users/me/devices", method: "POST", body }),
      invalidatesTags: ["Device"],
    }),

    unregisterDevice: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/me/devices/${id}`, method: "DELETE" }),
      invalidatesTags: ["Device"],
    }),

    getLoginHistory: builder.query<LoginHistoryEntry[], void>({
      query: () => "/users/me/login-history",
      providesTags: ["Device"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDevicesQuery,
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
  useGetLoginHistoryQuery,
} = securityApi;

export const useDevices = () => {
  const { data, isLoading, error } = useGetDevicesQuery();
  return { data: data ?? [], isLoading, error };
};

export const useLoginHistory = () => {
  const { data, isLoading, error } = useGetLoginHistoryQuery();
  return { data: data ?? [], isLoading, error };
};

export function useRegisterDevice() {
  const [trigger, { isLoading }] = useRegisterDeviceMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUnregisterDevice() {
  const [trigger, { isLoading }] = useUnregisterDeviceMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
