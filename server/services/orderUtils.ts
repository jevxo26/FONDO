import prisma from "../lib/prisma";

export function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `FND-${y}${m}${d}-${seq}`;
}

export async function resolvePrimaryVendor(foodIds: string[]): Promise<string | null> {
  const [assignments, vfs] = await Promise.all([
    prisma.vendorFoodAssignment.findMany({
      where: { foodId: { in: foodIds }, status: "active" },
      orderBy: { priority: "asc" },
      distinct: ["foodId"],
      include: { vendor: { select: { id: true } } },
    }),
    prisma.vendorFood.findMany({
      where: { foodId: { in: foodIds }, status: "active", isPrimary: true },
      include: { vendor: { select: { id: true } } },
    }),
  ]);

  const vendorMap = new Map<string, string>();
  for (const a of assignments) { if (a.vendor) vendorMap.set(a.foodId, a.vendor.id); }
  for (const vf of vfs) { if (!vendorMap.has(vf.foodId) && vf.vendor) vendorMap.set(vf.foodId, vf.vendor.id); }

  const vendorIds = foodIds.map((fid) => vendorMap.get(fid)).filter(Boolean) as string[];
  return vendorIds.length > 0
    ? vendorIds.sort((a, b) => vendorIds.filter((v) => v === a).length - vendorIds.filter((v) => v === b).length).pop() ?? null
    : null;
}

export const ORDER_INCLUDE = {
  items: { include: { food: true } },
  meals: { include: { foods: true } },
  schedules: true,
  statusHistories: { orderBy: { createdAt: "desc" as const } },
  timeline: { orderBy: { createdAt: "asc" as const } },
  cancellation: true,
  refunds: true,
  feedback: true,
  invoice: true,
  delivery: {
    include: {
      rider: { select: { id: true, fullName: true, phone: true } },
    },
  },
  payment: true,
  customer: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
  vendor: { select: { id: true, businessName: true, phone: true, email: true } },
};
