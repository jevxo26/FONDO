export type FulfillmentType = "delivery" | "pickup";
export type PaymentMethodType = "online" | "bkash" | "nagad" | "cod";

export interface CheckoutFormData {
  fulfillment: FulfillmentType;
  addressId?: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  recipientName: string;
  phoneNumber: string;
  paymentMethod: PaymentMethodType;
  orderNotes: string;
  couponCode?: string;
}
