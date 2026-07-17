function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(8213);

export type KitchenOrderStatus = "QUEUED" | "PREPARING" | "READY" | "PACKED";

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";

export interface KitchenFoodItem {
  id: string;
  name: string;
  quantity: number;
  status: KitchenOrderStatus;
}

export interface KitchenOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  items: KitchenFoodItem[];
  status: KitchenOrderStatus;
  mealType: MealType;
  priority: number;
  notes: string | null;
  placedAt: string;
  estimatedReadyAt: string;
}

export interface KitchenMealSlotFood {
  id: string;
  name: string;
  total: number;
  prepared: number;
}

export interface KitchenMealSlot {
  id: string;
  mealType: MealType;
  time: string;
  totalMeals: number;
  prepared: number;
  inProgress: number;
  shortfall: number;
  items: KitchenMealSlotFood[];
}

const customerNames = [
  "Rahim Uddin", "Karina Begum", "Faruk Hossain", "Shamim Akhtar",
  "Nasrin Sultana", "Jahangir Alam", "Sharmin Akhter", "Rafiq Hasan",
  "Tanvir Ahmed", "Nusrat Jahan", "Hasan Ali", "Mizanur Rahman",
  "Shahriar Kabir", "Jannatul Ferdous", "Tahmina Akhtar", "Rafiul Islam",
  "Sadia Islam", "Farzana Rahman", "Kazi Fahim", "Mahmud Hassan",
];

const foodNames = [
  "Chicken Biryani", "Beef Curry", "Daal + Rice", "Paratha + Egg Curry",
  "Fish Fry + Rice", "Vegetable Khichuri", "Chicken Roast", "Polao + Beef",
  "Mutton Rezala", "Prawn Curry", "Egg Curry", "Butter Naan",
  "Gulab Jamun", "Vegetable Soup", "Spring Rolls", "Fried Rice",
];

const statusPool: KitchenOrderStatus[] = [
  "QUEUED", "QUEUED", "QUEUED", "PREPARING", "PREPARING",
  "READY", "READY", "PACKED", "PACKED", "PACKED",
];

const mealTypes: MealType[] = ["BREAKFAST", "LUNCH", "DINNER", "SNACKS"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function generateKitchenOrders(count: number): KitchenOrder[] {
  const list: KitchenOrder[] = [];
  for (let i = 1; i <= count; i++) {
    const itemCount = Math.floor(rand() * 4) + 1;
    const items: KitchenFoodItem[] = [];
    for (let j = 0; j < itemCount; j++) {
      items.push({
        id: `KFI-${String(i).padStart(4, "0")}-${j + 1}`,
        name: randomItem(foodNames),
        quantity: Math.floor(rand() * 3) + 1,
        status: "QUEUED",
      });
    }
    const status = randomItem(statusPool);
    list.push({
      id: `KIT-ORD-${String(i).padStart(4, "0")}`,
      orderNumber: `#FONDO-${String(90000 + i)}`,
      customerName: randomItem(customerNames),
      items,
      status,
      mealType: randomItem(mealTypes),
      priority: Math.floor(rand() * 3),
      notes: rand() > 0.7 ? "Extra spicy please" : null,
      placedAt: `${Math.floor(rand() * 28) + 1} Jul, 2026`,
      estimatedReadyAt: `${String(8 + Math.floor(rand() * 12)).padStart(2, "0")}:${String(Math.floor(rand() / 2) * 10).padStart(2, "0")}`,
    });
  }
  return list;
}

export const kitchenOrders = generateKitchenOrders(30);

const mealSlotTimes: Record<MealType, string> = {
  BREAKFAST: "7:00 AM - 9:00 AM",
  LUNCH: "12:00 PM - 2:00 PM",
  DINNER: "7:00 PM - 9:00 PM",
  SNACKS: "4:00 PM - 5:00 PM",
};

function generateMealSlots(): KitchenMealSlot[] {
  return mealTypes.map((type) => {
    const total = 15 + Math.floor(rand() * 40);
    const prepared = Math.floor(rand() * total * 0.7);
    const inProgress = Math.floor(rand() * (total - prepared) * 0.6);
    const shortfall = total - prepared - inProgress;
    const itemCount = 4 + Math.floor(rand() * 4);
    const items: KitchenMealSlotFood[] = [];
    for (let i = 0; i < itemCount; i++) {
      items.push({
        id: `MSF-${type}-${i + 1}`,
        name: randomItem(foodNames),
        total: Math.floor(rand() * 20) + 5,
        prepared: Math.floor(rand() * 15),
      });
    }
    return {
      id: `MS-${type}`,
      mealType: type,
      time: mealSlotTimes[type],
      totalMeals: total,
      prepared,
      inProgress,
      shortfall,
      items,
    };
  });
}

export const mealSlots = generateMealSlots();
