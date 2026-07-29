const STORAGE_KEY = "fondo_wishlist";

export interface WishlistItem {
  id: string;
  name: string;
  thumbnail?: string;
  slug: string;
  servingSize?: string;
  shortDescription?: string;
  preparationTime?: number;
  variants: Array<{ price: number; discountPrice?: number | null }>;
  averageRating?: number;
}

function readWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeWishlist(items: WishlistItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("fondo-wishlist-changed"));
}

export function getWishlist(): WishlistItem[] {
  return readWishlist();
}

export function isFavorite(foodId: string): boolean {
  return readWishlist().some((f) => f.id === foodId);
}

export function addToWishlist(item: WishlistItem): WishlistItem[] {
  const items = readWishlist();
  if (!items.some((f) => f.id === item.id)) {
    items.push(item);
  }
  writeWishlist(items);
  return items;
}

export function removeFromWishlist(foodId: string): WishlistItem[] {
  const items = readWishlist().filter((f) => f.id !== foodId);
  writeWishlist(items);
  return items;
}

export function toggleWishlist(item: WishlistItem): WishlistItem[] {
  const items = readWishlist();
  const idx = items.findIndex((f) => f.id === item.id);
  if (idx === -1) {
    items.push(item);
  } else {
    items.splice(idx, 1);
  }
  writeWishlist(items);
  return items;
}

export function saveWishlist(
  apiItems: Array<{
    id: string;
    name: string;
    thumbnail?: string;
    slug: string;
    servingSize?: string;
    shortDescription?: string;
    preparationTime?: number;
    variants: Array<{ price: string | number; discountPrice?: string | number | null }>;
  averageRating?: number;
  }>,
) {
  const items: WishlistItem[] = apiItems.map((f) => ({
    id: f.id,
    name: f.name,
    thumbnail: f.thumbnail,
    slug: f.slug,
    servingSize: f.servingSize,
    shortDescription: f.shortDescription,
    preparationTime: f.preparationTime,
    variants: f.variants.map((v) => ({
      price: Number(v.price),
      ...(v.discountPrice != null ? { discountPrice: Number(v.discountPrice) } : {}),
    })),
    averageRating: f.averageRating,
  }));
  writeWishlist(items);
}

export function clearWishlist() {
  writeWishlist([]);
}
