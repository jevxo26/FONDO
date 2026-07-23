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
  summary: true,
} as const;

export const getActiveCart = catchServiceAsync(async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { customerId: userId },
    include: cartInclude,
  });

  if (!cart || cart.status === "converted") {
    cart = await prisma.cart.create({
      data: { customerId: userId, status: "active" },
      include: cartInclude,
    });
  }

  return cart;
});

export const initCart = catchServiceAsync(
  async (userId: string, packageId?: string, customMealPlanId?: string) => {
    if (!packageId && !customMealPlanId) {
      throw new AppError(400, "Either packageId or customMealPlanId is required");
    }

    const existing = await prisma.cart.findUnique({ where: { customerId: userId } });
    if (existing && existing.status === "active") {
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
            totalAmount: 0,
          },
        }),
      ]);
    }

    const cart = await prisma.cart.upsert({
      where: { customerId: userId },
      create: { customerId: userId, packageId, customMealPlanId, status: "active" },
      update: { packageId, customMealPlanId, couponId: null, status: "active" },
      include: cartInclude,
    });

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

    await _recalculateCart(cart.id);
    await _logHistory(
      cart.id,
      "INIT",
      userId,
      `Cart initialized with ${packageId ? "package" : "custom plan"}`,
    );

    return prisma.cart.findUnique({ where: { id: cart.id }, include: cartInclude });
  },
);

export const addItem = catchServiceAsync(
  async (
    cartId: string,
    foodId: string,
    quantity: number,
    unitPrice: number,
    packageMealId?: string,
  ) => {
    const cart = await _assertActiveCart(cartId);

    const existing = await prisma.cartItem.findFirst({
      where: { cartId, foodId, packageMealId: packageMealId ?? null },
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
          cartId,
          foodId,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice,
          packageMealId,
        },
      });
    }

    await _recalculateCart(cartId);
    return prisma.cart.findUnique({ where: { id: cartId }, include: cartInclude });
  },
);

export const updateItemQuantity = catchServiceAsync(async (itemId: string, quantity: number) => {
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item) throw new AppError(404, "Cart item not found");

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity, totalPrice: quantity * Number(item.unitPrice) },
  });

  await _recalculateCart(item.cartId);
  return prisma.cart.findUnique({ where: { id: item.cartId }, include: cartInclude });
});

export const removeItem = catchServiceAsync(async (itemId: string) => {
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { addons: true },
  });
  if (!item) throw new AppError(404, "Cart item not found");

  await prisma.cartAddon.deleteMany({ where: { cartItemId: itemId } });
  await prisma.cartItem.delete({ where: { id: itemId } });

  await _recalculateCart(item.cartId);
  return prisma.cart.findUnique({ where: { id: item.cartId }, include: cartInclude });
});

export const addAddon = catchServiceAsync(
  async (itemId: string, addonItemId: string, quantity: number, price: number) => {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) throw new AppError(404, "Cart item not found");

    await prisma.cartAddon.create({
      data: { cartItemId: itemId, addonItemId, quantity, price },
    });

    await _recalculateCart(item.cartId);
    return prisma.cart.findUnique({ where: { id: item.cartId }, include: cartInclude });
  },
);

export const removeAddon = catchServiceAsync(async (addonId: string) => {
  const addon = await prisma.cartAddon.findUnique({ where: { id: addonId } });
  if (!addon) throw new AppError(404, "Cart addon not found");

  const item = await prisma.cartItem.findUnique({ where: { id: addon.cartItemId } });
  await prisma.cartAddon.delete({ where: { id: addonId } });

  if (item) {
    await _recalculateCart(item.cartId);
    return prisma.cart.findUnique({ where: { id: item.cartId }, include: cartInclude });
  }
});

export const addMeal = catchServiceAsync(
  async (cartId: string, dayNumber: number, mealType: string, mealTime?: string) => {
    await _assertActiveCart(cartId);

    await prisma.cartMeal.create({
      data: { cartId, dayNumber, mealType, mealTime },
    });

    await _recalculateCart(cartId);
    return prisma.cart.findUnique({ where: { id: cartId }, include: cartInclude });
  },
);

export const removeMeal = catchServiceAsync(async (mealId: string) => {
  const meal = await prisma.cartMeal.findUnique({ where: { id: mealId } });
  if (!meal) throw new AppError(404, "Cart meal not found");

  await prisma.cartMealFood.deleteMany({ where: { cartMealId: mealId } });
  await prisma.cartMeal.delete({ where: { id: mealId } });

  await _recalculateCart(meal.cartId);
  return prisma.cart.findUnique({ where: { id: meal.cartId }, include: cartInclude });
});

