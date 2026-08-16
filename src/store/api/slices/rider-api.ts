import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";

/* ============================================================
   RIDER DOMAIN TYPES
   ============================================================ */

export type RiderStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type VerificationStatus = "UNVERIFIED" | "PENDING" | "VERIFIED";
export type VehicleType = "BIKE" | "SCOOTER" | "BICYCLE" | "CAR" | "VAN";
export type DocumentType = "NID_FRONT" | "NID_BACK" | "LICENSE_FRONT" | "LICENSE_BACK";
export type PayoutMethod = "BKASH" | "NAGAD" | "ROCKET" | "BANK";

export interface RiderVehicle {
    id: string;
    riderId: string;
    vehicleType: VehicleType;
    drivingLicenseNo?: string | null;
    vehicleRegNumber?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface RiderPayout {
    id: string;
    riderId: string;
    payoutMethod: PayoutMethod;
    mobileWalletNumber: string;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface RiderDocument {
    id: string;
    riderId: string;
    documentType: DocumentType;
    fileUrl: string;
    status: VerificationStatus;
    verifiedBy?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface RiderWallet {
    id: string;
    riderId: string;
    currentBalance: number;
    pendingBalance: number;
    createdAt: string;
    updatedAt: string;
}

export interface RiderSettings {
    id: string;
    riderId: string;
    autoAcceptOrders: boolean;
    pushNotifications: boolean;
    locationTracking: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Rider {
    id: string;
    riderCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string | null;
    nidNumber: string;
    dob: string;
    status: RiderStatus;
    isActive: boolean;
    isOnline: boolean;
    division: string;
    district: string;
    upazilaOrThana: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelation: string;
    workZoneDivision: string;
    workZoneDistrict: string;
    workZone: string;
    termsAccepted: boolean;
    safetyCodeAccepted: boolean;
    backgroundCheckAccepted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    userId: string;
    vehicle?: RiderVehicle | null;
    payout?: RiderPayout | null;
    documents?: RiderDocument[];
    wallet?: RiderWallet | null;
    settings?: RiderSettings | null;
}

export interface DocumentItemInput {
    documentType: DocumentType;
    fileUrl: string;
}

export interface CreateRiderPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    nidNumber: string;
    dob: string;
    avatar?: string;
    division: string;
    district: string;
    upazilaOrThana: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelation: string;
    workZoneDivision: string;
    workZoneDistrict: string;
    workZone: string;
    vehicleType: VehicleType;
    drivingLicenseNo?: string;
    vehicleRegNumber?: string;
    payoutMethod: PayoutMethod;
    mobileWalletNumber: string;
    bankName?: string;
    bankAccountNumber?: string;
    termsAccepted: boolean;
    safetyCodeAccepted: boolean;
    backgroundCheckAccepted: boolean;
    documents?: DocumentItemInput[];
}

export interface UpdateRiderPayload {
    riderCode: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    emergencyName?: string;
    emergencyPhone?: string;
    emergencyRelation?: string;
    workZoneDivision?: string;
    workZoneDistrict?: string;
    workZone?: string;
    status?: RiderStatus;
    isActive?: boolean;
}

export interface UploadDocumentPayload {
    riderCode: string;
    documentType: DocumentType;
    fileUrl: string;
}

export interface VerifyRiderDocumentPayload {
    docId: string;
    riderCode: string;
    status: VerificationStatus;
}

export interface ToggleDutyStatusPayload {
    riderCode: string;
    isOnline: boolean;
}

export interface UpdateRiderSettingsPayload {
    riderCode: string;
    autoAcceptOrders?: boolean;
    pushNotifications?: boolean;
    locationTracking?: boolean;
}

export interface PayoutLogRecord {
    id: string;
    riderId: string;
    amount: number;
    payoutMethod: PayoutMethod;
    status: "PENDING" | "PROCESSED" | "FAILED";
    createdAt: string;
}

export interface RiderFilterParams {
    status?: RiderStatus;
    verificationStatus?: VerificationStatus;
    isActive?: boolean;
    workZoneDistrict?: string;
    vehicleType?: VehicleType;
}

/* ============================================================
   RIDER API SLICE INJECTION
   ============================================================ */

export const riderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // --- QUERIES ---
        getMyRiderProfile: builder.query<Rider, void>({
            query: () => "/rider/my-profile",
            providesTags: ["Rider"],
        }),

        listRiders: builder.query<Rider[], RiderFilterParams | void>({
            query: (params) => ({
                url: "/rider/all",
                params: params || undefined,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ riderCode }) => ({
                            type: "Rider" as const,
                            id: riderCode,
                        })),
                        { type: "Rider" as const, id: "LIST" },
                    ]
                    : [{ type: "Rider" as const, id: "LIST" }],
        }),

