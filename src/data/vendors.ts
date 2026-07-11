// src/data/vendors.ts
export type Vendor = {
  id: string;
  name: string;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  kitchen: string;
  joined: string;
};

export const vendors: Vendor[] = [
  { id: "1", name: "Vendor A", status: "ACTIVE", kitchen: "Kitchen 1", joined: "2026-01-10" },
  { id: "2", name: "Vendor B", status: "PENDING", kitchen: "Kitchen 2", joined: "2026-03-15" },
];
