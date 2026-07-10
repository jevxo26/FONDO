import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

const createVendor = catchServiceAsync(async (data: Prisma.VendorCreateInput) => {
    const vendorCode = `VEND-${String(Date.now()).slice(-7)}`;
    return prisma.vendor.create({
        data: {
            ...data,
            vendorCode: vendorCode
        }
    });
});

export const VendorService = {
    createVendor
}