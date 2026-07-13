// src/data/vendors.ts

export type Vendor = {
  id: string;
  name: string;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  kitchen: string;
  joined: string;
};

export const vendors: Vendor[] = [
  { id: "1", name: "Sultan's Dine", status: "ACTIVE", kitchen: "Dhanmondi Kitchen", joined: "2026-01-10" },
  { id: "2", name: "Kacchi Bhai", status: "PENDING", kitchen: "Banani Kitchen", joined: "2026-03-15" },
  { id: "3", name: "Star Kabab", status: "ACTIVE", kitchen: "Farmgate Outlet", joined: "2025-11-20" },
  { id: "4", name: "Zaman Heritage", status: "ACTIVE", kitchen: "Banani Branch", joined: "2026-02-01" },
  { id: "5", name: "Spice Garden", status: "SUSPENDED", kitchen: "Gulshan Outlet", joined: "2025-09-12" },
  { id: "6", name: "Sushi Master", status: "ACTIVE", kitchen: "Baridhara Central", joined: "2026-04-05" },
  { id: "7", name: "Pizza House", status: "PENDING", kitchen: "Uttara Hub", joined: "2026-06-18" },
  { id: "8", name: "Thai Orchid", status: "ACTIVE", kitchen: "Mohakhali Kitchen", joined: "2025-12-30" },
  { id: "9", name: "Burger King", status: "ACTIVE", kitchen: "Mirpur Branch", joined: "2026-01-22" },
  { id: "10", name: "Chinese Wok", status: "PENDING", kitchen: "Tejgaon Outlet", joined: "2026-07-01" },
  { id: "11", name: "Mediterranean Delight", status: "ACTIVE", kitchen: "Banani Central", joined: "2025-10-15" },
  { id: "12", name: "Tandoori Nights", status: "ACTIVE", kitchen: "Dhanmondi Hub", joined: "2026-03-01" },
  { id: "13", name: "Noodle Bar", status: "SUSPENDED", kitchen: "Gulshan 2", joined: "2025-08-05" },
  { id: "14", name: "Steak House", status: "PENDING", kitchen: "Baridhara Kitchen", joined: "2026-07-10" },
  { id: "15", name: "Coffee Shop", status: "ACTIVE", kitchen: "Uttara Branch", joined: "2026-05-20" },
];

// --- Pending Approval ---

export type PendingVendor = {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "Pending" | "Documents Pending" | "Approved" | "Rejected";
  applied: string;
};

export const pendingVendors: PendingVendor[] = [
  { id: "1", name: "Zaman Heritage", type: "Mughlai", location: "Banani, Dhaka", status: "Pending", applied: "2026-07-08" },
  { id: "2", name: "Kacchi Bhai Express", type: "Biryani", location: "Dhanmondi", status: "Documents Pending", applied: "2026-07-06" },
  { id: "3", name: "Spice Garden", type: "Indian", location: "Gulshan, Dhaka", status: "Pending", applied: "2026-07-05" },
  { id: "4", name: "Sushi Master", type: "Japanese", location: "Baridhara, Dhaka", status: "Approved", applied: "2026-07-03" },
  { id: "5", name: "Pizza House", type: "Italian", location: "Uttara, Dhaka", status: "Pending", applied: "2026-07-10" },
  { id: "6", name: "Thai Orchid", type: "Thai", location: "Mohakhali, Dhaka", status: "Documents Pending", applied: "2026-07-07" },
  { id: "7", name: "Burger King", type: "Fast Food", location: "Mirpur, Dhaka", status: "Approved", applied: "2026-07-01" },
  { id: "8", name: "Chinese Wok", type: "Chinese", location: "Tejgaon, Dhaka", status: "Pending", applied: "2026-07-11" },
  { id: "9", name: "Mediterranean Delight", type: "Mediterranean", location: "Banani, Dhaka", status: "Documents Pending", applied: "2026-07-04" },
  { id: "10", name: "Tandoori Nights", type: "Pakistani", location: "Dhanmondi", status: "Pending", applied: "2026-07-09" },
  { id: "11", name: "Noodle Bar", type: "Asian", location: "Gulshan, Dhaka", status: "Approved", applied: "2026-06-28" },
  { id: "12", name: "Steak House", type: "American", location: "Baridhara, Dhaka", status: "Pending", applied: "2026-07-12" },
  { id: "13", name: "Coffee Shop", type: "Cafe", location: "Uttara, Dhaka", status: "Documents Pending", applied: "2026-07-02" },
  { id: "14", name: "Ice Cream Parlor", type: "Dessert", location: "Mohakhali, Dhaka", status: "Pending", applied: "2026-07-10" },
  { id: "15", name: "Bakery Fresh", type: "Bakery", location: "Mirpur, Dhaka", status: "Approved", applied: "2026-06-30" },
];

// --- Vendor Performance ---

export type VendorPerformance = {
  id: string;
  name: string;
  kitchen: string;
  rating: number;
  orders: number;
  onTimeRate: number;
  complaints: number;
  status: "ACTIVE" | "SUSPENDED";
};

