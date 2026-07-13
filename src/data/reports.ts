function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(6318);

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

// --- Sales ---

export type SalesChannel = "ONLINE" | "DINE_IN" | "CATERING";

export interface SalesEntry {
  id: string;
  date: string;
  channel: SalesChannel;
  orders: number;
  revenue: number;
  cost: number;
  profit: number;
  status: "COMPLETED" | "PENDING" | "CANCELLED";
}

const channels: SalesChannel[] = ["ONLINE", "ONLINE", "ONLINE", "DINE_IN", "CATERING"];
const salesStatuses = ["COMPLETED", "COMPLETED", "COMPLETED", "PENDING", "CANCELLED"];

function generateSalesEntries(count: number): SalesEntry[] {
  const list: SalesEntry[] = [];
  for (let i = 1; i <= count; i++) {
    const day = Math.floor(rand() * 30) + 1;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(rand() * 12)];
    const revenue = Math.floor(rand() * 80000) + 5000;
    const cost = Math.floor(revenue * (0.4 + rand() * 0.3));
    list.push({
      id: `SAL-${String(i).padStart(4, "0")}`,
      date: `${month} ${day}, 2026`,
      channel: randomItem(channels),
      orders: Math.floor(rand() * 60) + 5,
      revenue,
      cost,
      profit: revenue - cost,
      status: randomItem(salesStatuses) as "COMPLETED" | "PENDING" | "CANCELLED",
    });
  }
  return list;
}

export const salesEntries = generateSalesEntries(35);

// --- Revenue ---

export type RevenueSource = "PLATFORM_FEE" | "DELIVERY_FEE" | "COMMISSION" | "SUBSCRIPTION" | "ADVERTISING";

export interface RevenueEntry {
  id: string;
  source: RevenueSource;
  amount: number;
  date: string;
  status: "SETTLED" | "PENDING" | "DISPUTED";
}

const revenueSources: RevenueSource[] = ["PLATFORM_FEE", "PLATFORM_FEE", "DELIVERY_FEE", "DELIVERY_FEE", "COMMISSION", "COMMISSION", "SUBSCRIPTION", "ADVERTISING"];
const revenueStatuses = ["SETTLED", "SETTLED", "SETTLED", "PENDING", "PENDING", "DISPUTED"];

function generateRevenueEntries(count: number): RevenueEntry[] {
  const list: RevenueEntry[] = [];
  for (let i = 1; i <= count; i++) {
    const day = Math.floor(rand() * 28) + 1;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)];
    list.push({
      id: `REV-${String(i).padStart(4, "0")}`,
      source: randomItem(revenueSources),
      amount: Math.floor(rand() * 50000) + 2000,
      date: `${month} ${day}, 2026`,
      status: randomItem(revenueStatuses) as "SETTLED" | "PENDING" | "DISPUTED",
    });
  }
  return list;
}

export const revenueEntries = generateRevenueEntries(30);

// --- Vendor Reports ---

export interface VendorReportEntry {
  id: string;
  vendorName: string;
  totalOrders: number;
  revenue: number;
  commission: number;
  rating: number;
  status: "ACTIVE" | "SUSPENDED" | "PENDING";
  lastPayout: string;
}

const vendorNamesForReport = [
  "Fresh Meals", "Spice House", "Bistro Dhaka", "Golden Wok",
  "Pizza Nova", "Curry Leaf", "Sweet Tooth", "The Kebab House",
  "Tandoori Nights", "Sushi Zen", "Green Bowl", "Burger Lab",
];

const vendorReportStatuses = ["ACTIVE", "ACTIVE", "ACTIVE", "ACTIVE", "SUSPENDED", "PENDING"];

