const STORAGE_KEY = "fondo_cart";
const VAT_PERCENT = 5;
const DELIVERY_CHARGE = 50;

export interface StoredCartItem {
  id: string;
  foodId: string;
  name: string;
  thumbnail?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addons: StoredAddon[];
  packageMealId?: string;
}

interface StoredAddon {
  addonItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartTotals {
  items: StoredCartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  vat: number;
  totalAmount: number;
  couponCode?: string;
}

function readCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: StoredCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("fondo-cart-changed"));
}

function computeTotals(items: StoredCartItem[], discount = 0, couponCode?: string): CartTotals {
  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);
  const deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0;
  const vat = subtotal * (VAT_PERCENT / 100);
  const totalAmount = subtotal - discount + deliveryCharge + vat;
  return {
    items,
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal,
    discount,
    deliveryCharge,
    vat,
    totalAmount,
    couponCode,
  };
}

export function getCart(): CartTotals {
  return computeTotals(readCart());
}

export function addItem(
  foodId: string,
  name: string,
  unitPrice: number,
  quantity: number,
  thumbnail?: string,
  packageMealId?: string,
): CartTotals {
  const items = readCart();
  const existing = items.find((i) => i.foodId === foodId && i.packageMealId === packageMealId);
  if (existing) {
    existing.quantity += quantity;
    existing.totalPrice = existing.quantity * existing.unitPrice;
  } else {
    items.push({
      id: crypto.randomUUID(),
      foodId,
      name,
      thumbnail,
      quantity,
      unitPrice,
      totalPrice: quantity * unitPrice,
      addons: [],
      packageMealId,
    });
  }
  writeCart(items);
  return computeTotals(items);
}

export function removeItem(itemId: string): CartTotals {
  const items = readCart().filter((i) => i.id !== itemId);
  writeCart(items);
  return computeTotals(items);
}

export function updateQuantity(itemId: string, quantity: number): CartTotals {
  const items = readCart();
  const item = items.find((i) => i.id === itemId);
  if (item) {
    item.quantity = quantity;
    item.totalPrice = quantity * item.unitPrice;
  }
  writeCart(items);
  return computeTotals(items);
}

export function clearCart(): CartTotals {
  writeCart([]);
  return computeTotals([]);
}

export function saveCart(apiCart: { items: Array<{ id: string; foodId: string; quantity: number; unitPrice: number; totalPrice: number; food: { id: string; name: string; thumbnail?: string | null }; addons?: Array<{ id: string; addonItemId: string; name: string; quantity: number; price: number }>; packageMealId?: string }>; subtotal: number; discount: number; deliveryCharge: number; vat: number }): CartTotals {
  const items: StoredCartItem[] = apiCart.items.map((i) => ({
    id: i.id,
    foodId: i.foodId,
    name: i.food.name,
    thumbnail: i.food.thumbnail ?? undefined,
    quantity: i.quantity,
    unitPrice: i.unitPrice,
    totalPrice: i.totalPrice,
    addons: (i.addons || []).map((a) => ({
      addonItemId: a.addonItemId,
      name: a.name,
      price: a.price,
      quantity: a.quantity,
    })),
    packageMealId: i.packageMealId,
  }));
  writeCart(items);
  return computeTotals(items, Number(apiCart.discount));
}

export function setCouponCode(code?: string): CartTotals {
  const items = readCart();
  if (typeof window !== "undefined") {
    if (code) {
      window.sessionStorage.setItem("fondo_coupon", code);
    } else {
      window.sessionStorage.removeItem("fondo_coupon");
    }
  }
  return computeTotals(items, 0, code);
}
