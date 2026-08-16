import { Request, Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { RiderService } from "../services/riderService";
import { RiderStatus, VerificationStatus, VehicleType } from "@prisma/client";
import prisma from "../lib/prisma";
import AppError from "../utils/AppError";

const assertCanViewRider = async (req: AuthRequest, riderCode: string) => {
    const permissions = req.user!.permissions ?? [];

    if (req.user!.role === "SUPER_ADMIN" || permissions.includes("riders") || permissions.includes("*")) {
        return;
    }

    // Fixed: Foreign key is stored on Rider table (userId), not User table (riderId)
    const rider = await prisma.rider.findFirst({
        where: { userId: req.user!.userId, deletedAt: null },
        select: { riderCode: true },
    });

    if (rider && rider.riderCode === riderCode) {
        return;
    }

    throw new AppError(403, "Access denied to this rider's data");
};

const createRider = catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await RiderService.createRider(req.body, req.user);

    sendResponse(res, {
        statusCode: 201,
        message: "Rider onboarding application submitted successfully",
        data: result,
    });
});

const getAllRiders = catchAsync(async (req: Request, res: Response) => {
    const statusString = Array.isArray(req.query.status) ? req.query.status[0] : req.query.status;
    const verificationString = Array.isArray(req.query.verificationStatus)
        ? req.query.verificationStatus[0]
        : req.query.verificationStatus;

    const filters = {
        status: statusString ? (statusString as RiderStatus) : undefined,
        verificationStatus: verificationString ? (verificationString as VerificationStatus) : undefined,
        isActive: req.query.isActive ? req.query.isActive === "true" : undefined,
        workZoneDistrict: req.query.workZoneDistrict ? (req.query.workZoneDistrict as string) : undefined,
        vehicleType: req.query.vehicleType ? (req.query.vehicleType as VehicleType) : undefined,
    };

    const result = await RiderService.getAllRiders(filters);
    sendResponse(res, {
        statusCode: 200,
        message: "Riders retrieved successfully",
        data: result,
    });
});

const getRiderByRiderCode = catchAsync(async (req: AuthRequest, res: Response) => {
    const riderCode = req.params.riderCode as string;
    await assertCanViewRider(req, riderCode);

    const result = await RiderService.getRiderByRiderCode(riderCode);
    if (!result) return sendResponse(res, { statusCode: 404, message: "Rider not found" });

    sendResponse(res, {
        statusCode: 200,
        message: "Rider details retrieved",
        data: result,
    });
});

const updateRider = catchAsync(async (req: Request, res: Response) => {
    const riderCode = req.params.riderCode as string;
    const { ...allowedData } = req.body;

    const result = await RiderService.updateRider(riderCode, allowedData);
    sendResponse(res, {
        statusCode: 200,
        message: "Rider profile updated",
        data: result,
    });
});

const softDeleteRider = catchAsync(async (req: Request, res: Response) => {
    const riderCode = req.params.riderCode as string;
    await RiderService.softDeleteRider(riderCode);
    sendResponse(res, {
        statusCode: 200,
        message: "Rider deactivated successfully",
    });
});

const uploadDocument = catchAsync(async (req: Request, res: Response) => {
    const riderCode = req.params.riderCode as string;
    const { documentType, fileUrl } = req.body;

    const result = await RiderService.addDocument(riderCode, { documentType, fileUrl });
    sendResponse(res, {
        statusCode: 201,
        message: "Document successfully attached",
        data: result,
    });
});

const verifyDocument = catchAsync(async (req: AuthRequest, res: Response) => {
    const docId = req.params.docId as string;
    const { status } = req.body;
    const verifiedBy = req.user!.email;

    const result = await RiderService.updateDocumentStatus(
        docId,
        status as VerificationStatus,
        verifiedBy,
    );

    sendResponse(res, {
        statusCode: 200,
        message: "Rider compliance document verified",
        data: result,
    });
});

const getWalletBalance = catchAsync(async (req: AuthRequest, res: Response) => {
    const riderCode = req.params.riderCode as string;
    await assertCanViewRider(req, riderCode);

    const result = await RiderService.getWallet(riderCode);
    sendResponse(res, {
        statusCode: 200,
        message: "Rider wallet retrieved",
        data: result,
    });
});

const getPayoutHistory = catchAsync(async (req: AuthRequest, res: Response) => {
    const riderCode = req.params.riderCode as string;
    await assertCanViewRider(req, riderCode);

    const result = await RiderService.getPayoutHistory(riderCode);
    sendResponse(res, {
        statusCode: 200,
        message: "Payout logs retrieved",
        data: result,
    });
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
    const riderCode = req.params.riderCode as string;
    const result = await RiderService.updateSettings(riderCode, req.body);

    sendResponse(res, {
        statusCode: 200,
        message: "Rider settings updated",
        data: result,
    });
});

const toggleDutyStatus = catchAsync(async (req: AuthRequest, res: Response) => {
    const riderCode = req.params.riderCode as string;
    await assertCanViewRider(req, riderCode);

    const { isOnline } = req.body;
    const result = await RiderService.toggleOnlineStatus(riderCode, Boolean(isOnline));

    sendResponse(res, {
        statusCode: 200,
        message: `Rider is now ${isOnline ? "Online" : "Offline"}`,
        data: result,
    });
});

const getMyRiderProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;

    // Fixed: Find the Rider directly by userId foreign key
    const rider = await prisma.rider.findFirst({
        where: {
            userId,
            deletedAt: null
        },
        include: {
            vehicle: true,
            payout: true,
            documents: true,
            wallet: true,
            settings: true,
        },
    });

    if (!rider) {
        throw new AppError(404, "No rider profile associated with this account");
    }

    sendResponse(res, {
        statusCode: 200,
        message: "Rider profile retrieved successfully",
        data: rider,
    });
});

export const RiderController = {
    createRider,
    getAllRiders,
    getRiderByRiderCode,
    updateRider,
    softDeleteRider,
    uploadDocument,
    verifyDocument,
    getWalletBalance,
    getPayoutHistory,
    updateSettings,
    toggleDutyStatus,
    getMyRiderProfile,
};