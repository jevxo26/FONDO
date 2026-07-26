import { Request, Response } from 'express';
import { PackageService } from '../services/package.service';

const getPackages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const packages = await PackageService.getAllPackages(req.query);
    return res.status(200).json({ success: true, data: packages });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPackageDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const packageId = req.params.id as string;
    const pkg = await PackageService.getPackageById(packageId);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
    return res.status(200).json({ success: true, data: pkg });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// New package created by vendor
const createPackage = async (req: any, res: Response): Promise<Response> => {
  try {
    const vendorId = req.user.id;
    const result = await PackageService.createVendorPackage(vendorId, req.body);
    return res.status(201).json({ success: true, message: 'Package created successfully', data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Custom package create by user
const createCustomRequest = async (req: any, res: Response): Promise<Response> => {
  try {
    const customerId = req.user.id;
    const result = await PackageService.createCustomMealRequest(customerId, req.body);
    return res.status(201).json({ success: true, message: 'Custom meal request posted successfully', data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get package for vendor with status
const getVendorOpenRequests = async (req: Request, res: Response): Promise<Response> => {
  try {
    const requests = await PackageService.getPendingCustomRequests();
    return res.status(200).json({ success: true, data: requests });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Vendor approved the custom request (send a notification to the user after approval)
const acceptCustomRequest = async (req: any, res: Response): Promise<Response> => {
  try {
    const vendorId = req.user.id;
    const planId = req.params.id as string;
    const result = await PackageService.vendorAcceptCustomRequest(planId, vendorId);
    return res.status(200).json({ success: true, message: 'Request approved and notification sent to user successfully', data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const payForCustomOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const planId = req.params.id as string;
    const result = await PackageService.confirmCustomOrderPayment(planId);
    return res.status(200).json({ success: true, message: 'Payment successful, order confirmed', data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await PackageService.createPackageCategory(req.body);
    return res.status(201).json({ success: true, message: 'Package category created successfully', data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await PackageService.getAllCategories();
    return res.status(200).json({ success: true, data: result });
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
  getCategories
};