function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(7291);

export type PaymentStatus = "SUCCESS" | "FAILED" | "REFUNDED";

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  method: string;
  methodIcon: string;
  methodDetail: string;
  status: PaymentStatus;
  amount: number;
  timestamp: string;
}

const customerNames = [
  { name: "Mahbub Khan", initials: "MK" },
  { name: "Saima Rahman", initials: "SR" },
  { name: "Arif Shah", initials: "AS" },
  { name: "Zayn Talukdar", initials: "ZT" },
  { name: "Farhana Jabin", initials: "FJ" },
  { name: "Tasnim Jahan", initials: "TJ" },
  { name: "Fahim Ahmed", initials: "FA" },
  { name: "Mahmud Hassan", initials: "MH" },
  { name: "Sarah Karim", initials: "SK" },
  { name: "Rafiq Hasan", initials: "RH" },
  { name: "Nusrat Jahan", initials: "NJ" },
  { name: "Kazi Fahim", initials: "KF" },
  { name: "Sadia Islam", initials: "SI" },
  { name: "Tanvir Ahmed", initials: "TA" },
  { name: "Farzana Rahman", initials: "FR" },
];

const paymentMethods = [
  { method: "bKash", icon: "bg-pink-100 text-pink-600", detail: "Personal" },
  { method: "bKash", icon: "bg-pink-100 text-pink-600", detail: "Merchant" },
  { method: "Nagad", icon: "bg-orange-100 text-orange-600", detail: "Personal" },
  { method: "Visa", icon: "text-blue-600", detail: "•••• 4291" },
  { method: "Mastercard", icon: "text-orange-600", detail: "•••• 8821" },
  { method: "Heritage Wallet", icon: "text-golden-amber", detail: "Wallet" },
];

const statuses: PaymentStatus[] = [
  "SUCCESS",
  "SUCCESS",
  "SUCCESS",
  "SUCCESS",
  "SUCCESS",
  "FAILED",
  "REFUNDED",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function generateTransactions(count: number): PaymentTransaction[] {
  const txns: PaymentTransaction[] = [];
  for (let i = 1; i <= count; i++) {
    const customer = randomItem(customerNames);
    const method = randomItem(paymentMethods);
    const status = randomItem(statuses);
    const day = Math.floor(rand() * 28) + 1;
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][Math.floor(rand() * 12)];
    const hour = String(Math.floor(rand() * 24)).padStart(2, "0");
    const minute = String(Math.floor(rand() * 60)).padStart(2, "0");
    txns.push({
      id: `TXN-${String(i).padStart(4, "0")}`,
      transactionId: `#TXN-${String(94000 + i).slice(0, 5)}`,
      customerId: `USR-${String(29000 + i).slice(0, 5)}`,
      customerName: customer.name,
      customerInitials: customer.initials,
      method: method.method,
      methodIcon: method.icon,
      methodDetail: method.detail,
      status,
      amount: Math.floor(rand() * 12000) + 500,
      timestamp: `${month} ${day}, 2026 • ${hour}:${minute}`,
    });
  }
  return txns;
}

export const transactions = generateTransactions(50);

// --- Refunds ---

export type RefundStatus = "PENDING" | "APPROVED" | "PROCESSED" | "REJECTED";

export interface RefundRequest {
  id: string;
  transactionId: string;
  customerName: string;
  customerInitials: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  requestedAt: string;
  processedAt: string | null;
}

const refundReasons = [
  "Item not delivered",
  "Wrong item received",
  "Quality issue",
  "Duplicate payment",
  "Order cancelled by customer",
  "Damaged packaging",
];

const refundStatuses: RefundStatus[] = ["PENDING", "PENDING", "PENDING", "APPROVED", "PROCESSED", "PROCESSED", "REJECTED"];

