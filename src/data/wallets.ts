function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(4731);

export type TxnType = "TOPUP" | "PURCHASE" | "REFUND" | "ADJUSTMENT" | "CREDIT" | "DEBIT";

export type WalletStatus = "COMPLETED" | "PENDING" | "FAILED" | "REVERSED";

export interface WalletTransaction {
  id: string;
  walletId: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  transactionType: TxnType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceType: string;
  referenceId: string;
  status: WalletStatus;
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

const txnTypes: TxnType[] = ["TOPUP", "PURCHASE", "REFUND", "ADJUSTMENT", "CREDIT", "DEBIT"];

const statuses: WalletStatus[] = [
  "COMPLETED", "COMPLETED", "COMPLETED", "COMPLETED", "COMPLETED",
  "PENDING", "FAILED", "REVERSED",
];

const referenceTypes = ["Order", "Topup", "Reward", "Subscription", "Refund"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function generateTransactions(count: number): WalletTransaction[] {
  const txns: WalletTransaction[] = [];
  let balance = 50000;
  for (let i = 1; i <= count; i++) {
    const customer = randomItem(customerNames);
    const txnType = randomItem(txnTypes);
    const status = randomItem(statuses);
    const amount = txnType === "TOPUP" || txnType === "CREDIT" || txnType === "REFUND"
      ? Math.floor(rand() * 10000) + 200
      : Math.floor(rand() * 5000) + 100;
    const balanceBefore = balance;
    const isCredit = ["TOPUP", "CREDIT", "REFUND"].includes(txnType);
    balance = isCredit ? balance + amount : balance - amount;
    if (balance < 0) balance = 0;
    const day = Math.floor(rand() * 28) + 1;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(rand() * 12)];
    const hour = String(Math.floor(rand() * 24)).padStart(2, "0");
    const minute = String(Math.floor(rand() * 60)).padStart(2, "0");
    txns.push({
      id: `WTX-${String(i).padStart(4, "0")}`,
      walletId: `WAL-${String(1000 + Math.floor(rand() * 9000))}`,
      customerId: `USR-${String(29000 + i).slice(0, 5)}`,
      customerName: customer.name,
      customerInitials: customer.initials,
      transactionType: txnType,
      amount,
      balanceBefore,
      balanceAfter: balance,
      referenceType: randomItem(referenceTypes),
      referenceId: `REF-${String(80000 + i).slice(0, 5)}`,
      status,
      timestamp: `${month} ${day}, 2026 • ${hour}:${minute}`,
    });
  }
  return txns;
}

export const walletTransactions = generateTransactions(50);