export const addFoodToMeal = catchServiceAsync(
  async (mealId: string, foodId: string, quantity: number, isReplacement: boolean) => {
    const meal = await prisma.cartMeal.findUnique({ where: { id: mealId } });
    if (!meal) throw new AppError(404, "Cart meal not found");

    await prisma.cartMealFood.create({
      data: { cartMealId: mealId, foodId, quantity, isReplacement },
    });

    await _recalculateCart(meal.cartId);
    return prisma.cart.findUnique({ where: { id: meal.cartId }, include: cartInclude });
  },
);

export const removeFoodFromMeal = catchServiceAsync(async (mealId: string, foodId: string) => {
  const meal = await prisma.cartMeal.findUnique({ where: { id: mealId } });
  if (!meal) throw new AppError(404, "Cart meal not found");

  await prisma.cartMealFood.deleteMany({
    where: { cartMealId: mealId, foodId },
  });

  await _recalculateCart(meal.cartId);
  return prisma.cart.findUnique({ where: { id: meal.cartId }, include: cartInclude });
});

export const clearCart = catchServiceAsync(async (cartId: string) => {
  const cart = await _assertActiveCart(cartId);

  await prisma.cartAddon.deleteMany({ where: { cartItem: { cartId } } });
  await prisma.cartItem.deleteMany({ where: { cartId } });
  await prisma.cartMealFood.deleteMany({ where: { cartMeal: { cartId } } });
  await prisma.cartMeal.deleteMany({ where: { cartId } });
  await prisma.cart.update({
    where: { id: cartId },
    data: {
      packageId: null,
      customMealPlanId: null,
      couponId: null,
      subtotal: 0,
      discount: 0,
      deliveryCharge: 0,
      vat: 0,
      totalAmount: 0,
    },
  });

  await _recalculateCart(cartId);
  await _logHistory(cartId, "CLEAR", cart.customerId, "Cart cleared");

  return prisma.cart.findUnique({ where: { id: cartId }, include: cartInclude });
});

async function _assertActiveCart(cartId: string) {
  const cart = await prisma.cart.findUnique({ where: { id: cartId } });
  if (!cart) throw new AppError(404, "Cart not found");
  if (cart.status !== "active") throw new AppError(400, "Cart is not active");
  return cart;
}

async function _recalculateCart(cartId: string) {
  const [items, cart] = await Promise.all([
    prisma.cartItem.findMany({
      where: { cartId },
      include: { addons: true },
    }),
    prisma.cart.findUnique({ where: { id: cartId } }),
  ]);

  const itemsSubtotal = items.reduce((sum, item) => sum + Number(item.totalPrice), 0);
  const addonsTotal = items.reduce(
    (sum, item) => sum + item.addons.reduce((as, a) => as + Number(a.price) * a.quantity, 0),
    0,
  );
  const subtotal = itemsSubtotal + addonsTotal;
  const itemCount = items.length;
  let discount = 0;

  if (cart?.couponId) {
    const coupon = await prisma.coupon.findUnique({ where: { id: cart.couponId } });
    if (coupon && coupon.status === "active" && new Date() <= coupon.endDate!) {
      discount =
        coupon.discountType === "PERCENTAGE"
          ? subtotal * (Number(coupon.discountValue) / 100)
          : Number(coupon.discountValue);
      if (discount > subtotal) discount = subtotal;
    }
  }

  const afterDiscount = subtotal - discount;
  const deliveryCharge = afterDiscount > 0 ? DEFAULT_DELIVERY_CHARGE : 0;
  const vat = afterDiscount * (VAT_PERCENT / 100);
  const totalAmount = afterDiscount + deliveryCharge + vat;

  await Promise.all([
    prisma.cart.update({
      where: { id: cartId },
      data: {
        subtotal,
        discount,
        deliveryCharge,
        vat,
        totalAmount,
      },
    }),
    prisma.cartMeal.count({ where: { cartId } }).then((mealCount) =>
      prisma.cartSummary.upsert({
        where: { cartId },
        create: {
          cartId,
          itemCount,
          mealCount,
          subtotal,
          discount,
          deliveryCharge,
          vat,
          grandTotal: totalAmount,
        },
        update: {
          itemCount,
          mealCount,
          subtotal,
          discount,
          deliveryCharge,
          vat,
          grandTotal: totalAmount,
        },
      }),
    ),
  ]);
}

async function _logHistory(cartId: string, action: string, performedBy: string, remarks?: string) {
  await prisma.cartHistory.create({
    data: { cartId, action, performedBy, remarks },
  });
}
