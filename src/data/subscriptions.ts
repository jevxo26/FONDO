export type SubscriptionStatus =
  | "PENDING"
  | "ACTIVE"
  | "PAUSED"
  | "FROZEN"
  | "COMPLETED"
  | "EXPIRED"
  | "CANCELLED";

export interface Subscription {
  id: string;
  subscriptionNumber: string;
  customerId: string;
  customerName: string;
  packageId: string;
  packageName: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  autoRenew: boolean;
  currentCycle: number;
}

const customerNames = [
  "Tasnim Jahan", "Fahim Ahmed", "Mahmud Hassan", "Sarah Karim",
  "Rafiq Hasan", "Nusrat Jahan", "Kazi Fahim", "Sadia Islam",
  "Tanvir Ahmed", "Farzana Rahman", "Hasan Ali", "Jannatul Ferdous",
  "Mizanur Rahman", "Tahmina Akhtar", "Shahriar Kabir",
];

const packages = [
  { name: "7-Day Wellness", duration: 7, price: 4550 },
  { name: "10-Day Balanced", duration: 10, price: 6500 },
  { name: "15-Day High Protein", duration: 15, price: 11250 },
  { name: "Monthly Regular", duration: 30, price: 18000 },
  { name: "Monthly Premium", duration: 30, price: 24000 },
];

const statuses: SubscriptionStatus[] = [
  "ACTIVE", "ACTIVE", "ACTIVE", "ACTIVE",
  "PAUSED", "PAUSED",
  "COMPLETED", "COMPLETED",
  "PENDING",
  "EXPIRED",
  "CANCELLED",
  "FROZEN",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSubscriptions(count: number): Subscription[] {
  const subs: Subscription[] = [];
  for (let i = 1; i <= count; i++) {
    const pkg = randomItem(packages);
    const status = randomItem(statuses);
    const paid = status === "ACTIVE" || status === "COMPLETED"
      ? pkg.price
      : status === "PAUSED"
        ? Math.floor(pkg.price * 0.6)
        : Math.floor(pkg.price * (status === "PENDING" ? 0 : Math.random()));
    subs.push({
      id: `SUB-${String(i).padStart(4, "0")}`,
      subscriptionNumber: `#SUB-${String(i).padStart(5, "0")}`,
      customerId: `USR-${String(29000 + i).slice(0, 5)}`,
      customerName: randomItem(customerNames),
      packageId: `PKG-${String(packages.indexOf(pkg) + 1).padStart(3, "0")}`,
      packageName: pkg.name,
      durationDays: pkg.duration,
      startDate: `${Math.floor(Math.random() * 28) + 1} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(Math.random() * 6)]}, 2026`,
      endDate: `${Math.floor(Math.random() * 28) + 1} ${["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(Math.random() * 6)]}, 2026`,
      status,
      totalAmount: pkg.price,
      paidAmount: paid,
      remainingAmount: pkg.price - paid,
      autoRenew: Math.random() > 0.5,
      currentCycle: Math.floor(Math.random() * 3) + 1,
    });
  }
  return subs;
}

export const subscriptions = generateSubscriptions(50);