function generateRefunds(count: number): RefundRequest[] {
  const list: RefundRequest[] = [];
  for (let i = 1; i <= count; i++) {
    const customer = randomItem(customerNames);
    const status = randomItem(refundStatuses);
    const day = Math.floor(rand() * 28) + 1;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(rand() * 12)];
    list.push({
      id: `REF-${String(i).padStart(4, "0")}`,
      transactionId: `#TXN-${String(94000 + i * 7).slice(0, 5)}`,
      customerName: customer.name,
      customerInitials: customer.initials,
      amount: Math.floor(rand() * 8000) + 300,
      reason: randomItem(refundReasons),
      status,
      requestedAt: `${month} ${day}, 2026`,
      processedAt: status === "PROCESSED" ? `${month} ${day + 2}, 2026` : status === "REJECTED" ? `${month} ${day + 1}, 2026` : null,
    });
  }
  return list;
}

export const refunds = generateRefunds(25);

// --- Coupons ---

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "PERCENTAGE" | "FIXED";
  minOrder: number;
  maxUses: number;
  usedCount: number;
  status: "ACTIVE" | "EXPIRED" | "DISABLED";
  expiresAt: string;
  createdAt: string;
}

const couponCodes = ["WELCOME20", "FONDO50", "FEAST100", "NEWUSER", "SUMMER25", "FIRSTMEAL", "LOYALTY", "WEEKEND", "HALFPRICE", "BOGO"];

function generateCoupons(count: number): Coupon[] {
  const list: Coupon[] = [];
  for (let i = 1; i <= count; i++) {
    const day = Math.floor(rand() * 28) + 1;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(rand() * 12)];
    const expired = month === "Jan" || month === "Feb";
    list.push({
      id: `CPN-${String(i).padStart(4, "0")}`,
      code: couponCodes[i % couponCodes.length],
      discount: rand() > 0.5 ? Math.floor(rand() * 40) + 10 : Math.floor(rand() * 200) + 50,
      discountType: rand() > 0.5 ? "PERCENTAGE" : "FIXED",
      minOrder: Math.floor(rand() * 500) + 100,
      maxUses: Math.floor(rand() * 500) + 50,
      usedCount: Math.floor(rand() * 300),
      status: expired ? "EXPIRED" : rand() > 0.2 ? "ACTIVE" : "DISABLED",
      expiresAt: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)]} ${day}, 2026`,
      createdAt: `${["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(rand() * 6)]} ${Math.floor(rand() * 28) + 1}, 2025`,
    });
  }
  return list;
}

export const coupons = generateCoupons(20);

// --- Settlements ---

export type SettlementStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface Settlement {
  id: string;
  vendorName: string;
  vendorInitials: string;
  amount: number;
  fee: number;
  netAmount: number;
  period: string;
  status: SettlementStatus;
  processedAt: string | null;
}

const vendorNames = [
  { name: "Fresh Meals", initials: "FM" },
  { name: "Spice House", initials: "SH" },
  { name: "Bistro Dhaka", initials: "BD" },
  { name: "Golden Wok", initials: "GW" },
  { name: "Pizza Nova", initials: "PN" },
  { name: "Curry Leaf", initials: "CL" },
  { name: "Sweet Tooth", initials: "ST" },
  { name: "The Kebab House", initials: "KH" },
];

const settlementStatuses: SettlementStatus[] = ["PENDING", "PENDING", "PROCESSING", "COMPLETED", "COMPLETED", "COMPLETED", "FAILED"];

function generateSettlements(count: number): Settlement[] {
  const list: Settlement[] = [];
  for (let i = 1; i <= count; i++) {
    const vendor = randomItem(vendorNames);
    const status = randomItem(settlementStatuses);
    const amount = Math.floor(rand() * 250000) + 15000;
    const fee = Math.floor(amount * (0.05 + rand() * 0.1));
    list.push({
      id: `STL-${String(i).padStart(4, "0")}`,
      vendorName: vendor.name,
      vendorInitials: vendor.initials,
      amount,
      fee,
      netAmount: amount - fee,
      period: `Week ${Math.floor(rand() * 4) + 1}, ${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)]} 2026`,
      status,
      processedAt: status === "COMPLETED" ? `${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)]} ${Math.floor(rand() * 28) + 1}, 2026` : null,
    });
  }
  return list;
}

export const settlements = generateSettlements(25);
