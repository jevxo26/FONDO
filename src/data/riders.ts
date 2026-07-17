function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(4192);

export type RiderStatus = "ACTIVE" | "BUSY" | "OFFLINE" | "ON_LEAVE";

export type RiderZone =
  | "Gulshan"
  | "Banani"
  | "Uttara"
  | "Mirpur"
  | "Dhanmondi"
  | "Mohammadpur"
  | "Motijheel"
  | "Bashundhara";

export interface Rider {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: RiderStatus;
  zone: RiderZone;
  vehicleType: string;
  totalDeliveries: number;
  rating: number;
  earnings: number;
  joinedDate: string;
  lastActive: string;
  completedToday: number;
}

const riderNames = [
  { name: "Hasan Ali", initials: "HA" },
  { name: "Mizanur Rahman", initials: "MR" },
  { name: "Shahriar Kabir", initials: "SK" },
  { name: "Jannatul Ferdous", initials: "JF" },
  { name: "Tahmina Akhtar", initials: "TA" },
  { name: "Rafiul Islam", initials: "RI" },
  { name: "Sharmin Sultana", initials: "SS" },
  { name: "Imran Hossain", initials: "IH" },
  { name: "Nadia Parvin", initials: "NP" },
  { name: "Tanvir Ahamed", initials: "TA" },
  { name: "Mehedi Hasan", initials: "MH" },
  { name: "Rokeya Begum", initials: "RB" },
  { name: "Sohel Rana", initials: "SR" },
  { name: "Akhi Rahman", initials: "AR" },
  { name: "Shakil Ahmed", initials: "SA" },
];

const zones: RiderZone[] = [
  "Gulshan", "Banani", "Uttara", "Mirpur",
  "Dhanmondi", "Mohammadpur", "Motijheel", "Bashundhara",
];

const vehicles = ["Bicycle", "Motorcycle", "Scooter", "Electric Bike"];

const statuses: RiderStatus[] = ["ACTIVE", "ACTIVE", "ACTIVE", "BUSY", "BUSY", "OFFLINE", "ON_LEAVE"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function generateRiders(count: number): Rider[] {
  const list: Rider[] = [];
  for (let i = 1; i <= count; i++) {
    const rider = randomItem(riderNames);
    const day = Math.floor(rand() * 28) + 1;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)];
    list.push({
      id: `RDR-${String(i).padStart(4, "0")}`,
      name: rider.name,
      phone: `+88017${String(Math.floor(rand() * 90000000) + 10000000)}`,
      email: `${rider.name.toLowerCase().replace(/\s+/g, ".")}@fondo.com`,
      status: randomItem(statuses),
      zone: randomItem(zones),
      vehicleType: randomItem(vehicles),
      totalDeliveries: Math.floor(rand() * 2000) + 50,
      rating: Number((3.5 + rand() * 1.5).toFixed(1)),
      earnings: Math.floor(rand() * 45000) + 5000,
      joinedDate: `${month} ${day}, 2026`,
      lastActive: `${Math.floor(rand() * 12) + 1} ${rand() > 0.5 ? "mins ago" : "hours ago"}`,
      completedToday: Math.floor(rand() * 12),
    });
  }
  return list;
}

export const riders = generateRiders(30);

// --- Live Tracking ---

export interface RiderLive {
  id: string;
  name: string;
  phone: string;
  status: RiderStatus;
  zone: RiderZone;
  currentOrder: string | null;
  lat: number;
  lng: number;
  lastUpdated: string;
  speed: string;
  eta: string;
  battery: number;
}

export const riderLiveData: RiderLive[] = riders.slice(0, 8).map((r, i) => ({
  id: r.id,
  name: r.name,
  phone: r.phone,
  status: i < 4 ? "ACTIVE" : "BUSY",
  zone: r.zone,
  currentOrder: i < 6 ? `#FONDO-${String(90000 + i * 3).slice(0, 5)}` : null,
  lat: 23.78 + rand() * 0.08,
  lng: 90.38 + rand() * 0.06,
  lastUpdated: `${Math.floor(rand() * 5) + 1} min ago`,
  speed: `${Math.floor(rand() * 25) + 5} km/h`,
  eta: `${Math.floor(rand() * 20) + 5} min`,
  battery: Math.floor(rand() * 60) + 40,
}));

// --- Performance ---

