export interface CartItemFood {
  id: string;
  name: string;
  thumbnail: string | null;
}

export interface CartAddon {
  id: string;
  cartItemId: string;
  addonItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  id: string;
  foodId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  food: CartItemFood;
  addons?: CartAddon[];
  packageMealId?: string;
  isCustomized?: boolean;
}

export interface CartMealFood {
  id: string;
  cartMealId: string;
  foodId: string;
  quantity: number;
  isReplacement?: boolean;
  food: { id: string; name: string };
}

export interface CartMeal {
  id: string;
  dayNumber: number;
  mealType: string;
  mealTime?: string;
  foods: CartMealFood[];
}

export interface Cart {
  id: string;
  items: CartItem[];
  meals?: CartMeal[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  vat: number;
  itemCount: number;
  mealCount: number;
  grandTotal: number;
  status?: string;
}
