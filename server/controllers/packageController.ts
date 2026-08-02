import { Request, Response } from "express";
import { PackageService } from "../services/packageService";
import type { AuthRequest } from "../types/auth.types";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong";
}

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
  console.log(req.body)
  try {
    const vendorId = "81e8d8c3-5d23-474b-8763-098ab6a45652";
    const result = await PackageService.createVendorPackage(vendorId, req.body);
    return res
      .status(201)
      .json({ success: true, message: "Package created successfully", data: result });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
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

export const PackageController = {
  getPackages,
  getPackageDetails,
  createPackage,
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
  getPendingReviews
};
