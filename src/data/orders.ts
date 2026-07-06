export type OrderStatus =
  | "PENDING" | "PAYMENT_PENDING" | "CONFIRMED" | "PREPARING"
  | "READY_FOR_PICKUP" | "PICKED_UP" | "ON_THE_WAY"
  | "DELIVERED" | "COMPLETED" | "CANCELLED" | "REFUNDED";

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED";
  placedAt: string;
}

const customerNames = [
  "Tasnim Jahan", "Fahim Ahmed", "Mahmud Hassan", "Sarah Karim",
  "Rafiq Hasan", "Nusrat Jahan", "Kazi Fahim", "Sadia Islam",
  "Tanvir Ahmed", "Farzana Rahman", "Hasan Ali", "Jannatul Ferdous",
  "Mizanur Rahman", "Tahmina Akhtar", "Shahriar Kabir",
];

const statuses: OrderStatus[] = [
  "PENDING", "CONFIRMED", "PREPARING", "READY_FOR_PICKUP",
  "ON_THE_WAY", "DELIVERED", "COMPLETED", "CANCELLED", "REFUNDED",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrders(count: number): CustomerOrder[] {
  const orders: CustomerOrder[] = [];
  for (let i = 1; i <= count; i++) {
    const name = randomItem(customerNames);
    const status = randomItem(statuses);
    orders.push({
      id: `ORD-${String(i).padStart(4, "0")}`,
      orderNumber: `#FONDO-${String(i).padStart(5, "0")}`,
      customerId: `USR-${String(29000 + i).slice(0, 5)}`,
      customerName: name,
      items: Math.floor(Math.random() * 8) + 1,
      totalAmount: Math.floor(Math.random() * 8000) + 500,
      orderStatus: status,
      paymentStatus: status === "CANCELLED" ? "REFUNDED" : "PAID",
      placedAt: `${Math.floor(Math.random() * 28) + 1} ${
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(Math.random() * 6)]
      }, 2026`,
    });
  }
  return orders;
}

export const orders = generateOrders(50);
