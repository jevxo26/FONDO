import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";

function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `FND-${y}${m}${d}-${seq}`;
}

async function findVendorForFood(foodId: string): Promise<string | null> {
  const assignment = await prisma.vendorFoodAssignment.findFirst({
    where: { foodId, status: "active" },
    orderBy: { priority: "asc" },
    include: { vendor: { select: { id: true } } },
  });
  if (assignment) return assignment.vendor.id;

  const vf = await prisma.vendorFood.findFirst({
    where: { foodId, status: "active", isPrimary: true },
    include: { vendor: { select: { id: true } } },
  });
  return vf?.vendor.id ?? null;
}

export const createOrderFromCart = catchServiceAsync(
  async (
    cart: {
      id: string;
      customerId: string;
      packageId?: string | null;
      customMealPlanId?: string | null;
      subtotal: import("@prisma/client/runtime/library").Decimal;
      discount: import("@prisma/client/runtime/library").Decimal;
      deliveryCharge: import("@prisma/client/runtime/library").Decimal;
      vat: import("@prisma/client/runtime/library").Decimal;
      totalAmount: import("@prisma/client/runtime/library").Decimal;
      couponId?: string | null;
      items: Array<{
        id: string;
        foodId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        addons: Array<{
          addonItemId: string;
          quantity: number;
          price: import("@prisma/client/runtime/library").Decimal;
        }>;
      }>;
      meals: Array<{
        id: string;
        dayNumber: number;
        mealType: string;
        mealTime?: string | null;
        foods: Array<{
          foodId: string;
          quantity: number;
          isReplacement: boolean;
        }>;
      }>;
    },
    addressId: string,
    paymentMethodId: string,
    customerId: string,
    notes?: string,
    deliverySchedule?: { deliveryDate: Date; deliverySlot?: string },
  ) => {
    const orderNumber = generateOrderNumber();

    const itemFoodIds = cart.items.map((i) => i.foodId);
    const mealFoodIds = cart.meals.flatMap((m) => m.foods.map((f) => f.foodId));
    const allFoodIds = [...new Set([...itemFoodIds, ...mealFoodIds])];

    const vendorIds: string[] = [];
    for (const foodId of allFoodIds) {
      const vid = await findVendorForFood(foodId);
      if (vid) vendorIds.push(vid);
    }
    const primaryVendorId = vendorIds.length > 0
      ? vendorIds.sort((a, b) => vendorIds.filter((v) => v === a).length - vendorIds.filter((v) => v === b).length).pop() ?? null
      : null;

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber,
          customerId,
          vendorId: primaryVendorId,
          packageId: cart.packageId,
          customMealPlanId: cart.customMealPlanId,
          addressId,
          couponId: cart.couponId,
          subtotal: cart.subtotal,
          discount: cart.discount,
          deliveryCharge: cart.deliveryCharge,
          vat: cart.vat,
          totalAmount: cart.totalAmount,
          paymentStatus: "PENDING",
          orderStatus: "PENDING",
          deliveryStatus: "PENDING",
          notes,
          placedAt: new Date(),
        },
      });

      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: created.id,
            foodId: item.foodId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          },
        });
      }

      for (const meal of cart.meals) {
        const createdMeal = await tx.orderMeal.create({
          data: {
            orderId: created.id,
            dayNumber: meal.dayNumber,
            mealType: meal.mealType,
            mealTime: meal.mealTime,
            deliveryDate: deliverySchedule?.deliveryDate ?? null,
          },
        });

        for (const mf of meal.foods) {
          await tx.orderMealFood.create({
            data: {
              orderMealId: createdMeal.id,
              foodId: mf.foodId,
              quantity: mf.quantity,
            },
          });
        }
      }

      if (deliverySchedule) {
        await tx.orderSchedule.create({
          data: {
            orderId: created.id,
            deliveryDate: deliverySchedule.deliveryDate,
            deliverySlot: deliverySchedule.deliverySlot,
          },
        });
      }

      await tx.orderStatusHistory.create({
        data: {
          orderId: created.id,
          previousStatus: null,
          currentStatus: "PENDING",
          changedBy: "system",
          remarks: "Order placed",
        },
      });

      await tx.orderTimeline.create({
        data: {
          orderId: created.id,
          title: "Order Placed",
          description: "Your order has been placed successfully.",
          status: "completed",
        },
      });

      await tx.payment.create({
        data: {
          paymentNumber: `PAY-${orderNumber}`,
          orderId: created.id,
          customerId,
          paymentMethodId,
          amount: cart.totalAmount,
          status: "PENDING",
        },
      });

      if (cart.couponId) {
        await tx.couponUsage.create({
          data: {
            couponId: cart.couponId,
            customerId,
            orderId: created.id,
          },
        });
      }

      await tx.cart.update({
        where: { id: cart.id },
        data: { status: "converted" },
      });

      await tx.cartSummary.update({
        where: { cartId: cart.id },
        data: { grandTotal: cart.totalAmount },
      });

      return created;
    });

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: Number(order.totalAmount),
      paymentUrl: `/api/payments/${order.id}/process`,
    };
  },
);
