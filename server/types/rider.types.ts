import {
    Role,
    RiderStatus,
    VehicleType,
    PayoutMethod,
    DocumentType,
    VerificationStatus,
} from "@prisma/client";

// ==========================================
// 1. RIDER ONBOARDING & CREATION PAYLOADS
// ==========================================

export interface CreateRiderPayload {
    // User Credentials
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    avatar?: string | null;

    // Personal Info
    nidNumber: string;
    dob: string | Date;

    // Address
    division: string;
    district: string;
    upazilaOrThana: string;

    // Emergency Contact
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelation: string;

    // Work Zone
    workZoneDivision: string;
    workZoneDistrict: string;
    workZone: string;

    // Vehicle Details
    vehicleType: VehicleType;
    drivingLicenseNo?: string | null;
    vehicleRegNumber?: string | null;

    // Payout Details
    payoutMethod: PayoutMethod;
    mobileWalletNumber?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;

    // Document File URLs (Upload via Cloudinary before hitting service)
    nidFront?: string;
    nidBack?: string;
    licenseFront?: string;
    licenseBack?: string;

    // Policy Consents
    termsAccepted: boolean;
    safetyCodeAccepted: boolean;
    backgroundCheckAccepted: boolean;
}

// ==========================================
// 2. RIDER UPDATE & PROFILE PAYLOADS
// ==========================================

export interface UpdateRiderPayload {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    emergencyName?: string;
    emergencyPhone?: string;
    emergencyRelation?: string;
    workZoneDivision?: string;
    workZoneDistrict?: string;
    workZone?: string;
}

export interface UpdateRiderSettingsPayload {
    autoAcceptOrders?: boolean;
    maxDeliveryDistanceKm?: number;
    pushNotificationsEnabled?: boolean;
    smsNotificationsEnabled?: boolean;
    language?: string;
}

// ==========================================
// 3. REAL-TIME LOCATION & ONLINE TRACKING
// ==========================================

export interface GeoLocation {
    latitude: number;
    longitude: number;
    heading?: number; // Direction in degrees (0 - 360)
    speed?: number;   // Speed in m/s or km/h
    accuracy?: number;
    updatedAt?: Date | string;
}

export interface UpdateRiderLocationPayload {
    riderCode: string;
    latitude: number;
    longitude: number;
    heading?: number;
    speed?: number;
}

export interface ToggleOnlineStatusPayload {
    isOnline: boolean;
    currentLocation?: Omit<GeoLocation, "updatedAt">;
}

// ==========================================
// 4. DOCUMENTS & VERIFICATION
// ==========================================

export interface AddRiderDocumentPayload {
    documentType: DocumentType;
    fileUrl: string;
}

export interface UpdateDocumentStatusPayload {
    documentId: string;
    verificationStatus: VerificationStatus;
    verifiedBy: string;
    rejectionReason?: string;
}

// ==========================================
// 5. RIDER DASHBOARD & RESPONSE TYPES
// ==========================================

export interface RiderSummaryResponse {
    user: {
        id: string;
        email: string;
        role: Role;
    };
    rider: {
        id: string;
        riderCode: string;
        firstName: string;
        lastName: string;
        status: RiderStatus;
        isActive: boolean;
        isOnline: boolean;
    };
}

export interface RiderWalletSummary {
    id: string;
    riderId: string;
    currentBalance: number;
    pendingEarnings: number;
    totalWithdrawn: number;
}