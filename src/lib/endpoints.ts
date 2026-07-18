export const API = {
  // Food catalog
  FOODS: "/api/foods",
  FOOD_DETAILS: (id: string) => `/api/foods/${id}`,
  FOOD_BY_SLUG: (slug: string) => `/api/foods/slug/${slug}`,
  FOOD_CATEGORIES: "/api/foods/categories/list",
  FOOD_TAGS: "/api/foods/tags/list",
  FOOD_FAVORITE: (foodId: string) => `/api/foods/${foodId}/favorite`,
  FOOD_FAVORITES_LIST: "/api/foods/favorites",

  // Auth
  AUTH_LOGIN: "/api/auth/login",
  AUTH_REGISTER: "/api/auth/register",
  AUTH_LOGOUT: "/api/auth/logout",
  AUTH_ME: "/api/auth/me",
  AUTH_REFRESH: "/api/auth/refresh",
  AUTH_CHANGE_PASSWORD: "/api/auth/change-password",

  // User profile
  USER_UPDATE: "/api/users/me",
  USER_ADDRESSES: "/api/users/me/addresses",
  USER_ADDRESS: (id: string) => `/api/users/me/addresses/${id}`,
  USER_ADDRESS_DEFAULT: (id: string) => `/api/users/me/addresses/${id}/default`,

  // Cart
  CART: "/api/cart",
  CART_ITEMS: "/api/cart/items",
  CART_ITEM: (id: string) => `/api/cart/items/${id}`,
  CART_ITEM_ADDONS: (itemId: string) => `/api/cart/items/${itemId}/addons`,
  CART_ADDON: (id: string) => `/api/cart/addons/${id}`,
  CART_MEALS: "/api/cart/meals",
  CART_MEAL: (id: string) => `/api/cart/meals/${id}`,
  CART_MEAL_FOODS: (mealId: string) => `/api/cart/meals/${mealId}/foods`,
  CART_MEAL_FOOD: (mealId: string, foodId: string) => `/api/cart/meals/${mealId}/foods/${foodId}`,
  CART_CHECKOUT: "/api/cart/checkout",
  CART_APPLY_COUPON: "/api/cart/checkout/apply-coupon",
  CART_REMOVE_COUPON: "/api/cart/checkout/remove-coupon",
  CART_SELECT_ADDRESS: "/api/cart/checkout/select-address",
  CART_PLACE_ORDER: "/api/cart/checkout/place-order",

  // Orders
  ORDERS: "/api/orders",
  ORDER: (id: string) => `/api/orders/${id}`,
  ORDER_CANCEL: (id: string) => `/api/orders/${id}/cancel`,

  // Wallet
  WALLET: "/api/wallet",
  WALLET_TRANSACTIONS: "/api/wallet/transactions",
  WALLET_TOPUP: "/api/wallet/topup",
  WALLET_WITHDRAW: "/api/wallet/withdraw",
  WALLET_WITHDRAW_APPROVE: (id: string) => `/api/wallet/withdraw/${id}/approve`,

  // Payments
  PAYMENT_METHODS: "/api/payment-methods",
  PAYMENTS: "/api/payments",
  PAYMENT: (id: string) => `/api/payments/${id}`,
  PAYMENT_INITIATE: "/api/payments/initiate",
  PAYMENT_RETRY: (id: string) => `/api/payments/${id}/retry`,
  PAYMENT_REFUND: (id: string) => `/api/payments/${id}/refund`,
};
