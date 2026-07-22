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
    list: (page: number, limit: number) => ["payments", "list", page, limit] as const,
    detail: (id: string) => ["payments", "detail", id] as const,
    methods: ["payment-methods"] as const,
  },
  foods: {
    all: ["foods"] as const,
    list: (page: number, limit: number) => ["foods", "list", page, limit] as const,
    bySlug: (slug: string) => ["foods", "slug", slug] as const,
  },
  categories: {
    all: ["food-categories"] as const,
  },
  reviews: {
    all: ["food-reviews"] as const,
    byFood: (foodId: string) => ["food-reviews", foodId] as const,
  },
  admin: {
    customers: {
      all: ["admin", "customers"] as const,
      list: (params?: Record<string, unknown>) => ["admin", "customers", "list", params] as const,
      detail: (id: string) => ["admin", "customers", id] as const,
      orders: (customerId: string, params?: Record<string, unknown>) =>
        ["admin", "customers", customerId, "orders", params] as const,
      subscriptions: (customerId: string, params?: Record<string, unknown>) =>
        ["admin", "customers", customerId, "subscriptions", params] as const,
      wallet: (customerId: string, params?: Record<string, unknown>) =>
        ["admin", "customers", customerId, "wallet", params] as const,
      payments: (customerId: string, params?: Record<string, unknown>) =>
        ["admin", "customers", customerId, "payments", params] as const,
    },
  },
  profile: {
    all: ["profile"] as const,
  },
};
