import { Router } from "express";
import { PackageController } from "../controllers/packageController";
// import { verifyAuth, verifyVendor } from "../middlewares/auth.middleware"; 

const router = Router();

// Category Routes
router.post('/categories', PackageController.createCategory);
router.get('/categories', PackageController.getCategories);

// --- Public Routes ---
router.get('/', PackageController.getPackages);
router.get('/:id', PackageController.getPackageDetails);

// --- Vendor Management Routes ---
router.post('/vendor/create', PackageController.createPackage); // verifyVendor (Use hardcod vendor now)
router.get('/vendor/open-requests', PackageController.getVendorOpenRequests); // verifyVendor 
router.patch('/vendor/accept-request/:id', PackageController.acceptCustomRequest); // verifyVendor 

// --- Customer Routes ---
router.post('/custom-request', PackageController.createCustomRequest); // verifyAuth 
router.post('/custom-request/:id/pay', PackageController.payForCustomOrder); // verifyAuth

export default router;