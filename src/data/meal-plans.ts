function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(6902);

export interface MealPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceLabel: string;
  durationDays: number;
  totalMeals: number;
  mealsPerDayDescription: string;
  subscriberCount: number;
  isPopular: boolean;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  createdAt: string;
  thumbnail: string;
  tags: string[];
}

const planNames = [
  {
    name: "7-Day Healthy",
    desc: "Balanced home-cooked meals delivered daily. Designed for health-conscious individuals who want nutritious meals without the hassle of cooking.",
    label: "/week",
    days: 7,
    meals: 21,
    mealsDesc: "Breakfast, lunch & dinner daily",
    subscribers: 4234,
    tags: ["Best Seller", "Healthy", "Balanced"],
  },
  {
    name: "30-Day Premium",
    desc: "Chef-curated gourmet meal plan with premium ingredients. Includes breakfast, lunch, dinner, and evening snacks.",
    label: "/month",
    days: 30,
    meals: 90,
    mealsDesc: "3 meals + evening snack daily",
    subscribers: 2567,
    tags: ["Premium", "Popular", "Gourmet"],
  },
  {
    name: "14-Day Weight Loss",
    desc: "Calorie-controlled meals designed for effective weight management. All meals are under 500 calories per serving.",
    label: "/2 weeks",
    days: 14,
    meals: 42,
    mealsDesc: "3 low-cal meals daily",
    subscribers: 3891,
    tags: ["Weight Loss", "Low Calorie"],
  },
  {
    name: "7-Day Vegetarian",
    desc: "Plant-based meal plan packed with protein and flavor. No meat, no compromise on taste.",
    label: "/week",
    days: 7,
    meals: 21,
    mealsDesc: "Veg breakfast, lunch & dinner",
    subscribers: 1876,
    tags: ["Vegetarian", "Plant Based"],
  },
  {
    name: "21-Day Muscle Gain",
    desc: "High-protein meal plan for fitness enthusiasts and athletes. Each meal contains 40g+ protein.",
    label: "/3 weeks",
    days: 21,
    meals: 63,
    mealsDesc: "4 high-protein meals daily",
    subscribers: 1234,
    tags: ["High Protein", "Fitness"],
  },
  {
    name: "7-Day Keto Diet",
    desc: "Low-carb, high-fat ketogenic meal plan. Stay in ketosis without sacrificing taste.",
    label: "/week",
    days: 7,
    meals: 21,
    mealsDesc: "Keto breakfast, lunch & dinner",
    subscribers: 945,
    tags: ["Keto", "Low Carb"],
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

export const mealPlans: MealPlan[] = planNames.map((item, i) => {
  const price = i === 1 ? 12000 + Math.round(rand() * 3000) * 100 : i === 4 ? 6000 + Math.round(rand() * 1000) * 100 : 2500 + Math.round(rand() * 1500) * 100;
  return {
    id: `plan_${pad(i + 1)}`,
    name: item.name,
    slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: item.desc,
    price,
    priceLabel: item.label,
    durationDays: item.days,
    totalMeals: item.meals,
    mealsPerDayDescription: item.mealsDesc,
    subscriberCount: item.subscribers,
    isPopular: rand() > 0.5,
    status: rand() > 0.15 ? "ACTIVE" : "DRAFT" as const,
    createdAt: new Date(2025, Math.floor(rand() * 12), Math.floor(1 + rand() * 28))
      .toISOString()
      .split("T")[0],
    thumbnail: imgs[Math.floor(rand() * imgs.length)],
    tags: [...item.tags],
  };
});
