import { api } from "../base-api";

export interface DocumentItem {
    type: "NID_FRONT" | "NID_BACK" | "LICENSE_FRONT" | "LICENSE_BACK";
    url: string;
}

export interface RiderApplicationPayload {
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

    vehicleType: string;

    drivingLicenseNo?: string | null;
    vehicleRegNumber?: string | null;

    payoutMethod: string;
    mobileWalletNumber: string;

    bankName?: string | null;
    bankAccountNumber?: string | null;

    termsAccepted: boolean;
    safetyCodeAccepted: boolean;
    backgroundCheckAccepted: boolean;

    documents: DocumentItem[];
}

export interface Rider {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
}

export const riderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        applyRider: builder.mutation<Rider, RiderApplicationPayload>({
            query: (data) => ({
                url: "/rider/apply",
                method: "POST",
                body: data,
            }),
        }),

        getRiderProfile: builder.query<Rider, string>({
            query: (riderId) => `/rider/${riderId}`,
        }),

        updateRiderStatus: builder.mutation<
            Rider,
            { riderId: string; status: string }
        >({
            query: ({ riderId, status }) => ({
                url: `/rider/${riderId}/status`,
                method: "PATCH",
                body: { status },
            }),
        }),
    }),

    overrideExisting: true,
});

export const {
    useApplyRiderMutation,
    useGetRiderProfileQuery,
    useUpdateRiderStatusMutation,
} = riderApi;