export const vendorReportData: VendorReportEntry[] = vendorNamesForReport.map((name, i) => {
  const revenue = Math.floor(rand() * 400000) + 20000;
  return {
    id: `VRP-${String(i + 1).padStart(4, "0")}`,
    vendorName: name,
    totalOrders: Math.floor(rand() * 300) + 20,
    revenue,
    commission: Math.floor(revenue * (0.1 + rand() * 0.05)),
    rating: Number((3.0 + rand() * 2.0).toFixed(1)),
    status: randomItem(vendorReportStatuses) as "ACTIVE" | "SUSPENDED" | "PENDING",
    lastPayout: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)]} ${Math.floor(rand() * 28) + 1}, 2026`,
  };
});

// --- Rider Reports ---

export interface RiderReportEntry {
  id: string;
  riderName: string;
  deliveries: number;
  onTime: number;
  late: number;
  rating: number;
  earnings: number;
  status: "ACTIVE" | "INACTIVE";
}

const riderNamesForReport = [
  "Hasan Ali", "Mizanur Rahman", "Shahriar Kabir", "Jannatul Ferdous",
  "Tahmina Akhtar", "Rafiul Islam", "Sharmin Sultana", "Imran Hossain",
  "Nadia Parvin", "Tanvir Ahamed", "Mehedi Hasan", "Rokeya Begum",
];

export const riderReportData: RiderReportEntry[] = riderNamesForReport.map((name, i) => {
  const total = Math.floor(rand() * 200) + 20;
  const late = Math.floor(rand() * 15);
  return {
    id: `RRP-${String(i + 1).padStart(4, "0")}`,
    riderName: name,
    deliveries: total,
    onTime: total - late,
    late,
    rating: Number((3.5 + rand() * 1.5).toFixed(1)),
    earnings: Math.floor(rand() * 30000) + 5000,
    status: rand() > 0.15 ? "ACTIVE" : "INACTIVE",
  };
});

// --- Customer Reports ---

export type CustomerSegment = "ACTIVE" | "AT_RISK" | "CHURNED" | "NEW";

export interface CustomerReportEntry {
  id: string;
  customerName: string;
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrderDate: string;
  segment: CustomerSegment;
  lifetimeDays: number;
}

const customerNamesForReport = [
  "Tasnim Jahan", "Fahim Ahmed", "Mahmud Hassan", "Sarah Karim",
  "Rafiq Hasan", "Nusrat Jahan", "Kazi Fahim", "Sadia Islam",
  "Tanvir Ahmed", "Farzana Rahman", "Mehedi Hasan", "Arif Molla",
  "Jannatul Ferdous", "Sumi Khatun", "Rahim Uddin",
];

const segments: CustomerSegment[] = ["ACTIVE", "ACTIVE", "ACTIVE", "ACTIVE", "AT_RISK", "AT_RISK", "CHURNED", "NEW", "NEW"];

export const customerReportData: CustomerReportEntry[] = customerNamesForReport.map((name, i) => {
  const orders = Math.floor(rand() * 80) + 1;
  const avgValue = Math.floor(rand() * 800) + 200;
  return {
    id: `CRP-${String(i + 1).padStart(4, "0")}`,
    customerName: name,
    totalOrders: orders,
    totalSpent: orders * avgValue,
    avgOrderValue: avgValue,
    lastOrderDate: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)]} ${Math.floor(rand() * 28) + 1}, 2026`,
    segment: randomItem(segments),
    lifetimeDays: Math.floor(rand() * 400) + 10,
  };
});

// --- Subscription Reports ---

export interface SubscriptionReportEntry {
  id: string;
  customerName: string;
  plan: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED" | "RENEWED";
  autoRenew: boolean;
}

const plans = [
  "7-Day Wellness", "10-Day Balanced", "15-Day High Protein",
  "Monthly Regular", "Monthly Premium",
];

const subStatuses = ["ACTIVE", "ACTIVE", "ACTIVE", "EXPIRED", "EXPIRED", "CANCELLED", "RENEWED", "RENEWED"];

const subCustomerNames = customerNamesForReport.slice(0, 12);

