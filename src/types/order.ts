export interface OrderFood {
  id: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  foodCode: string;
}

export interface OrderItem {
  id: string;
  foodId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  food: OrderFood;
}

export interface OrderTimeline {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  createdAt: string;
}

export interface OrderRider {
  id: string;
  fullName: string;
  phone: string;
}

export interface OrderDelivery {
  id: string;
  deliveryStatus: string;
  estimatedDeliveryTime: string | null;
  rider: OrderRider | null;
}

export interface OrderPayment {
  id: string;
  amount: number;
  status: string;
}

export interface OrderCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OrderFeedback {
  id: string;
  orderId: string;
  rating: number;
  review: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderInvoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  invoiceDate: string;
  subtotal: number | null;
  discount: number | null;
  vat: number | null;
  deliveryCharge: number | null;
  grandTotal: number;
  pdfUrl: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderStatus: string;
  deliveryStatus: string;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  vat: number;
  totalAmount: number;
  notes: string | null;
  placedAt: string;
  items: OrderItem[];
  timeline: OrderTimeline[];
  delivery: OrderDelivery | null;
  payment: OrderPayment | null;
  customer: OrderCustomer;
  feedback: OrderFeedback | null;
  invoice: OrderInvoice | null;
}

export interface DeliverySchedule {
  deliveryDate: Date;
  deliverySlot: string;
}

export interface OrderItemPayload {
  foodId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PlaceOrderPayload {
  cartId?: string;
  items?: OrderItemPayload[];
  addressId?: string;
  paymentMethodId: string;
  notes?: string;
  deliverySchedule?: DeliverySchedule;
}

export interface PlaceOrderResponse {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
}
