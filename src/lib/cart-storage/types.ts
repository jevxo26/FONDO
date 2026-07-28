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

export interface StoredAddon {
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
