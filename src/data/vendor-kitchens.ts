// src/data/vendor-kitchens.ts
export interface VendorKitchen {
  id: string;
  name: string;
  code: string;
  branch: string;
  branchId: string;
  capacity: number;
  currentLoad: number;
  preparationTime: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  headChef: string;
  staffCount: number;
  dailyOrders: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export const branches = [
  { value: "dhanmondi", label: "Dhanmondi" },
  { value: "banani", label: "Banani" },
  { value: "gulshan", label: "Gulshan" },
  { value: "mirpur", label: "Mirpur" },
  { value: "uttara", label: "Uttara" },
  { value: "farmgate", label: "Farmgate" },
  { value: "baridhara", label: "Baridhara" },
  { value: "mohakhali", label: "Mohakhali" },
  { value: "tejgaon", label: "Tejgaon" },
];

export const kitchenStatuses = [
  { value: "ALL", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "MAINTENANCE", label: "Maintenance" },
];

export function getKitchenStatusBadge(status: VendorKitchen["status"]) {
  switch (status) {
    case "ACTIVE":
      return {
        label: "Active",
        className: "border-green-500 text-green-600 dark:text-green-400 ring-green-500/20",
      };
    case "INACTIVE":
      return {
        label: "Inactive",
        className: "border-red-500 text-red-600 dark:text-red-400 ring-red-500/20",
      };
    case "MAINTENANCE":
      return {
        label: "Maintenance",
        className: "border-yellow-500 text-yellow-600 dark:text-yellow-400 ring-yellow-500/20",
      };
    default:
      return {
        label: "Unknown",
        className: "border-gray-500 text-gray-600 dark:text-gray-400 ring-gray-500/20",
      };
  }
}

export const vendorKitchens: VendorKitchen[] = [
  {
    id: "1",
    name: "Dhanmondi Kitchen",
    code: "KCH-001",
    branch: "Dhanmondi",
    branchId: "branch_1",
    capacity: 50,
    currentLoad: 35,
    preparationTime: 25,
    status: "ACTIVE",
    headChef: "Chef Rahman",
    staffCount: 12,
    dailyOrders: 85,
    rating: 4.8,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Banani Kitchen",
    code: "KCH-002",
    branch: "Banani",
    branchId: "branch_2",
    capacity: 40,
    currentLoad: 20,
    preparationTime: 30,
    status: "ACTIVE",
    headChef: "Chef Hasan",
    staffCount: 8,
    dailyOrders: 60,
    rating: 4.5,
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-06-19T14:30:00Z",
  },
  {
    id: "3",
    name: "Gulshan Kitchen",
    code: "KCH-003",
    branch: "Gulshan",
    branchId: "branch_3",
    capacity: 60,
    currentLoad: 55,
    preparationTime: 20,
    status: "ACTIVE",
    headChef: "Chef Ahmed",
    staffCount: 15,
    dailyOrders: 120,
    rating: 4.9,
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-06-18T14:30:00Z",
  },
  {
    id: "4",
    name: "Mirpur Kitchen",
    code: "KCH-004",
    branch: "Mirpur",
    branchId: "branch_4",
    capacity: 30,
    currentLoad: 10,
    preparationTime: 35,
    status: "INACTIVE",
    headChef: "Chef Islam",
    staffCount: 5,
    dailyOrders: 20,
    rating: 3.8,
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-05-15T14:30:00Z",
  },
  {
    id: "5",
    name: "Uttara Kitchen",
    code: "KCH-005",
    branch: "Uttara",
    branchId: "branch_5",
    capacity: 45,
    currentLoad: 42,
    preparationTime: 22,
    status: "MAINTENANCE",
    headChef: "Chef Ali",
    staffCount: 10,
    dailyOrders: 70,
    rating: 4.2,
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-06-17T14:30:00Z",
  },
  {
    id: "6",
    name: "Farmgate Kitchen",
    code: "KCH-006",
    branch: "Farmgate",
    branchId: "branch_6",
    capacity: 35,
    currentLoad: 25,
    preparationTime: 28,
    status: "ACTIVE",
    headChef: "Chef Khan",
    staffCount: 7,
    dailyOrders: 45,
    rating: 4.3,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-16T14:30:00Z",
  },
  {
    id: "7",
    name: "Baridhara Kitchen",
    code: "KCH-007",
    branch: "Baridhara",
    branchId: "branch_7",
    capacity: 55,
    currentLoad: 48,
    preparationTime: 18,
    status: "ACTIVE",
    headChef: "Chef Mia",
    staffCount: 14,
    dailyOrders: 110,
    rating: 4.7,
    createdAt: "2024-07-01T10:00:00Z",
    updatedAt: "2024-08-20T14:30:00Z",
  },
  {
    id: "8",
    name: "Mohakhali Kitchen",
    code: "KCH-008",
    branch: "Mohakhali",
    branchId: "branch_8",
    capacity: 25,
    currentLoad: 8,
    preparationTime: 40,
    status: "INACTIVE",
    headChef: "Chef Sultana",
    staffCount: 4,
    dailyOrders: 15,
    rating: 3.5,
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-09-10T14:30:00Z",
  },
  {
    id: "9",
    name: "Tejgaon Kitchen",
    code: "KCH-009",
    branch: "Tejgaon",
    branchId: "branch_9",
    capacity: 50,
    currentLoad: 38,
    preparationTime: 25,
    status: "ACTIVE",
    headChef: "Chef Hossain",
    staffCount: 11,
    dailyOrders: 90,
    rating: 4.6,
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2024-10-05T14:30:00Z",
  },
];