function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(4201);

const categories = [
  { id: "cat_1", name: "Bengali" },
  { id: "cat_2", name: "Chinese" },
  { id: "cat_3", name: "Italian" },
  { id: "cat_4", name: "Indian" },
  { id: "cat_5", name: "Desserts" },
];

const spiceLevels = ["MILD", "MEDIUM", "HOT", "EXTRA_HOT"] as const;
const statuses = ["ACTIVE", "ACTIVE", "ACTIVE", "ACTIVE", "DRAFT", "ARCHIVED"] as const;

const foodNames = [
  { name: "Royal Mutton Kacchi", cat: "Bengali", type: "NON_VEG" },
  { name: "Chicken Biryani", cat: "Bengali", type: "NON_VEG" },
  { name: "Special Tehari", cat: "Bengali", type: "NON_VEG" },
  { name: "Mutton Rezala", cat: "Bengali", type: "NON_VEG" },
  { name: "Shorshe Ilish", cat: "Bengali", type: "SEAFOOD" },
  { name: "Prawn Malai Curry", cat: "Bengali", type: "SEAFOOD" },
  { name: "Chicken Korma", cat: "Bengali", type: "NON_VEG" },
  { name: "Kacchi Biryani", cat: "Bengali", type: "NON_VEG" },
  { name: "Beef Bhuna", cat: "Bengali", type: "NON_VEG" },
  { name: "Vegetable Khichuri", cat: "Bengali", type: "VEG" },
  { name: "Kung Pao Chicken", cat: "Chinese", type: "NON_VEG" },
  { name: "Fried Rice", cat: "Chinese", type: "VEG" },
  { name: "Spring Rolls", cat: "Chinese", type: "VEG" },
  { name: "Mapo Tofu", cat: "Chinese", type: "VEGAN" },
  { name: "Chow Mein", cat: "Chinese", type: "VEG" },
  { name: "Margherita Pizza", cat: "Italian", type: "VEG" },
  { name: "Pasta Alfredo", cat: "Italian", type: "VEG" },
  { name: "Lasagna", cat: "Italian", type: "NON_VEG" },
  { name: "Risotto", cat: "Italian", type: "VEGAN" },
  { name: "Minestrone Soup", cat: "Italian", type: "VEGAN" },
  { name: "Butter Chicken", cat: "Indian", type: "NON_VEG" },
  { name: "Palak Paneer", cat: "Indian", type: "VEG" },
  { name: "Dal Makhani", cat: "Indian", type: "VEG" },
  { name: "Chicken Tikka", cat: "Indian", type: "NON_VEG" },
  { name: "Gulab Jamun", cat: "Desserts", type: "VEG" },
  { name: "Firni", cat: "Desserts", type: "VEG" },
  { name: "Chocolate Mousse", cat: "Desserts", type: "VEG" },
] as const;

const imgs = [
  "https://images.pexels.com/photos/2299981/pexels-photo-2299981.jpeg",
  "https://images.pexels.com/photos/6068717/pexels-photo-6068717.jpeg",
  "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
  "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
  "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
  "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
];

export interface AdminFoodItem {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  categoryName: string;
  foodType: "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD";
  spiceLevel: "MILD" | "MEDIUM" | "HOT" | "EXTRA_HOT";
  basePrice: number;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  createdAt: string;
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pad(num: number) {
  return String(num).padStart(3, "0");
}

export const adminFoods: AdminFoodItem[] = foodNames.map((item, i) => {
  const cat = categories.find((c) => c.name === item.cat)!;
  const imgIdx = Math.floor(rand() * imgs.length);
  return {
    id: `food_${pad(i + 1)}`,
    name: item.name,
    slug: generateSlug(item.name),
    thumbnail: imgs[imgIdx],
    categoryName: cat.name,
    foodType: item.type,
    spiceLevel: spiceLevels[Math.floor(rand() * spiceLevels.length)],
    basePrice: Math.round(150 + rand() * 550),
    status: statuses[Math.floor(rand() * statuses.length)],
    isFeatured: rand() > 0.6,
    isPopular: rand() > 0.65,
    isRecommended: rand() > 0.7,
    createdAt: new Date(2025, Math.floor(rand() * 12), Math.floor(1 + rand() * 28))
      .toISOString()
      .split("T")[0],
  };
});

export const foodCategoryOptions = categories.map((c) => ({
  label: c.name,
  value: c.name,
}));
