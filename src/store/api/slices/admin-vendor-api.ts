import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";

/* ============================================================
   VENDOR DOMAIN TYPES
   ============================================================ */

export type CommissionType = "PERCENTAGE" | "FLAT";
export type VendorStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type VerificationStatus = "UNVERIFIED" | "PENDING" | "VERIFIED";

export interface Vendor {
    id: string;
    vendorCode: string;
    businessName: string;
    ownerName: string;
    phone: string;
    email: string;
    tradeLicenseNumber?: string | null;
    tinNumber?: string | null;
    binNumber?: string | null;
    logo?: string | null;
    coverImage?: string | null;
    description?: string | null;
    status: VendorStatus;
    verificationStatus: VerificationStatus;
    isActive: boolean;
    isOnline: boolean;
    commissionType: CommissionType;
    commissionValue: string;
    openingTime: string;
    closingTime: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    profile?: Record<string, unknown> | null;
    _count?: {
        branches: number;
    };
}

export interface CreateVendorPayload {
    businessName: string;
    ownerName: string;
    phone: string;
    email: string;
    openingTime?: string;
    closingTime?: string;
    commissionType?: CommissionType;
    commissionValue?: number;
}

export interface UpdateVendorPayload {
    vendorCode: string;
    businessName?: string;
    ownerName?: string;
    phone?: string;
    status?: VendorStatus;
    verificationStatus?: VerificationStatus;
    isActive?: boolean;
    commissionType?: CommissionType;
    commissionValue?: number;
}

export interface UpsertProfilePayload {
    vendorCode: string;
    profile: Record<string, unknown>;
}

export interface SetOperatingHoursPayload {
    vendorCode: string;
    openingTime: string;
    closingTime: string;
}

export interface VerifyDocumentPayload {
    docId: string;
    vendorCode: string;
    isVerified: boolean;
}

export interface VendorWallet {
    vendorCode: string;
    balance: number;
    pendingSettlements: number;
    currency: string;
}

export interface SettlementRecord {
    id: string;
    vendorCode: string;
    amount: number;
    status: "PENDING" | "PAID" | "FAILED";
    periodStart: string;
    periodEnd: string;
    createdAt: string;
}

export interface TriggerSettlementPayload {
    vendorCode: string;
    periodStart: string;
    periodEnd: string;
}

/* ============================================================
   VENDOR API SLICE INJECTION
   ============================================================ */