export interface RiderPerformanceData {
  id: string;
  name: string;
  deliveriesThisWeek: number;
  onTimeRate: number;
  avgRating: number;
  lateDeliveries: number;
  cancelledByRider: number;
  complaints: number;
  distanceCovered: string;
  status: RiderStatus;
}

const riderPerfNames = riderNames.slice(0, 12);

export const riderPerformanceData: RiderPerformanceData[] = riderPerfNames.map((r, i) => ({
  id: `RDR-${String(i + 1).padStart(4, "0")}`,
  name: r.name,
  deliveriesThisWeek: Math.floor(rand() * 60) + 10,
  onTimeRate: Number((80 + rand() * 20).toFixed(1)),
  avgRating: Number((3.5 + rand() * 1.5).toFixed(1)),
  lateDeliveries: Math.floor(rand() * 8),
  cancelledByRider: Math.floor(rand() * 3),
  complaints: Math.floor(rand() * 4),
  distanceCovered: `${Math.floor(rand() * 150) + 30} km`,
  status: rand() > 0.2 ? "ACTIVE" : "OFFLINE",
}));

// --- Earnings ---

export interface RiderEarning {
  id: string;
  name: string;
  weekEnding: string;
  deliveries: number;
  basePay: number;
  bonus: number;
  tips: number;
  total: number;
  status: "PAID" | "PENDING" | "PROCESSING";
}

const weekEndings = [
  "Jun 28, 2026", "Jul 5, 2026", "Jul 12, 2026", "Jul 19, 2026",
];

export const riderEarnings: RiderEarning[] = riderNames.slice(0, 15).flatMap((r, i) =>
  weekEndings.map((w, wi) => ({
    id: `ERN-${String(i * 4 + wi + 1).padStart(4, "0")}`,
    name: r.name,
    weekEnding: w,
    deliveries: Math.floor(rand() * 35) + 5,
    basePay: Math.floor(rand() * 8000) + 2000,
    bonus: Math.floor(rand() * 3000),
    tips: Math.floor(rand() * 1500),
    total: 0,
    status: (wi < 2 ? "PAID" : wi === 2 ? "PROCESSING" : "PENDING") as "PAID" | "PENDING" | "PROCESSING",
  })).map((e) => ({ ...e, total: e.basePay + e.bonus + e.tips })),
);

// --- Rider-Specific Delivery ---

export type DeliveryStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "ON_THE_WAY"
  | "ARRIVED"
  | "DELIVERED"
  | "FAILED"
  | "CANCELLED";

export interface RiderDelivery {
  id: string;
  deliveryCode: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  zone: RiderZone;
  items: string[];
  status: DeliveryStatus;
  estimatedDeliveryTime: string;
  actualPickupTime: string | null;
  actualDeliveryTime: string | null;
  priority: number;
  createdAt: string;
}

