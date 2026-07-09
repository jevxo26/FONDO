export interface CartItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  thumbnail: string;
  itemsSold: number;
}
