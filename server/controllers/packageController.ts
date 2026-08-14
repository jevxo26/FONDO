import { Request, Response } from "express";
import { PackageService } from "../services/packageService";
import type { AuthRequest } from "../types/auth.types";
import prisma from "../lib/prisma";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong";
}

const resolveVendorId = async (req: AuthRequest): Promise<string> => {
  const userId = req.user!.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { vendorId: true },
  });
  const vendorId = user?.vendorId ?? null;
  if (!vendorId) throw new Error("No vendor account linked to this user");
  return vendorId;
};

const getPackages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const packages = await PackageService.getAllPackages(req.query);
    return res.status(200).json({ success: true, data: packages });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

const getPackageDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const packageId = req.params.id as string;
    const pkg = await PackageService.getPackageById(packageId);
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });
    return res.status(200).json({ success: true, data: pkg });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

const createPackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const vendorId = await resolveVendorId(req);
    const result = await PackageService.createVendorPackage(vendorId, req.body);
    return res
      .status(201)
      .json({ success: true, message: "Package submitted for approval", data: result });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const createAdminPackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const result = await PackageService.createAdminPackage(req.user!.userId, req.body);
    return res
      .status(201)
      .json({ success: true, message: "Package created and published", data: result });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const listPackagesAdmin = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const result = await PackageService.listPackagesAdmin(req.query as never);
    return res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

const listVendorPackages = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const vendorId = await resolveVendorId(req);
    const result = await PackageService.listVendorPackages(vendorId);
    return res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

const approvePackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const result = await PackageService.approvePackage(req.params.id as string, req.user!.userId);
    return res
      .status(200)
      .json({ success: true, message: "Package approved and published", data: result });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const rejectPackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const reason = req.body?.reason;
    if (!reason) return res.status(400).json({ success: false, message: "Rejection reason is required" });
    const result = await PackageService.rejectPackage(req.params.id as string, req.user!.userId, reason);
    return res
      .status(200)
      .json({ success: true, message: "Package rejected", data: result });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const createCustomRequest = async (req: AuthRequest, res: Response): Promise<Response> => {
  console.log(req.body)
  try {
    const customerId = req.user!.userId;
    const result = await PackageService.createCustomMealRequest(customerId, req.body);
    return res
      .status(201)
      .json({ success: true, message: "Custom meal request posted successfully", data: result });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

const getVendorOpenRequests = async (req: Request, res: Response): Promise<Response> => {
  try {
    const requests = await PackageService.getPendingCustomRequests();
    return res.status(200).json({ success: true, data: requests });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

const acceptCustomRequest = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const vendorId = req.user!.id;
    const planId = req.params.id as string;
    const result = await PackageService.vendorAcceptCustomRequest(planId, vendorId);
    return res.status(200).json({
      success: true,
      message: "Request approved and notification sent to user successfully",
      data: result,
    });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const payForCustomOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const planId = req.params.id as string;
    const result = await PackageService.confirmCustomOrderPayment(planId);
    return res
      .status(200)
      .json({ success: true, message: "Payment successful, order confirmed", data: result });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await PackageService.createPackageCategory(req.body);
    return res
      .status(201)
      .json({ success: true, message: "Package category created successfully", data: result });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await PackageService.getAllCategories();
    return res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
};

// --- Review Handlers ---

const createReview = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const customerId = req.user?.userId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Customer ID not found in token"
      });
    }

    const packageId = req.params.packageId as string;
    const { rating, review, orderId } = req.body;

    const result = await PackageService.createPackageReview(customerId, packageId, {
      rating: Number(rating),
      review,
      orderId,
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully and is pending approval",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateReview = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const customerId = req.user?.userId;
    if (!customerId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const reviewId = req.params.reviewId as string;
    const { rating, review } = req.body;

    const result = await PackageService.updatePackageReview(customerId, reviewId, {
      rating: rating ? Number(rating) : undefined,
      review,
    });

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteReview = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const customerId = req.user?.userId;
    if (!customerId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const reviewId = req.params.reviewId as string;

    const result = await PackageService.deletePackageReview(customerId, reviewId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateReviewStatus = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const reviewId = req.params.reviewId as string;
    const { status } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved', 'rejected', or 'pending'",
      });
    }

    const result = await PackageService.updateReviewStatus(reviewId, status);

    return res.status(200).json({
      success: true,
      message: `Review status updated to ${status} successfully`,
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getPendingReviews = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const reviews = await PackageService.getPendingReviews();

    return res.status(200).json({
      success: true,
      message: "Pending reviews fetched successfully",
      total: reviews.length,
      data: reviews,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateVendorPackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const vendorId = await resolveVendorId(req);
    const packageId = req.params.id as string;
    const result = await PackageService.updateVendorPackage(packageId, vendorId, req.body);
    return res.status(200).json({
      success: true,
      message: "Package updated and resubmitted for approval",
      data: result,
    });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const updateAdminPackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const packageId = req.params.id as string;
    const result = await PackageService.updateAdminPackage(packageId, req.body);
    return res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const deleteVendorPackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const vendorId = await resolveVendorId(req);
    const packageId = req.params.id as string;
    const result = await PackageService.deleteVendorPackage(packageId, vendorId);
    return res.status(200).json({
      success: true,
      message: "Package deleted successfully",
      data: result,
    });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

const deleteAdminPackage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const packageId = req.params.id as string;
    const result = await PackageService.deleteAdminPackage(packageId);
    return res.status(200).json({
      success: true,
      message: "Package deleted successfully",
      data: result,
    });
  } catch (error: unknown) {
    return res.status(400).json({ success: false, message: getErrorMessage(error) });
  }
};

export const PackageController = {
  getPackages,
  getPackageDetails,
  createPackage,
  createAdminPackage,
  listPackagesAdmin,
  listVendorPackages,
  approvePackage,
  rejectPackage,
  createCustomRequest,
  getVendorOpenRequests,
  acceptCustomRequest,
  payForCustomOrder,
  createCategory,
  getCategories,
  createReview,
  updateReview,
  deleteReview,
  updateReviewStatus,
  getPendingReviews,
  updateVendorPackage,
  updateAdminPackage,
  deleteVendorPackage,
  deleteAdminPackage,
};
