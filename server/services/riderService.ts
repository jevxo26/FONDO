import { Prisma, Role, RiderStatus, VerificationStatus } from "@prisma/client";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";
import { encryptPassword } from "../utils/bcryptService";
import AppError from "../utils/AppError";
import { CustomJwtPayload } from "../types/auth.types";
import { CreateRiderPayload } from "../types/rider.types";

const getInternalIdByCode = async (riderCode: string): Promise<string> => {
    const record = await prisma.rider.findUnique({
        where: { riderCode },
        select: { id: true },
    });
    if (!record) throw new AppError(404, `Rider matching code '${riderCode}' does not exist.`);
    return record.id;
};

const createRider = catchServiceAsync(
    async (payload: CreateRiderPayload, user?: CustomJwtPayload) => {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            avatar,
            nidNumber,
            dob,
            division,
            district,
            upazilaOrThana,
            emergencyName,
            emergencyPhone,
            emergencyRelation,
            workZoneDivision,
            workZoneDistrict,
            workZone,
            vehicleType,
            drivingLicenseNo,
            vehicleRegNumber,
            payoutMethod,
            mobileWalletNumber,
            bankName,
            bankAccountNumber,
            nidFront,
            nidBack,
            licenseFront,
            licenseBack,
            termsAccepted,
            safetyCodeAccepted,
            backgroundCheckAccepted,
        } = payload;

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { phone }],
            },
        });

        if (existingUser) {
            throw new AppError(400, "Email or phone number is already in use");
        }

        const existingRider = await prisma.rider.findFirst({
            where: { nidNumber },
        });

        if (existingRider) {
            throw new AppError(400, "NID number is already registered under another application");
        }

        const hashedPassword = await encryptPassword(password);
        const uniqueRiderCode = `RIDER-${String(Date.now()).slice(-7)}`;

        const status =
            user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN
                ? RiderStatus.APPROVED
                : RiderStatus.PENDING;

        return await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    password: hashedPassword,
                    avatar: avatar || null,
                    role: Role.RIDER,
                },
            });

            const documentsToCreate: Prisma.RiderDocumentCreateWithoutRiderInput[] = [];
            if (nidFront) documentsToCreate.push({ documentType: "NID_FRONT", fileUrl: nidFront });
            if (nidBack) documentsToCreate.push({ documentType: "NID_BACK", fileUrl: nidBack });
            if (licenseFront) documentsToCreate.push({ documentType: "LICENSE_FRONT", fileUrl: licenseFront });
            if (licenseBack) documentsToCreate.push({ documentType: "LICENSE_BACK", fileUrl: licenseBack });

            const newRider = await tx.rider.create({
                data: {
                    riderCode: uniqueRiderCode,
                    firstName,
                    lastName,
                    email,
                    phone,
                    avatar: avatar || null,
                    nidNumber,
                    dob: new Date(dob),
                    status,

                    division,
                    district,
                    upazilaOrThana,

                    emergencyName,
                    emergencyPhone,
                    emergencyRelation,

                    workZoneDivision,
                    workZoneDistrict,
                    workZone,

                    termsAccepted,
                    safetyCodeAccepted,
                    backgroundCheckAccepted,

                    vehicle: {
                        create: {
                            vehicleType,
                            drivingLicenseNo: drivingLicenseNo || null,
                            vehicleRegNumber: vehicleRegNumber || null,
                        },
                    },
                    payout: {
                        create: {
                            payoutMethod,
                            mobileWalletNumber: mobileWalletNumber || null,
                            bankName: bankName || null,
                            bankAccountNumber: bankAccountNumber || null,
                        },
                    },
                    settings: {
                        create: {},
                    },
                    wallet: {
                        create: {},
                    },
                    documents: {
                        create: documentsToCreate,
                    },
                },
                include: {
                    vehicle: true,
                    payout: true,
                    documents: true,
                },
            });

            await tx.user.update({
                where: { id: newUser.id },
                data: { riderId: newRider.id },
            });

            return {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role,
                },
                rider: newRider,
            };
        });
    },
);

const getAllRiders = catchServiceAsync(async (whereFilters: Prisma.RiderWhereInput) => {
    return prisma.rider.findMany({
        where: { ...whereFilters, deletedAt: null },
        include: {
            vehicle: true,
            payout: true,
            documents: true,
            wallet: true,
        },
        orderBy: { createdAt: "desc" },
    });
});

const getRiderByRiderCode = catchServiceAsync(async (riderCode: string) => {
    return prisma.rider.findUnique({
        where: { riderCode },
        include: {
            vehicle: true,
            payout: true,
            documents: true,
            settings: true,
            wallet: true,
        },
    });
});

const updateRider = catchServiceAsync(
    async (riderCode: string, updateData: Prisma.RiderUpdateInput) => {
        return prisma.rider.update({
            where: { riderCode },
            data: updateData,
        });
    },
);

const softDeleteRider = catchServiceAsync(async (riderCode: string) => {
    return prisma.rider.update({
        where: { riderCode },
        data: { deletedAt: new Date(), isActive: false, isOnline: false },
    });
});

const addDocument = catchServiceAsync(
    async (riderCode: string, data: { documentType: string; fileUrl: string }) => {
        const riderId = await getInternalIdByCode(riderCode);
        return prisma.riderDocument.create({
            data: {
                documentType: data.documentType,
                fileUrl: data.fileUrl,
                rider: { connect: { id: riderId } },
            },
        });
    },
);

const updateDocumentStatus = catchServiceAsync(
    async (id: string, verificationStatus: VerificationStatus, verifiedBy: string) => {
        return prisma.riderDocument.update({
            where: { id },
            data: { verificationStatus, verifiedBy, verifiedAt: new Date() },
        });
    },
);

const getWallet = catchServiceAsync(async (riderCode: string) => {
    const riderId = await getInternalIdByCode(riderCode);
    return prisma.riderWallet.findUnique({
        where: { riderId },
        include: { transactions: { orderBy: { createdAt: "desc" } } },
    });
});

const getPayoutHistory = catchServiceAsync(async (riderCode: string) => {
    const riderId = await getInternalIdByCode(riderCode);
    return prisma.riderPayoutHistory.findMany({
        where: { riderId },
        orderBy: { createdAt: "desc" },
    });
});

const updateSettings = catchServiceAsync(
    async (riderCode: string, payload: Prisma.RiderSettingsUpdateInput) => {
        const riderId = await getInternalIdByCode(riderCode);
        return prisma.riderSettings.update({
            where: { riderId },
            data: payload,
        });
    },
);

const toggleOnlineStatus = catchServiceAsync(
    async (riderCode: string, isOnline: boolean) => {
        return prisma.rider.update({
            where: { riderCode },
            data: { isOnline },
            select: { riderCode: true, isOnline: true, isActive: true },
        });
    },
);

export const RiderService = {
    createRider,
    getAllRiders,
    getRiderByRiderCode,
    updateRider,
    softDeleteRider,
    addDocument,
    updateDocumentStatus,
    getWallet,
    getPayoutHistory,
    updateSettings,
    toggleOnlineStatus,
};