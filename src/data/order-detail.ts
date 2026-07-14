function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(9102);

const foodItemNames = [
  "Chicken Rice", "Green Salad", "Mango Juice", "Beef Biryani",
  "Prawn Curry", "Spring Rolls", "Fried Rice", "Chicken Curry",
  "Dal Makhani", "Butter Naan", "Gulab Jamun", "Vegetable Soup",
  "Fish Fry", "Egg Curry", "Mutton Rezala", "Chicken Kebab",
  "Pasta Alfredo", "Margherita Pizza", "Chocolate Mousse", "Ice Cream",
];

const addresses = [
  "Mirpur 10, Dhaka", "Dhanmondi 27, Dhaka", "Gulshan 2, Dhaka",
  "Banani 11, Dhaka", "Uttara 12, Dhaka", "Mohammadpur, Dhaka",
  "Baridhara, Dhaka", "Khilkhet, Dhaka", "Rampura, Dhaka",
  "Shyamoli, Dhaka", "Bashundhara R/A, Dhaka", "Motijheel, Dhaka",
];

const vendors = [
  "Fresh Meals", "Kitchen Paradise", "Spice House", "Golden Wok",
  "Bistro Dhaka", "Curry Leaf", "The Kebab House", "Sweet Tooth",
];

interface OrderItemDetail {
  name: string;
  quantity: number;
  price: number;
}

export interface ExtendedOrderDetail {
  customerPhone: string;
  customerAddress: string;
  deliveryAddress: string;
  items: OrderItemDetail[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  vendor: string;
  rider: string | null;
  timeline: { label: string; time: string; done: boolean }[];
}

const phones = [
  "+880 1712-345678", "+880 1813-456789", "+880 1914-567890",
  "+880 1615-678901", "+880 1516-789012", "+880 1317-890123",
];

const detailMap = new Map<string, ExtendedOrderDetail>();

export function getOrderDetail(orderId: string): ExtendedOrderDetail {
  const cached = detailMap.get(orderId);
  if (cached) return cached;

  const itemCount = 1 + Math.floor(rand() * 5);
  const items: OrderItemDetail[] = [];
  let subtotal = 0;
  for (let i = 0; i < itemCount; i++) {
    const name = foodItemNames[Math.floor(rand() * foodItemNames.length)];
    const qty = 1 + Math.floor(rand() * 3);
    const price = (100 + Math.floor(rand() * 700)) * qty;
    items.push({ name, quantity: qty, price });
    subtotal += price;
  }

  const deliveryFee = subtotal > 1500 ? 0 : 30 + Math.floor(rand() * 70);
  const discount = rand() > 0.6 ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;

  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const baseHour = hours[Math.floor(rand() * hours.length)];
  const baseMin = mins[Math.floor(rand() * mins.length)];

  const detail: ExtendedOrderDetail = {
    customerPhone: phones[Math.floor(rand() * phones.length)],
    customerAddress: addresses[Math.floor(rand() * addresses.length)],
    deliveryAddress: addresses[Math.floor(rand() * addresses.length)],
    items,
    subtotal,
    deliveryFee,
    discount,
    vendor: vendors[Math.floor(rand() * vendors.length)],
    rider: rand() > 0.4 ? ["Kamal Hossain", "Rafiqul Islam", "Shahidul Haque", "Nurul Islam"][Math.floor(rand() * 4)] : null,
    timeline: [
      { label: "Order Placed", time: `${baseHour}:${String(baseMin).padStart(2, "0")} PM`, done: true },
      { label: "Confirmed", time: `${baseHour}:${String(baseMin + 5).padStart(2, "0")} PM`, done: true },
      { label: "Assigned to Kitchen", time: `${baseHour}:${String(baseMin + 10).padStart(2, "0")} PM`, done: true },
      { label: "In Preparation", time: `${baseHour}:${String(baseMin + 15).padStart(2, "0")} PM`, done: rand() > 0.3 },
      { label: "Ready for Pickup", time: `${baseHour + 1}:${String(baseMin).padStart(2, "0")} PM`, done: false },
      { label: "In Transit", time: "", done: false },
      { label: "Delivered", time: "", done: false },
    ],
  };

  detailMap.set(orderId, detail);
  return detail;
}