export const subscriptionReportData: SubscriptionReportEntry[] = subCustomerNames.map((name, i) => {
  const plan = randomItem(plans);
  const price = plan === "Monthly Premium" ? 24000 : plan === "Monthly Regular" ? 18000 : plan === "15-Day High Protein" ? 11250 : plan === "10-Day Balanced" ? 6500 : 4550;
  const status = randomItem(subStatuses) as "ACTIVE" | "EXPIRED" | "CANCELLED" | "RENEWED";
  return {
    id: `SUB-${String(i + 1).padStart(4, "0")}`,
    customerName: name,
    plan,
    startDate: `${["Jan", "Feb", "Mar"][Math.floor(rand() * 3)]} ${Math.floor(rand() * 28) + 1}, 2026`,
    endDate: `${["Mar", "Apr", "May", "Jun"][Math.floor(rand() * 4)]} ${Math.floor(rand() * 28) + 1}, 2026`,
    amount: price,
    status,
    autoRenew: status === "ACTIVE" || status === "RENEWED" ? rand() > 0.3 : false,
  };
});

// --- Inventory Reports ---

export interface InventoryReportEntry {
  id: string;
  itemName: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  usageRate: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" | "OVERSTOCKED";
  lastRestocked: string;
}

const inventoryItems = [
  { name: "Basmati Rice (5kg)", category: "Grains", unit: "kg" },
  { name: "Chicken Breast", category: "Meat", unit: "kg" },
  { name: "Mutton Shoulder", category: "Meat", unit: "kg" },
  { name: "Beef Boneless", category: "Meat", unit: "kg" },
  { name: "Tomato", category: "Vegetables", unit: "kg" },
  { name: "Onion", category: "Vegetables", unit: "kg" },
  { name: "Potato", category: "Vegetables", unit: "kg" },
  { name: "Garlic Paste", category: "Spices", unit: "kg" },
  { name: "Ginger Paste", category: "Spices", unit: "kg" },
  { name: "Cooking Oil (5L)", category: "Oils", unit: "liters" },
  { name: "Butter (500g)", category: "Dairy", unit: "pieces" },
  { name: "Cheese Block (1kg)", category: "Dairy", unit: "pieces" },
  { name: "Yogurt (2kg)", category: "Dairy", unit: "kg" },
  { name: "Eggs (30pc)", category: "Dairy", unit: "pieces" },
  { name: "Flour (2kg)", category: "Grains", unit: "kg" },
  { name: "Sugar (1kg)", category: "Spices", unit: "kg" },
  { name: "Salt (1kg)", category: "Spices", unit: "kg" },
  { name: "Turmeric Powder", category: "Spices", unit: "kg" },
  { name: "Chili Powder", category: "Spices", unit: "kg" },
  { name: "Cumin Seeds", category: "Spices", unit: "kg" },
  { name: "Cardamom", category: "Spices", unit: "kg" },
  { name: "Cinnamon Sticks", category: "Spices", unit: "kg" },
  { name: "Bay Leaves", category: "Spices", unit: "kg" },
  { name: "Green Chili", category: "Vegetables", unit: "kg" },
  { name: "Coriander Leaves", category: "Vegetables", unit: "kg" },
  { name: "Lemon", category: "Vegetables", unit: "pieces" },
  { name: "Soy Sauce (1L)", category: "Condiments", unit: "liters" },
  { name: "Vinegar (500ml)", category: "Condiments", unit: "liters" },
  { name: "Ketchup (1kg)", category: "Condiments", unit: "kg" },
  { name: "Mayonnaise (500g)", category: "Condiments", unit: "pieces" },
];

const invStatuses = ["IN_STOCK", "IN_STOCK", "IN_STOCK", "IN_STOCK", "LOW_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "OVERSTOCKED"];

export const inventoryReportData: InventoryReportEntry[] = inventoryItems.map((item, i) => {
  const stock = Math.floor(rand() * 80);
  const min = 5 + Math.floor(rand() * 15);
  return {
    id: `INV-${String(i + 1).padStart(4, "0")}`,
    itemName: item.name,
    category: item.category,
    currentStock: stock,
    minStock: min,
    unit: item.unit,
    usageRate: Number((1 + rand() * 8).toFixed(1)),
    status: stock === 0 ? "OUT_OF_STOCK" : stock < min ? "LOW_STOCK" : stock > min * 3 ? "OVERSTOCKED" : "IN_STOCK",
    lastRestocked: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][Math.floor(rand() * 6)]} ${Math.floor(rand() * 28) + 1}, 2026`,
  };
});
