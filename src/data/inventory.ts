function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(5501);

const foodNames = [
  "Royal Mutton Kacchi", "Chicken Biryani", "Special Tehari", "Mutton Rezala",
  "Shorshe Ilish", "Prawn Malai Curry", "Chicken Korma", "Kacchi Biryani",
  "Beef Bhuna", "Vegetable Khichuri", "Kung Pao Chicken", "Fried Rice",
  "Spring Rolls", "Mapo Tofu", "Chow Mein", "Margherita Pizza",
  "Pasta Alfredo", "Lasagna", "Risotto", "Minestrone Soup",
  "Butter Chicken", "Palak Paneer", "Dal Makhani", "Chicken Tikka",
  "Gulab Jamun", "Firni", "Chocolate Mousse",
];

const vendors = [
  "Fresh Meals", "Spice House", "Bistro Dhaka", "Golden Wok",
  "Pizza Nova", "Curry Leaf", "Sweet Tooth", "The Kebab House",
];

export interface InventoryItem {
  id: string;
  foodName: string;
  vendor: string;
  currentStock: number;
  minStock: number;
  unit: string;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  lastRestocked: string;
}

function pad(num: number) {
  return String(num).padStart(3, "0");
}

const units = ["portions", "kg", "portions", "portions", "pieces", "liters"];

export const inventoryItems: InventoryItem[] = foodNames.map((name, i) => {
  const currentStock = Math.round(rand() * 120);
  const minStock = 10 + Math.round(rand() * 20);
  return {
    id: `inv_${pad(i + 1)}`,
    foodName: name,
    vendor: vendors[Math.floor(rand() * vendors.length)],
    currentStock,
    minStock,
    unit: units[Math.floor(rand() * units.length)] || "portions",
    status: currentStock === 0 ? "OUT_OF_STOCK" : currentStock < minStock ? "LOW_STOCK" : "IN_STOCK",
    lastRestocked: new Date(2025, Math.floor(rand() * 12), Math.floor(1 + rand() * 28))
      .toISOString()
      .split("T")[0],
  };
});