export const vendorPerformanceData: VendorPerformance[] = [
  { id: "1", name: "Sultan's Dine", kitchen: "Dhanmondi", rating: 4.9, orders: 2840, onTimeRate: 98, complaints: 2, status: "ACTIVE" },
  { id: "2", name: "Zaman Heritage", kitchen: "Banani", rating: 4.8, orders: 2100, onTimeRate: 96, complaints: 1, status: "ACTIVE" },
  { id: "3", name: "Star Kabab", kitchen: "Farmgate", rating: 4.7, orders: 1950, onTimeRate: 94, complaints: 4, status: "ACTIVE" },
  { id: "4", name: "Thai Orchid", kitchen: "Mohakhali", rating: 4.6, orders: 1720, onTimeRate: 93, complaints: 3, status: "ACTIVE" },
  { id: "5", name: "Burger King", kitchen: "Mirpur", rating: 4.5, orders: 1580, onTimeRate: 91, complaints: 5, status: "ACTIVE" },
  { id: "6", name: "Tandoori Nights", kitchen: "Dhanmondi", rating: 4.4, orders: 1430, onTimeRate: 89, complaints: 6, status: "ACTIVE" },
  { id: "7", name: "Mediterranean Delight", kitchen: "Banani", rating: 4.3, orders: 1200, onTimeRate: 87, complaints: 3, status: "ACTIVE" },
  { id: "8", name: "Coffee Shop", kitchen: "Uttara", rating: 4.2, orders: 980, onTimeRate: 85, complaints: 7, status: "SUSPENDED" },
  { id: "9", name: "Spice Garden", kitchen: "Gulshan", rating: 4.0, orders: 750, onTimeRate: 82, complaints: 9, status: "SUSPENDED" },
  { id: "10", name: "Noodle Bar", kitchen: "Gulshan", rating: 3.8, orders: 520, onTimeRate: 78, complaints: 12, status: "SUSPENDED" },
];

// --- Vendor Settlement ---

export type VendorSettlement = {
  id: string;
  vendor: string;
  branch: string;
  settlementId: string;
  date: string;
  amount: number;
  status: "Settled" | "Processing" | "Flagged";
};

export const vendorSettlements: VendorSettlement[] = [
  { id: "1", vendor: "Sultan's Dine", branch: "Dhanmondi Branch", settlementId: "SET-89218-23", date: "Oct 26, 2023", amount: 84200, status: "Settled" },
  { id: "2", vendor: "Kacchi Bhai", branch: "Banani Outlet", settlementId: "SET-89441-23", date: "Oct 27, 2023", amount: 120500, status: "Processing" },
  { id: "3", vendor: "Star Kabab", branch: "Farmgate", settlementId: "SET-89112-23", date: "Oct 25, 2023", amount: 45900, status: "Flagged" },
  { id: "4", vendor: "Zaman Heritage", branch: "Banani Branch", settlementId: "SET-89345-23", date: "Oct 28, 2023", amount: 210000, status: "Settled" },
  { id: "5", vendor: "Spice Garden", branch: "Gulshan Outlet", settlementId: "SET-89776-23", date: "Oct 29, 2023", amount: 156800, status: "Processing" },
  { id: "6", vendor: "Sushi Master", branch: "Baridhara", settlementId: "SET-89123-23", date: "Oct 24, 2023", amount: 67300, status: "Settled" },
  { id: "7", vendor: "Thai Orchid", branch: "Mohakhali", settlementId: "SET-89456-23", date: "Oct 30, 2023", amount: 92400, status: "Flagged" },
  { id: "8", vendor: "Tandoori Nights", branch: "Dhanmondi", settlementId: "SET-89678-23", date: "Oct 31, 2023", amount: 178900, status: "Processing" },
  { id: "9", vendor: "Burger King", branch: "Mirpur", settlementId: "SET-89712-23", date: "Nov 01, 2023", amount: 53400, status: "Settled" },
  { id: "10", vendor: "Coffee Shop", branch: "Uttara", settlementId: "SET-89901-23", date: "Nov 02, 2023", amount: 28700, status: "Processing" },
];

// --- Approval dialog utilities (kept for backward compat with dialog component) ---

export type ApprovalVendor = PendingVendor;

export const documents = [
  { name: "Trade_License_2024.pdf", size: "2.4 MB", date: "2024-01-15" },
  { name: "Tax_Certificate_2023.pdf", size: "1.8 MB", date: "2024-01-15" },
  { name: "Bank_Statement.pdf", size: "3.2 MB", date: "2024-01-14" },
  { name: "Menu_Catalog.pdf", size: "5.6 MB", date: "2024-01-14" },
  { name: "Health_Certificate.pdf", size: "1.2 MB", date: "2024-01-13" },
];

export function getStatusVariant(status: string) {
  switch (status) {
    case "Approved": return "default";
    case "Rejected": return "destructive";
    case "Documents Pending": return "secondary";
    default: return "outline";
  }
}

export function getInitials(name: string) {
  return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
}