export const vendorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // --- QUERIES ---
        getMyVendorProfile: builder.query<Vendor, void>({
            query: () => "/vendors/my-profile",
            providesTags: ["Vendor"],
        }),

        listVendors: builder.query<Vendor[], void>({
            query: () => "/vendor/all",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ vendorCode }) => ({
                            type: "Vendor" as const,
                            id: vendorCode,
                        })),
                        { type: "Vendor" as const, id: "LIST" },
                    ]
                    : [{ type: "Vendor" as const, id: "LIST" }],
        }),

        getVendorByCode: builder.query<Vendor, string>({
            query: (vendorCode) => `/vendors/${vendorCode}`,
            providesTags: (_r, _e, vendorCode) => [{ type: "Vendor" as const, id: vendorCode }],
        }),

        getVendorBranches: builder.query<unknown[], string>({
            query: (vendorCode) => `/vendors/${vendorCode}/branches`,
            providesTags: (_r, _e, vendorCode) => [{ type: "Vendor" as const, id: `${vendorCode}-branches` }],
        }),

        getVendorWallet: builder.query<VendorWallet, string>({
            query: (vendorCode) => `/vendors/${vendorCode}/wallet`,
            providesTags: (_r, _e, vendorCode) => [{ type: "Vendor" as const, id: `${vendorCode}-wallet` }],
        }),

        getSettlementHistory: builder.query<SettlementRecord[], string>({
            query: (vendorCode) => `/vendors/${vendorCode}/settlements`,
            providesTags: (_r, _e, vendorCode) => [{ type: "Vendor" as const, id: `${vendorCode}-settlements` }],
        }),

        // --- MUTATIONS ---
        createVendor: builder.mutation<Vendor, CreateVendorPayload>({
            query: (body) => ({ url: "/vendors/add", method: "POST", body }),
            invalidatesTags: [{ type: "Vendor", id: "LIST" }],
        }),

        updateVendor: builder.mutation<Vendor, UpdateVendorPayload>({
            query: ({ vendorCode, ...body }) => ({
                url: `/vendors/${vendorCode}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (_r, _e, { vendorCode }) => [
                { type: "Vendor" as const, id: vendorCode },
                { type: "Vendor" as const, id: "LIST" },
            ],
        }),

        deleteVendor: builder.mutation<void, string>({
            query: (vendorCode) => ({ url: `/vendors/${vendorCode}`, method: "DELETE" }),
            invalidatesTags: (_r, _e, vendorCode) => [
                { type: "Vendor" as const, id: vendorCode },
                { type: "Vendor" as const, id: "LIST" },
            ],
        }),

        upsertVendorProfile: builder.mutation<void, UpsertProfilePayload>({
            query: ({ vendorCode, profile }) => ({
                url: `/vendors/${vendorCode}/profile`,
                method: "PUT",
                body: profile,
            }),
            invalidatesTags: (_r, _e, { vendorCode }) => [{ type: "Vendor" as const, id: vendorCode }],
        }),

        setOperatingHours: builder.mutation<void, SetOperatingHoursPayload>({
            query: ({ vendorCode, ...hours }) => ({
                url: `/vendors/${vendorCode}/operating-hours`,
                method: "PUT",
                body: hours,
            }),
            invalidatesTags: (_r, _e, { vendorCode }) => [{ type: "Vendor" as const, id: vendorCode }],
        }),

        verifyDocument: builder.mutation<void, VerifyDocumentPayload>({
            query: ({ docId, isVerified }) => ({
                url: `/vendors/documents/${docId}/verify`,
                method: "PATCH",
                body: { isVerified },
            }),
            invalidatesTags: (_r, _e, { vendorCode }) => [{ type: "Vendor" as const, id: vendorCode }],
        }),

        triggerSettlement: builder.mutation<SettlementRecord, TriggerSettlementPayload>({
            query: ({ vendorCode, ...body }) => ({
                url: `/vendors/${vendorCode}/settlements/trigger`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_r, _e, { vendorCode }) => [
                { type: "Vendor" as const, id: `${vendorCode}-wallet` },
                { type: "Vendor" as const, id: `${vendorCode}-settlements` },
            ],
        }),
    }),
    overrideExisting: true,
});

/* ============================================================
   AUTO-GENERATED HOOKS
   ============================================================ */

export const {
    useGetMyVendorProfileQuery,
    useListVendorsQuery,
    useGetVendorByCodeQuery,
    useGetVendorBranchesQuery,
    useGetVendorWalletQuery,
    useGetSettlementHistoryQuery,
    useCreateVendorMutation,
    useUpdateVendorMutation,
    useDeleteVendorMutation,
    useUpsertVendorProfileMutation,
    useSetOperatingHoursMutation,
    useVerifyDocumentMutation,
    useTriggerSettlementMutation,
} = vendorApi;

/* ============================================================
   WRAPPED MUTATION HOOKS — { mutate, mutateAsync, isPending }
   ============================================================ */

export function useCreateVendor() {
    const [trigger, { isLoading }] = useCreateVendorMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateVendor() {
    const [trigger, { isLoading }] = useUpdateVendorMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteVendor() {
    const [trigger, { isLoading }] = useDeleteVendorMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpsertVendorProfile() {
    const [trigger, { isLoading }] = useUpsertVendorProfileMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useSetOperatingHours() {
    const [trigger, { isLoading }] = useSetOperatingHoursMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useVerifyDocument() {
    const [trigger, { isLoading }] = useVerifyDocumentMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useTriggerSettlement() {
    const [trigger, { isLoading }] = useTriggerSettlementMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}