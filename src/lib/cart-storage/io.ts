import type { StoredCartItem } from "./types";

const STORAGE_KEY = "fondo_cart";

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

export { STORAGE_KEY, readCart, writeCart };
