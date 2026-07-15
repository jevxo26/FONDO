import { Prisma, Role, VerificationStatus } from "@prisma/client";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";
import { encryptPassword } from "../utils/bcryptService";

// Helper method to resolve internal structural ID via public vendor code safely
const getInternalIdByCode = async (vendorCode: string): Promise<string> => {
  const record = await prisma.vendor.findUnique({
    where: { vendorCode },
    select: { id: true },
  });
  if (!record) throw new Error(`Vendor context matching code '${vendorCode}' does not exist.`);
  return record.id;
};

const createVendor = catchServiceAsync(async (payload: any) => {
  const { firstName, lastName, password, email, phone, businessName, ownerName, tradeLicenseNumber, tinNumber, binNumber } = payload;
  const hashedPassword = await encryptPassword(password);
  const uniqueVendorCode = `VEND-${String(Date.now()).slice(-7)}`;

  return await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { firstName, lastName, email, phone, password: hashedPassword, role: Role.VENDOR },
    });

    const newVendor = await tx.vendor.create({
      data: { businessName, ownerName, email, phone, tradeLicenseNumber, tinNumber, binNumber, vendorCode: uniqueVendorCode, settings: { create: {} }, wallet: { create: {} } },
    });

    await tx.vendorStaff.create({
      data: { vendorId: newVendor.id, userId: newUser.id, fullName: `${firstName} ${lastName}`, phone, email, designation: "Owner / Administrator" },
    });

    return { user: { id: newUser.id, email: newUser.email, role: newUser.role }, vendor: newVendor };
  });
});

const getAllVendors = catchServiceAsync(async (whereFilters: Prisma.VendorWhereInput) => {
  return prisma.vendor.findMany({
    where: { ...whereFilters, deletedAt: null },
    include: { profile: true, _count: { select: { branches: true } } },
  });
});

const getVendorByVendorCode = catchServiceAsync(async (vendorCode: string) => {
  return prisma.vendor.findUnique({
    where: { vendorCode },
    include: { profile: true, settings: true, wallet: true, branches: true },
  });
});

const updateVendor = catchServiceAsync(async (vendorCode: string, updateData: Prisma.VendorUpdateInput) => {
  return prisma.vendor.update({
    where: { vendorCode },
    data: updateData,
  });
});

const softDeleteVendor = catchServiceAsync(async (vendorCode: string) => {
  return prisma.vendor.update({
    where: { vendorCode },
    data: { deletedAt: new Date(), isActive: false },
  });
});

// Profile Sub-resource Data Operations
const upsertProfile = catchServiceAsync(async (vendorCode: string, profileData: Prisma.VendorProfileUpdateInput) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  return prisma.vendorProfile.upsert({
    where: { vendorId },
    create: { ...profileData, vendorId } as any,
    update: profileData,
  });
});

// Logistic Infrastructure Operations
const createBranch = catchServiceAsync(async (vendorCode: string, data: Prisma.VendorBranchCreateInput) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  const trackingCode = `BR-${String(Date.now()).slice(-6)}`;
  return prisma.vendorBranch.create({
    data: { ...data, branchCode: trackingCode, vendor: { connect: { id: vendorId } } } as any,
  });
});

const getBranchesByVendorCode = catchServiceAsync(async (vendorCode: string) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  return prisma.vendorBranch.findMany({
    where: { vendorId },
    include: { kitchens: true },
  });
});

const createKitchen = catchServiceAsync(async (branchId: string, data: Prisma.VendorKitchenCreateInput) => {
  const kCode = `KIT-${String(Date.now()).slice(-6)}`;

  // Resolve core vendor mapping from targeted branch identity reference parameters
  const targetBranch = await prisma.vendorBranch.findUnique({ where: { id: branchId }, select: { vendorId: true } });
  if (!targetBranch) throw new Error("Targeted deployment branch mapping configuration unresolved.");

  return prisma.vendorKitchen.create({
    data: {
      ...data,
      kitchenCode: kCode,
      vendor: { connect: { id: targetBranch.vendorId } },
      branch: { connect: { id: branchId } },
    } as any,
  });
});

// Compliance Audit Methods
const addDocument = catchServiceAsync(async (vendorCode: string, data: Prisma.VendorDocumentCreateInput) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  return prisma.vendorDocument.create({
    data: { ...data, vendor: { connect: { id: vendorId } } } as any,
  });
});

const updateDocumentStatus = catchServiceAsync(async (id: string, verificationStatus: VerificationStatus, verifiedBy: string) => {
  return prisma.vendorDocument.update({
    where: { id },
    data: { verificationStatus, verifiedBy, verifiedAt: new Date() },
  });
});

// Financial Ledger Ledger Methods
const getWallet = catchServiceAsync(async (vendorCode: string) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  return prisma.vendorWallet.findUnique({ where: { vendorId }, include: { transactions: true } });
});

const getSettlements = catchServiceAsync(async (vendorCode: string) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  return prisma.vendorSettlement.findMany({ where: { vendorId }, orderBy: { createdAt: "desc" } });
});

const createSettlementInvoice = catchServiceAsync(async (vendorCode: string, data: any) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  const sNum = `SETL-${Date.now()}`;
  return prisma.vendorSettlement.create({
    data: {
      settlementNumber: sNum,
      grossAmount: data.grossAmount,
      totalCommission: data.totalCommission,
      totalPayable: data.totalPayable,
      vendor: { connect: { id: vendorId } },
    } as any,
  });
});

// Config Flag Updates
const saveSettings = catchServiceAsync(async (vendorCode: string, payload: Prisma.VendorSettingsUpdateInput) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  return prisma.vendorSettings.update({
    where: { vendorId },
    data: payload,
  });
});

const configureOperatingHours = catchServiceAsync(async (vendorCode: string, hours: Array<{ day: string; openingTime: string; closingTime: string }>) => {
  const vendorId = await getInternalIdByCode(vendorCode);
  return prisma.$transaction([
    prisma.vendorOperatingHour.deleteMany({ where: { vendorId } }),
    prisma.vendorOperatingHour.createMany({
      data: hours.map((h) => ({ ...h, vendorId })),
    }),
  ]);
});

export const VendorService = {
  createVendor,
  getAllVendors,
  getVendorByVendorCode,
  updateVendor,
  softDeleteVendor,
  upsertProfile,
  createBranch,
  getBranchesByVendorCode,
  createKitchen,
  addDocument,
  updateDocumentStatus,
  getWallet,
  getSettlements,
  createSettlementInvoice,
  saveSettings,
  configureOperatingHours,
};