import { Prisma } from "@prisma/client";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const createVendor = catchServiceAsync(async (data: Prisma.VendorCreateInput) => {
  const vendorCode = `VEND-${String(Date.now()).slice(-7)}`;
  return prisma.vendor.create({
    data: {
      ...data,
      vendorCode: vendorCode,
    },
  });
});

export const VendorService = {
  createVendor,
};
