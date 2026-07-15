import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { VendorService } from "../services/vendorService";
import { VendorStatus, VerificationStatus } from "@prisma/client";
import prisma from "../lib/prisma";

// Core System Controls
const createVendor = catchAsync(async (req: Request, res: Response) => {
  const { phone, email, tradeLicenseNumber, tinNumber, binNumber } = req.body;
  const targetChecks = [phone && { phone }, email && { email }, tradeLicenseNumber && { tradeLicenseNumber }, tinNumber && { tinNumber }, binNumber && { binNumber }].filter(Boolean) as any[];

  if (targetChecks.length > 0) {
    const duplicate = await prisma.vendor.findFirst({ where: { OR: targetChecks } });
    if (duplicate) return sendResponse(res, { statusCode: 400, message: "Some data is already in use" });
  }

  const result = await VendorService.createVendor(req.body);
  sendResponse(res, { statusCode: 201, message: "Vendor created", data: result });
});

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
  const statusString = Array.isArray(req.query.status) ? req.query.status[0] : req.query.status;
  const verificationString = Array.isArray(req.query.verificationStatus) ? req.query.verificationStatus[0] : req.query.verificationStatus;

  const filters = {
    status: statusString ? (statusString as VendorStatus) : undefined,
    verificationStatus: verificationString ? (verificationString as VerificationStatus) : undefined,
    isActive: req.query.isActive ? req.query.isActive === "true" : undefined,
  };
  const result = await VendorService.getAllVendors(filters);
  sendResponse(res, { statusCode: 200, message: "Vendors extracted successfully", data: result });
});

const getVendorByVendorCode = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const result = await VendorService.getVendorByVendorCode(vendorCode);
  if (!result) return sendResponse(res, { statusCode: 404, message: "Vendor context missing" });
  sendResponse(res, { statusCode: 200, message: "Vendor data resolved", data: result });
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  // CRITICAL: Strip out protected fields from the payload
  const { id, vendorCode: _, email, phone, tradeLicenseNumber, tinNumber, binNumber, createdAt, updatedAt, ...allowedData } = req.body;

  const result = await VendorService.updateVendor(vendorCode, allowedData);
  sendResponse(res, { statusCode: 200, message: "Vendor modifications persisted", data: result });
});

const softDeleteVendor = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  await VendorService.softDeleteVendor(vendorCode);
  sendResponse(res, { statusCode: 200, message: "Vendor soft-deleted successfully" });
});

// Profile Sub-resource Controls
const upsertVendorProfile = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const { id, vendorId, createdAt, updatedAt, ...allowedProfileData } = req.body;
  const result = await VendorService.upsertProfile(vendorCode, allowedProfileData);
  sendResponse(res, { statusCode: 200, message: "Profile parameters recorded", data: result });
});

// Branch & Production Units Controls
const addBranch = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const { id, vendorId, branchCode, createdAt, updatedAt, ...allowedBranchData } = req.body;
  const result = await VendorService.createBranch(vendorCode, allowedBranchData);
  sendResponse(res, { statusCode: 201, message: "Operational branch layout tracking initialized", data: result });
});

const getVendorBranches = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const result = await VendorService.getBranchesByVendorCode(vendorCode);
  sendResponse(res, { statusCode: 200, message: "Branches resolved successfully", data: result });
});

const addKitchenToBranch = catchAsync(async (req: Request, res: Response) => {
  const branchId = req.params.branchId as string; // Explicitly cast to string
  const { id, kitchenCode, createdAt, updatedAt, ...allowedKitchenData } = req.body;
  const result = await VendorService.createKitchen(branchId, allowedKitchenData);
  sendResponse(res, { statusCode: 201, message: "Production unit attached to targeted branch space", data: result });
});

// Compliance Documentation Controls
const uploadDocument = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const { id, vendorId, verificationStatus, verifiedAt, verifiedBy, ...allowedDocData } = req.body;
  const result = await VendorService.addDocument(vendorCode, allowedDocData);
  sendResponse(res, { statusCode: 201, message: "Compliance filing tracked", data: result });
});

const verifyDocument = catchAsync(async (req: Request, res: Response) => {
  const docId = req.params.docId as string; // Explicitly cast to string
  const { status, verifiedBy } = req.body;
  const result = await VendorService.updateDocumentStatus(docId, status as VerificationStatus, verifiedBy);
  sendResponse(res, { statusCode: 200, message: "Audit state updated", data: result });
});

// Financial Ledger Controls
const getWalletBalance = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const result = await VendorService.getWallet(vendorCode);
  sendResponse(res, { statusCode: 200, message: "Ledger status retrieved", data: result });
});

const getSettlementHistory = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const result = await VendorService.getSettlements(vendorCode);
  sendResponse(res, { statusCode: 200, message: "Historical payouts listed", data: result });
});

const generateSettlementPeriod = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const result = await VendorService.createSettlementInvoice(vendorCode, req.body);
  sendResponse(res, { statusCode: 201, message: "Settlement milestone calculated", data: result });
});

// Meta Operational Flags Configuration Controls
const updateSettings = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const { id, vendorId, ...allowedSettings } = req.body;
  const result = await VendorService.saveSettings(vendorCode, allowedSettings);
  sendResponse(res, { statusCode: 200, message: "Operational flags updated", data: result });
});

const setOperatingHours = catchAsync(async (req: Request, res: Response) => {
  const vendorCode = req.params.vendorCode as string; // Explicitly cast to string
  const result = await VendorService.configureOperatingHours(vendorCode, req.body.hours);
  sendResponse(res, { statusCode: 200, message: "Availability parameters deployed", data: result });
});

export const VendorController = {
  createVendor,
  getAllVendors,
  getVendorByVendorCode,
  updateVendor,
  softDeleteVendor,
  upsertVendorProfile,
  addBranch,
  getVendorBranches,
  addKitchenToBranch,
  uploadDocument,
  verifyDocument,
  getWalletBalance,
  getSettlementHistory,
  generateSettlementPeriod,
  updateSettings,
  setOperatingHours,
};