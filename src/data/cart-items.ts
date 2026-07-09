import { CartItem } from "@/types/cart";

export const mockCartItems: CartItem[] = [
  {
    id: "cart_01",
    title: "Royal Mutton Kacchi",
    price: 280,
    oldPrice: 320,
    quantity: 1,
    thumbnail: "/images/menu/kacchi.jpg",
    itemsSold: 1240
  },
  {
    id: "cart_02",
    title: "Heritage Beef Kacchi",
    price: 290,
    oldPrice: 330,
    quantity: 1,
    thumbnail: "/images/menu/beef.jpg",
    itemsSold: 1240
  }
];