        getRiderByCode: builder.query<Rider, string>({
            query: (riderCode) => `/rider/${riderCode}`,
            providesTags: (_r, _e, riderCode) => [{ type: "Rider" as const, id: riderCode }],
        }),

        getRiderWallet: builder.query<RiderWallet, string>({
            query: (riderCode) => `/rider/${riderCode}/wallet`,
            providesTags: (_r, _e, riderCode) => [{ type: "Rider" as const, id: `${riderCode}-wallet` }],
        }),

        getPayoutHistory: builder.query<PayoutLogRecord[], string>({
            query: (riderCode) => `/rider/${riderCode}/payouts`,
            providesTags: (_r, _e, riderCode) => [{ type: "Rider" as const, id: `${riderCode}-payouts` }],
        }),

        // --- MUTATIONS ---
        createRider: builder.mutation<Rider, CreateRiderPayload>({
            query: (body) => ({ url: "/rider/apply", method: "POST", body }),
            invalidatesTags: [{ type: "Rider", id: "LIST" }],
        }),

        updateRider: builder.mutation<Rider, UpdateRiderPayload>({
            query: ({ riderCode, ...body }) => ({
                url: `/rider/${riderCode}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (_r, _e, { riderCode }) => [
                { type: "Rider" as const, id: riderCode },
                { type: "Rider" as const, id: "LIST" },
            ],
        }),

        deleteRider: builder.mutation<void, string>({
            query: (riderCode) => ({ url: `/rider/${riderCode}`, method: "DELETE" }),
            invalidatesTags: (_r, _e, riderCode) => [
                { type: "Rider" as const, id: riderCode },
                { type: "Rider" as const, id: "LIST" },
            ],
        }),

        uploadDocument: builder.mutation<RiderDocument, UploadDocumentPayload>({
            query: ({ riderCode, ...body }) => ({
                url: `/rider/${riderCode}/documents`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_r, _e, { riderCode }) => [{ type: "Rider" as const, id: riderCode }],
        }),

        verifyDocument: builder.mutation<RiderDocument, VerifyRiderDocumentPayload>({
            query: ({ docId, status }) => ({
                url: `/rider/documents/${docId}/verify`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (_r, _e, { riderCode }) => [{ type: "Rider" as const, id: riderCode }],
        }),

        toggleDutyStatus: builder.mutation<Rider, ToggleDutyStatusPayload>({
            query: ({ riderCode, isOnline }) => ({
                url: `/rider/${riderCode}/duty-status`,
                method: "PATCH",
                body: { isOnline },
            }),
            invalidatesTags: (_r, _e, { riderCode }) => [
                { type: "Rider" as const, id: riderCode },
                "Rider",
            ],
        }),

        updateRiderSettings: builder.mutation<RiderSettings, UpdateRiderSettingsPayload>({
            query: ({ riderCode, ...body }) => ({
                url: `/rider/${riderCode}/settings`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (_r, _e, { riderCode }) => [{ type: "Rider" as const, id: riderCode }],
        }),
    }),
    overrideExisting: true,
});

/* ============================================================
   AUTO-GENERATED HOOKS
   ============================================================ */

export const {
    useGetMyRiderProfileQuery,
    useListRidersQuery,
    useGetRiderByCodeQuery,
    useGetRiderWalletQuery,
    useGetPayoutHistoryQuery,
    useCreateRiderMutation,
    useUpdateRiderMutation,
    useDeleteRiderMutation,
    useUploadDocumentMutation,
    useVerifyDocumentMutation,
    useToggleDutyStatusMutation,
    useUpdateRiderSettingsMutation,
} = riderApi;

/* ============================================================
   WRAPPED MUTATION HOOKS — { mutate, mutateAsync, isPending }
   ============================================================ */

export function useCreateRider() {
    const [trigger, { isLoading }] = useCreateRiderMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateRider() {
    const [trigger, { isLoading }] = useUpdateRiderMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteRider() {
    const [trigger, { isLoading }] = useDeleteRiderMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUploadDocument() {
    const [trigger, { isLoading }] = useUploadDocumentMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useVerifyDocument() {
    const [trigger, { isLoading }] = useVerifyDocumentMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useToggleDutyStatus() {
    const [trigger, { isLoading }] = useToggleDutyStatusMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateRiderSettings() {
    const [trigger, { isLoading }] = useUpdateRiderSettingsMutation();
    return { ...createMutationWrapper(trigger), isPending: isLoading };
}