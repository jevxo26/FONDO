export const queryKeys = {
  cart: { all: ["cart"] as const },
  favorites: { all: ["favorites"] as const },
  addresses: { all: ["addresses"] as const },
  orders: { all: ["orders"] as const },
  order: (id: string) => ["orders", id] as const,
  foods: {
    all: ["foods"] as const,
    list: (params?: Record<string, unknown>) => ["foods", "list", params] as const,
    bySlug: (slug: string) => ["foods", slug] as const,
    byId: (id: string) => ["foods", id] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: (params?: Record<string, unknown>) => ["categories", "list", params] as const,
  },
  profile: ["profile"] as const,
};
