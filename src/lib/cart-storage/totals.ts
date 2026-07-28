import type { StoredCartItem, CartTotals } from "./types";

const VAT_PERCENT = 5;
const DELIVERY_CHARGE = 50;

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

export { VAT_PERCENT, DELIVERY_CHARGE, computeTotals };
