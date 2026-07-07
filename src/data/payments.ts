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

const statuses: PaymentStatus[] = ["SUCCESS", "SUCCESS", "SUCCESS", "SUCCESS", "SUCCESS", "FAILED", "REFUNDED"];

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
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(rand() * 12)];
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
