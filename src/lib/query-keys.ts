export const queryKeys = {
  cart: {
    all: ["cart"] as const,
  },
  orders: {
    all: ["orders"] as const,
    list: (page: number, limit: number) => ["orders", "list", page, limit] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
  },
  favorites: {
    all: ["favorites"] as const,
  },
  addresses: {
    all: ["addresses"] as const,
  },
  wallet: {
    all: ["wallet"] as const,
    transactions: (page: number, limit: number) => ["wallet", "transactions", page, limit] as const,
  },
  payments: {
    all: ["payments"] as const,
    methods: ["payment-methods"] as const,
  },
};