function generateDeliveries(count: number): RiderDelivery[] {
  const list: RiderDelivery[] = [];
  const customerNames = [
    "Rahim Uddin", "Karina Begum", "Faruk Hossain", "Shamim Akhtar",
    "Nasrin Sultana", "Jahangir Alam", "Sharmin Akhter", "Rafiq Hasan",
    "Tanvir Ahmed", "Nusrat Jahan",
  ];
  const addresses = [
    "House 12, Road 5, Gulshan 1",
    "Flat 3A, 45/B, Banani DOHS",
    "78 Shahid Sangbadik Sarak",
    "14/A, Mirpur 10, Block C",
    "House 45, Road 12, Dhanmondi 6A",
  ];
  const foodItems = [
    "Chicken Biryani", "Beef Curry", "Daal + Rice", "Paratha + Egg Curry",
    "Fish Fry + Rice", "Vegetable Khichuri", "Chicken Roast", "Polao + Beef",
  ];
  const statusPool: DeliveryStatus[] = [
    "ASSIGNED", "ACCEPTED", "PICKED_UP", "ON_THE_WAY",
    "DELIVERED", "DELIVERED", "DELIVERED", "DELIVERED",
  ];

  for (let i = 1; i <= count; i++) {
    const itemCount = Math.floor(rand() * 3) + 1;
    const items: string[] = [];
    for (let j = 0; j < itemCount; j++) {
      items.push(randomItem(foodItems));
    }
    const day = Math.floor(rand() * 28) + 1;
    const hour = Math.floor(rand() * 12) + 8;
    const min = Math.floor(rand() * 60);
    const status = randomItem(statusPool);
    list.push({
      id: `DEL-${String(i).padStart(4, "0")}`,
      deliveryCode: `FND-${String(80000 + i)}`,
      orderId: `#FONDO-${String(90000 + i)}`,
      customerName: randomItem(customerNames),
      customerPhone: `+88017${String(Math.floor(rand() * 90000000) + 10000000)}`,
      deliveryAddress: randomItem(addresses),
      zone: randomItem(zones),
      items,
      status,
      estimatedDeliveryTime: `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
      actualPickupTime: status !== "ASSIGNED" ? `${String(hour - 1).padStart(2, "0")}:${String(min).padStart(2, "0")}` : null,
      actualDeliveryTime: status === "DELIVERED" ? `${String(hour + 1).padStart(2, "0")}:${String(min).padStart(2, "0")}` : null,
      priority: Math.floor(rand() * 3),
      createdAt: `Jul ${day}, 2026`,
    });
  }
  return list;
}

export const riderDeliveries: RiderDelivery[] = generateDeliveries(25);

// --- Wallet ---

export interface RiderWallet {
  balance: number;
  holdBalance: number;
  currency: string;
}

export interface WalletTransaction {
  id: string;
  type: "CREDIT" | "DEBIT" | "WITHDRAWAL";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

function generateTransactions(count: number): WalletTransaction[] {
  let balance = 12500;
  const list: WalletTransaction[] = [];
  const days = ["Jun 28", "Jun 30", "Jul 2", "Jul 5", "Jul 8", "Jul 11", "Jul 14", "Jul 17", "Jul 19"];
  const types: ("CREDIT" | "DEBIT" | "WITHDRAWAL")[] = ["CREDIT", "CREDIT", "CREDIT", "DEBIT", "WITHDRAWAL"];

  for (let i = 0; i < count; i++) {
    const type = randomItem(types);
    const amount = type === "CREDIT" ? Math.floor(rand() * 3000) + 500 : Math.floor(rand() * 5000) + 1000;
    const bBefore = balance;
    balance = type === "CREDIT" ? balance + amount : balance - amount;
    list.push({
      id: `TXN-${String(i + 1).padStart(4, "0")}`,
      type,
      amount,
      balanceBefore: bBefore,
      balanceAfter: balance,
      description: type === "CREDIT" ? "Delivery payment" : type === "DEBIT" ? "Adjustment" : "Withdrawal to bKash",
      createdAt: randomItem(days),
    });
  }
  return list;
}

export const walletBalance: RiderWallet = {
  balance: 12500,
  holdBalance: 3200,
  currency: "BDT",
};

export const walletTransactions: WalletTransaction[] = generateTransactions(12);

// --- Ratings ---

export interface DeliveryRating {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  date: string;
}

const reviewTexts = [
  "Fast delivery, friendly rider!",
  "Food arrived hot and on time.",
  "Rider was polite and helpful.",
  "Delayed by 10 mins but good service.",
  "Excellent service, highly recommended.",
  "Package was handled with care.",
  "Very professional delivery.",
  "Called ahead to confirm address, appreciated!",
];

export const riderRatings: DeliveryRating[] = Array.from({ length: 8 }, (_, i) => ({
  id: `RAT-${String(i + 1).padStart(4, "0")}`,
  customerName: randomItem(["Rahim Uddin", "Karina Begum", "Faruk Hossain", "Shamim Akhtar", "Nasrin Sultana"]),
  rating: Math.floor(rand() * 2) + 4,
  review: randomItem(reviewTexts),
  date: `Jul ${Math.floor(rand() * 19) + 1}, 2026`,
}));

// --- Performance Metrics (rider's own) ---

export interface RiderOwnPerformance {
  totalDeliveries: number;
  completedDeliveries: number;
  cancelledDeliveries: number;
  averageDeliveryTime: string;
  averageRating: number;
  acceptanceRate: number;
  completionRate: number;
}

export const myPerformance: RiderOwnPerformance = {
  totalDeliveries: 847,
  completedDeliveries: 812,
  cancelledDeliveries: 12,
  averageDeliveryTime: "24 min",
  averageRating: 4.8,
  acceptanceRate: 96,
  completionRate: 95.9,
};
