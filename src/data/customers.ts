export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE";
  totalOrders: number;
  walletBalance: number;
  lastActive: string;
}

export interface Transaction {
  id: string;
  type: "CREDIT" | "DEBIT";
  title: string;
  description: string;
  amount: number;
  time: string;
}

export const customers: Customer[] = [
  {
    id: "USR-29041",
    fullName: "Tasnim Jahan",
    phone: "+8801712345678",
    email: "tasnim@email.com",
    status: "ACTIVE",
    totalOrders: 142,
    walletBalance: 12450,
    lastActive: "2 hours ago",
  },
  {
    id: "USR-31022",
    fullName: "Fahim Ahmed",
    phone: "+8801712345679",
    email: "fahim@email.com",
    status: "ACTIVE",
    totalOrders: 58,
    walletBalance: 4200,
    lastActive: "1 day ago",
  },
  {
    id: "USR-42110",
    fullName: "Mahmud Hassan",
    phone: "+8801712345680",
    email: "mahmud@email.com",
    status: "ACTIVE",
    totalOrders: 210,
    walletBalance: 28150,
    lastActive: "15 mins ago",
  },
  {
    id: "USR-55928",
    fullName: "Sarah Karim",
    phone: "+8801712345681",
    email: "sarah@email.com",
    status: "SUSPENDED",
    totalOrders: 12,
    walletBalance: 1050,
    lastActive: "4 days ago",
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: "TRX-9011",
    type: "CREDIT",
    title: "Wallet Top-up",
    description: "Tasnim J.",
    amount: 5000,
    time: "12:45 PM",
  },
  {
    id: "TRX-9012",
    type: "DEBIT",
    title: "Order Payment",
    description: "Fahim A.",
    amount: 1850,
    time: "11:20 AM",
  },
  {
    id: "TRX-9013",
    type: "CREDIT",
    title: "Reward Credits",
    description: "Loyalty - Mahmud H.",
    amount: 250,
    time: "Yesterday",
  },
];
