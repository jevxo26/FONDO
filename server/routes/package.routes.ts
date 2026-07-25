import { Router } from "express";
import { PackageController } from "../controllers/package.controller";
// import { verifyAuth, verifyVendor } from "../middlewares/auth.middleware"; // আপনার অথ মিডলওয়্যার ইমপোর্ট করুন

const router = Router();

// --- Public Routes ---
router.get('/', PackageController.getPackages);
router.get('/:id', PackageController.getPackageDetails);

// --- Vendor Management Routes ---
router.post('/vendor/create', PackageController.createPackage); // verifyVendor মিডলওয়্যার যুক্ত করুন
router.get('/vendor/open-requests', PackageController.getVendorOpenRequests); // verifyVendor মিডলওয়্যার যুক্ত করুন
router.patch('/vendor/accept-request/:id', PackageController.acceptCustomRequest); // verifyVendor মিডলওয়্যার যুক্ত করুন

// --- Customer Routes ---
router.post('/custom-request', PackageController.createCustomRequest); // verifyAuth মিডলওয়্যার যুক্ত করুন
router.post('/custom-request/:id/pay', PackageController.payForCustomOrder); // verifyAuth মিডলওয়্যার যুক্ত করুন

export default router;