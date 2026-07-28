import prisma from "../lib/prisma";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { generateOrderNumber, resolvePrimaryVendor } from "./orderUtils";

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
      totalAmount?: import("@prisma/client/runtime/library").Decimal | null;
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
    paymentMethodId: string,
    customerId: string,
    notes?: string,
    addressId?: string,
    deliverySchedule?: { deliveryDate: Date; deliverySlot?: string },
  ) => {
    const orderNumber = generateOrderNumber();

    const totalAmount =
      cart.totalAmount ??
      Number(cart.subtotal) -
        Number(cart.discount) +
        Number(cart.deliveryCharge) +
        Number(cart.vat);

    const itemFoodIds = cart.items.map((i) => i.foodId);
    const mealFoodIds = cart.meals.flatMap((m) => m.foods.map((f) => f.foodId));
    const allFoodIds = [...new Set([...itemFoodIds, ...mealFoodIds])];
    const primaryVendorId = await resolvePrimaryVendor(allFoodIds);

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
          totalAmount,
          paymentStatus: "PENDING",
          orderStatus: "PENDING",
          deliveryStatus: "PENDING",
          notes,
          placedAt: new Date(),
        },
      });

      if (cart.items.length > 0) {
        await tx.orderItem.createMany({
          data: cart.items.map((item) => ({
            orderId: created.id,
            foodId: item.foodId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
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
          amount: totalAmount,
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
        data: { grandTotal: totalAmount },
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

export const createOrderFromItems = catchServiceAsync(
  async (
    customerId: string,
    items: Array<{
      foodId: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }>,
    paymentMethodId: string,
    addressId?: string,
    notes?: string,
  ) => {
    const orderNumber = generateOrderNumber();
    const subtotal = items.reduce((s, i) => s + i.totalPrice, 0);
    const deliveryCharge = subtotal > 0 ? 50 : 0;
    const discount = 0;
    const vat = subtotal * 0.05;
    const totalAmount = subtotal - discount + deliveryCharge + vat;

    const foodIds = [...new Set(items.map((i) => i.foodId))];
    const primaryVendorId = await resolvePrimaryVendor(foodIds);

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber,
          customerId,
          vendorId: primaryVendorId,
          addressId,
          subtotal,
          discount,
          deliveryCharge,
          vat,
          totalAmount,
          paymentStatus: "PENDING",
          orderStatus: "PENDING",
          deliveryStatus: "PENDING",
          notes,
          placedAt: new Date(),
        },
      });

      await tx.orderItem.createMany({
        data: items.map((item) => ({
          orderId: created.id,
          foodId: item.foodId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
      });

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
          amount: totalAmount,
          status: "PENDING",
        },
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
