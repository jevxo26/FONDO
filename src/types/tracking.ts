export interface Milestone {
  id: string;
  title: string;
  description: string;
  time?: string;
  status: "completed" | "current" | "pending";
}

export interface TrackingData {
  orderNumber: string;
  eta: string;
  itemsSummary: string;
  deliveryAddress: {
    name: string;
    street: string;
    area: string;
    country: string;
  };
  phone: string;
  financials: {
    subtotal: number;
    deliveryCharges: number;
    total: number;
    method: string;
  };
  rider: {
    name: string;
    status: string;
  };
}