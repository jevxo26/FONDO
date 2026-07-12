function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(7401);

const foodNames = [
  "Royal Mutton Kacchi", "Chicken Biryani", "Special Tehari", "Mutton Rezala",
  "Shorshe Ilish", "Prawn Malai Curry", "Chicken Korma", "Kacchi Biryani",
  "Beef Bhuna", "Vegetable Khichuri", "Kung Pao Chicken", "Fried Rice",
  "Spring Rolls", "Mapo Tofu", "Chow Mein", "Margherita Pizza",
  "Pasta Alfredo", "Lasagna", "Risotto", "Minestrone Soup",
  "Butter Chicken", "Palak Paneer", "Dal Makhani", "Chicken Tikka",
  "Gulab Jamun", "Firni", "Chocolate Mousse",
];

export interface NutritionItem {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  basePrice: number;
  salePrice: number | null;
  servingSize: string;
  calorieLevel: "LOW" | "MEDIUM" | "HIGH";
  discountStatus: "ON_SALE" | "FULL_PRICE";
}

function pad(num: number) {
  return String(num).padStart(3, "0");
}

const sizes = ["1 plate", "1 bowl", "1 portion", "250g", "300g", "1 piece", "1 cup"];

export const nutritionItems: NutritionItem[] = foodNames.map((name, i) => {
  const base = 200 + Math.round(rand() * 600);
  const cals = Math.round(base * (0.8 + rand() * 0.4));
  const onSale = rand() > 0.5;
  return {
    id: `nut_${pad(i + 1)}`,
    foodName: name,
    calories: cals,
    protein: Math.round(10 + rand() * 35),
    carbs: Math.round(20 + rand() * 50),
    fat: Math.round(5 + rand() * 25),
    fiber: Math.round(2 + rand() * 8),
    sugar: Math.round(1 + rand() * 15),
    sodium: Math.round(200 + rand() * 600),
    basePrice: Math.round(150 + rand() * 550),
    salePrice: onSale ? Math.round(120 + rand() * 400) : null,
    servingSize: sizes[Math.floor(rand() * sizes.length)],
    calorieLevel: cals < 300 ? "LOW" : cals < 500 ? "MEDIUM" : "HIGH",
    discountStatus: onSale ? "ON_SALE" : "FULL_PRICE",
  };
});
