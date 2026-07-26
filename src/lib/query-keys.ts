export const queryKeys = {
  cart: {
    all: ["cart"] as const,
  },
  orders: {
    all: ["orders"] as const,
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
  },
  payments: {
    all: ["payments"] as const,
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
      detail: (id: string) => ["admin", "customers", id] as const,
      orders: (customerId: string) => ["admin", "customers", customerId, "orders"] as const,
      subscriptions: (customerId: string) => ["admin", "customers", customerId, "subscriptions"] as const,
      wallet: (customerId: string) => ["admin", "customers", customerId, "wallet"] as const,
      payments: (customerId: string) => ["admin", "customers", customerId, "payments"] as const,
    },
  },
  profile: {
    all: ["profile"] as const,
  },
};
