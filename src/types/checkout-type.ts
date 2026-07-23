export type FulfillmentType = "delivery" | "pickup";
export type AddressLabel = "Home" | "Office" | "Other";

export interface CheckoutFormData {
  fulfillment: FulfillmentType;
<<<<<<< Updated upstream
  streetAddress: string;
  city: string;
  zipCode: string;
  recipientName: string;
  phoneNumber: string;
  paymentMethod: PaymentMethodType;
  orderNotes: string;
=======
  selectedAddressId?: string;
  receiverName: string;
  receiverPhone: string;
  division: string;
  district: string;
  area: string;
  road: string;
  house?: string;
  apartment?: string;
  postalCode?: string;
  paymentMethodId: string;
  notes?: string;
  couponCode?: string;
>>>>>>> Stashed changes
}
