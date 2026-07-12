function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(8103);

export interface FoodPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  packageType: string;
  durationDays: number;
  totalMeals: number;
  dailyCalories: number;
  dailyProtein: number;
  price: number;
  discountPrice: number | null;
  subscriberCount: number;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  createdAt: string;
  thumbnail: string;
  tags: string[];
}

const packageData = [
  {
    name: "Diabetic Care",
    type: "Diabetic",
    desc: "Low-GI meals designed for blood sugar management. Approved by nutritionists.",
    days: 30,
    meals: 90,
    cals: 1800,
    protein: 65,
    subs: 1876,
    tags: ["Diabetic", "Low Sugar", "Nutritionist Approved"],
  },
  {
    name: "High Protein",
    type: "High Protein",
    desc: "40g+ protein per meal for muscle recovery and growth. Ideal for athletes.",
    days: 21,
    meals: 63,
    cals: 2400,
    protein: 130,
    subs: 2543,
    tags: ["High Protein", "Fitness", "Popular"],
  },
  {
    name: "Office Lunch",
    type: "Regular",
    desc: "Quick, filling lunches delivered to your desk. No more office meal hassles.",
    days: 5,
    meals: 15,
    cals: 2000,
    protein: 70,
    subs: 4123,
    tags: ["Office", "Best Seller", "Quick"],
  },
  {
    name: "Weight Loss",
    type: "Weight Loss",
    desc: "Calorie-deficit meals with balanced macros. 500-calorie portion control.",
    days: 14,
    meals: 42,
    cals: 1500,
    protein: 80,
    subs: 3891,
    tags: ["Weight Loss", "Low Calorie"],
  },
  {
    name: "Weight Gain",
    type: "Weight Gain",
    desc: "Calorie-surplus meals with extra protein and healthy fats. 4 meals a day.",
    days: 30,
    meals: 120,
    cals: 3200,
    protein: 120,
    subs: 1234,
    tags: ["Weight Gain", "High Calorie", "Premium"],
  },
  {
    name: "Regular Balanced",
    type: "Regular",
    desc: "Everyday balanced meals for health-conscious individuals. No restrictions.",
    days: 7,
    meals: 21,
    cals: 2200,
    protein: 75,
    subs: 5621,
    tags: ["Balanced", "Recommended"],
  },
] as const;

const imgs = [
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
  "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
];

function pad(num: number) {
  return String(num).padStart(3, "0");
}

export const foodPackages: FoodPackage[] = packageData.map((item, i) => {
  const basePrice = i === 4 ? 15000 : i === 0 ? 8500 : i === 1 ? 7000 : i === 2 ? 2500 : i === 3 ? 5000 : 3200;
  return {
    id: `pkg_${pad(i + 1)}`,
    name: item.name,
    slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: item.desc,
    packageType: item.type,
    durationDays: item.days,
    totalMeals: item.meals,
    dailyCalories: item.cals,
    dailyProtein: item.protein,
    price: basePrice,
    discountPrice: rand() > 0.5 ? Math.round(basePrice * (0.7 + rand() * 0.2)) : null,
    subscriberCount: item.subs,
    status: rand() > 0.12 ? "ACTIVE" as const : "DRAFT" as const,
    createdAt: new Date(2025, Math.floor(rand() * 12), Math.floor(1 + rand() * 28))
      .toISOString()
      .split("T")[0],
    thumbnail: imgs[Math.floor(rand() * imgs.length)],
    tags: [...item.tags],
  };
});
