export interface CartItemFood {
  id: string;
  name: string;
  thumbnail: string | null;
}

export interface CartItem {
  id: string;
  foodId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  food: CartItemFood;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
}
