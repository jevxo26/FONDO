export const TAG_TYPES = [
  "Cart",
  "Order",
  "Favorite",
  "Food",
  "Category",
  "Address",
  "Payment",
  "PaymentMethod",
  "Profile",
  "Review",
  "AdminCustomer",
  "Wallet",
  "Coupon",
] as const;

export type TagType = (typeof TAG_TYPES)[number];
