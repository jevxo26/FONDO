import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { PrismaClient } from '@prisma/client';
import { VendorService } from '../services/vendorService';

const prisma = new PrismaClient();

const createVendor = catchAsync(async (req: Request, res: Response) => {
    const { phone, email, tradeLicenseNumber, tinNumber, binNumber } = req.body;
    const existingVendor = await prisma.vendor.findFirst({
        where: {
            OR: [
                { phone },
                { email },
                { tradeLicenseNumber },
                { tinNumber },
                { binNumber }
            ]
        }
    });

    if (existingVendor) {
        let errorMessage = 'Vendor already exists with these details';

        if (existingVendor.email === email) {
            errorMessage = 'Email is already registered';
        } else if (existingVendor.phone === phone) {
            errorMessage = 'Phone number is already registered';
        } else if (existingVendor.tradeLicenseNumber === tradeLicenseNumber) {
            errorMessage = 'Trade License Number is already registered';
        } else if (existingVendor.tinNumber === tinNumber) {
            errorMessage = 'TIN Number is already registered';
        } else if (existingVendor.binNumber === binNumber) {
            errorMessage = 'BIN Number is already registered';
        }

        return sendResponse(res, {
            statusCode: 400,
            message: errorMessage,
        });
    }

    const vendorData = await VendorService.createVendor(req.body);

    sendResponse(res, {
        statusCode: 201,
        message: 'Vendor created successfully',
        data: vendorData
    });
});

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
    const vendors = await VendorService.getAllVendors();

    sendResponse(res, {
        statusCode: 200,
        data: vendors,
    });
});

export const VendorController = {
    getAllVendors,
    createVendor
}