import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";

const VAT_PERCENT = 5;
const DEFAULT_DELIVERY_CHARGE = 50;

const cartInclude = {
  items: {
    include: {
      food: { select: { id: true, name: true, thumbnail: true } },
      addons: true,
    },
  },
  meals: {
    include: {
      foods: { include: { food: { select: { id: true, name: true } } } },
    },
  },
} as const;

function calcTotals(
  items: { totalPrice: unknown; addons: { price: unknown; quantity: number }[] }[],
) {
  const itemsSubtotal = items.reduce((sum, item) => sum + Number(item.totalPrice), 0);
  const addonsTotal = items.reduce(
    (sum, item) => sum + item.addons.reduce((as, a) => as + Number(a.price) * a.quantity, 0),
    0,
  );
  return itemsSubtotal + addonsTotal;
}

function applyDiscount(
  subtotal: number,
  discountValue: unknown,
  discountType: string | undefined | null,
) {
  if (!discountValue || !discountType) return 0;
  const dv = Number(discountValue);
  const discount = discountType === "PERCENTAGE" ? subtotal * (dv / 100) : dv;
  return Math.min(discount, subtotal);
}

function buildTotals(subtotal: number, discount: number) {
  const afterDiscount = subtotal - discount;
  const deliveryCharge = afterDiscount > 0 ? DEFAULT_DELIVERY_CHARGE : 0;
  const vat = afterDiscount * (VAT_PERCENT / 100);
  return { discount, deliveryCharge, vat };
}

export const getActiveCart = catchServiceAsync(async (userId: string) => {
  const cart = await prisma.cart.upsert({
    where: { customerId: userId },
    create: { customerId: userId, status: "active" },
    update: {
      status: "active",
      packageId: null,
      customMealPlanId: null,
      couponId: null,
    },
    include: cartInclude,
  });

  return cart;
});

export const initCart = catchServiceAsync(
  async (userId: string, packageId?: string, customMealPlanId?: string) => {
    if (!packageId && !customMealPlanId) {
      throw new AppError(400, "Either packageId or customMealPlanId is required");
    }

    const existing = await prisma.cart.findFirst({
      where: { customerId: userId, status: "active" },
    });
    if (existing) {
      await Promise.all([
        prisma.cartItem.deleteMany({ where: { cartId: existing.id } }),
        prisma.cartMeal.deleteMany({ where: { cartId: existing.id } }),
        prisma.cart.update({
          where: { id: existing.id },
          data: {
            packageId,
            customMealPlanId,
            couponId: null,
            subtotal: 0,
            discount: 0,
            deliveryCharge: 0,
            vat: 0,
          },
        }),
      ]);
    }

    let cart: Awaited<ReturnType<typeof prisma.cart.findFirst<{ include: typeof cartInclude }>>>;
    if (existing) {
      cart = await prisma.cart.update({
        where: { id: existing.id },
        data: { packageId, customMealPlanId, couponId: null, status: "active" },
        include: cartInclude,
      });
    } else {
      cart = await prisma.cart.create({
        data: { customerId: userId, packageId, customMealPlanId, status: "active" },
        include: cartInclude,
      });
    }

    if (packageId) {
      const packageMeals = await prisma.packageMeal.findMany({
        where: { packageDay: { packageId } },
        include: { packageDay: true },
      });

      if (packageMeals.length > 0) {
        await prisma.cartMeal.createMany({
          data: packageMeals.map((pm) => ({
            cartId: cart.id,
            dayNumber: pm.packageDay.dayNumber,
            mealType: pm.mealType,
            mealTime: pm.mealTime ?? undefined,
          })),
        });
      }
    }

    return _recalculateAndReturn(cart.id, userId);
  },
);

export const addItem = catchServiceAsync(
  async (
    cart: { id: string },
    foodId: string,
    quantity: number,
    unitPrice: number,
    packageMealId?: string,
  ) => {
    const existing = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, foodId, packageMealId: packageMealId ?? null },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + quantity,
          totalPrice: (existing.quantity + quantity) * Number(unitPrice),
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          foodId,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice,
          packageMealId,
        },
      });
    }

    return _recalculateAndReturn(cart.id);
  },
);

export const updateItemQuantity = catchServiceAsync(async (itemId: string, quantity: number) => {
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item) throw new AppError(404, "Cart item not found");

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity, totalPrice: quantity * Number(item.unitPrice) },
  });

  return _recalculateAndReturn(item.cartId);
});

export const removeItem = catchServiceAsync(async (itemId: string) => {
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { addons: true },
  });
  if (!item) throw new AppError(404, "Cart item not found");

  await prisma.cartAddon.deleteMany({ where: { cartItemId: itemId } });
  await prisma.cartItem.delete({ where: { id: itemId } });

  return _recalculateAndReturn(item.cartId);
});

