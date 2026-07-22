export interface Address {
  id: string;
  label?: string;
  receiverName: string;
  receiverPhone: string;
  country?: string;
  division: string;
  district: string;
  upazila?: string;
  area: string;
  road?: string;
  house?: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  postalCode?: string;
  deliveryInstruction?: string;
  isDefault?: boolean;
}
