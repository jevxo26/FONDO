import { Milestone, TrackingData } from "@/types/tracking";

// Mock data populated from the design reference image
export const mockTrackingData: TrackingData = {
  orderNumber: "#ORD123456",
  eta: "24 minutes",
  itemsSummary: "1* Royal Mutton Kacchi, 2* Hose Borhani",
  deliveryAddress: {
    name: "Rahim Ahmed",
    street: "House No. 123, Road No. 7",
    area: "Mirpur-10, Dhaka-1216",
    country: "Bangladesh",
  },
  phone: "+880 1577147480",
  financials: {
    subtotal: 2499,
    deliveryCharges: 60,
    total: 2559,
    method: "Cash on Delivery",
  },
  rider: {
    name: "Rakib. your rider",
    status: "Heading to kitchen pickup",
  },
};

export const milestones: Milestone[] = [
  {
    id: "1",
    title: "Order placed",
    description: "Your order has been placed successfully.",
    time: "May 21, 2026 - 02:30 PM",
    status: "completed",
  },
  {
    id: "2",
    title: "Order confirmed.",
    description: "Order confirmed and processing has begun.",
    time: "May 21, 2026 - 02:45 PM",
    status: "completed",
  },
  {
    id: "3",
    title: "Cooking",
    description: "Product Cooking",
    time: "May 21, 2026 - 03:00 AM",
    status: "completed",
  },
  {
    id: "4",
    title: "Ready",
    description: "Product sent for Ready",
    time: "May 21, 2026 - 03:20 PM",
    status: "completed",
  },
  {
    id: "5",
    title: "Out of delivery",
    description: "The product has arrived in your area, will be delivered soon.",
    time: "May 21, 2026 - 03:25 PM",
    status: "current",
  },
  {
    id: "6",
    title: "Delivered",
    description: "Product delivered successfully.",
    time: "Estimated: May 21, 2026",
    status: "pending",
  },
];