export const addAddon = catchServiceAsync(
  async (itemId: string, addonItemId: string, quantity: number, price: number) => {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) throw new AppError(404, "Cart item not found");

    await prisma.cartAddon.create({
      data: { cartItemId: itemId, addonItemId, quantity, price },
    });

    return _recalculateAndReturn(item.cartId);
  },
);

export const removeAddon = catchServiceAsync(async (addonId: string) => {
  const addon = await prisma.cartAddon.findUnique({ where: { id: addonId } });
  if (!addon) throw new AppError(404, "Cart addon not found");

  const item = await prisma.cartItem.findUnique({ where: { id: addon.cartItemId } });
  await prisma.cartAddon.delete({ where: { id: addonId } });

  if (item) {
    return _recalculateAndReturn(item.cartId);
  }
});

export const addMeal = catchServiceAsync(
  async (cart: { id: string }, dayNumber: number, mealType: string, mealTime?: string) => {
    await prisma.cartMeal.create({
      data: { cartId: cart.id, dayNumber, mealType, mealTime },
    });

    return _recalculateAndReturn(cart.id);
  },
);

export const removeMeal = catchServiceAsync(async (mealId: string) => {
  const meal = await prisma.cartMeal.findUnique({ where: { id: mealId } });
  if (!meal) throw new AppError(404, "Cart meal not found");

  await prisma.cartMealFood.deleteMany({ where: { cartMealId: mealId } });
  await prisma.cartMeal.delete({ where: { id: mealId } });

  return _recalculateAndReturn(meal.cartId);
});

export const addFoodToMeal = catchServiceAsync(
  async (mealId: string, foodId: string, quantity: number, isReplacement: boolean) => {
    const meal = await prisma.cartMeal.findUnique({ where: { id: mealId } });
    if (!meal) throw new AppError(404, "Cart meal not found");

    await prisma.cartMealFood.create({
      data: { cartMealId: mealId, foodId, quantity, isReplacement },
    });

    return _recalculateAndReturn(meal.cartId);
  },
);

export const removeFoodFromMeal = catchServiceAsync(async (mealId: string, foodId: string) => {
  const meal = await prisma.cartMeal.findUnique({ where: { id: mealId } });
  if (!meal) throw new AppError(404, "Cart meal not found");

  await prisma.cartMealFood.deleteMany({
    where: { cartMealId: mealId, foodId },
  });

  return _recalculateAndReturn(meal.cartId);
});

export const clearCart = catchServiceAsync(async (cart: { id: string; customerId: string }) => {
  await prisma.cartAddon.deleteMany({ where: { cartItem: { cartId: cart.id } } });
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  await prisma.cartMealFood.deleteMany({ where: { cartMeal: { cartId: cart.id } } });
  await prisma.cartMeal.deleteMany({ where: { cartId: cart.id } });
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      packageId: null,
      customMealPlanId: null,
      couponId: null,
      subtotal: 0,
      discount: 0,
      deliveryCharge: 0,
      vat: 0,
    },
  });

  await _logHistory(cart.id, "CLEAR", cart.customerId, "Cart cleared");
  const updated = await prisma.cart.findUnique({ where: { id: cart.id }, include: cartInclude });
  return updated!;
});

async function _recalculateAndReturn(cartId: string, userId?: string) {
  return prisma.$transaction(
    async (tx) => {
      const [items, cart, mealCount] = await Promise.all([
        tx.cartItem.findMany({ where: { cartId }, include: { addons: true } }),
        tx.cart.findUnique({ where: { id: cartId }, include: cartInclude }),
        tx.cartMeal.count({ where: { cartId } }),
      ]);

      if (!cart) throw new AppError(404, "Cart not found");

      const subtotal = calcTotals(items);
      const itemCount = items.length;
      let discount = 0;

      if (cart.couponId) {
        const coupon = await tx.coupon.findUnique({ where: { id: cart.couponId } });
        if (coupon && coupon.status === "active" && (!coupon.endDate || new Date() <= coupon.endDate)) {
          discount = applyDiscount(subtotal, coupon.discountValue, coupon.discountType);
        }
      }

      const totals = buildTotals(subtotal, discount);
      const grandTotal = subtotal - discount + totals.deliveryCharge + totals.vat;

      if (userId) {
        await tx.cartHistory.create({
          data: { cartId, action: "INIT", performedBy: userId, remarks: "Cart initialized" },
        });
      }

      return tx.cart.update({
        where: { id: cartId },
        data: { subtotal, ...totals, itemCount, mealCount, grandTotal },
        include: cartInclude,
      })!;
    },
    { timeout: 20000 },
  );
}

async function _logHistory(cartId: string, action: string, performedBy: string, remarks?: string) {
  await prisma.cartHistory.create({
    data: { cartId, action, performedBy, remarks },
  });
}
