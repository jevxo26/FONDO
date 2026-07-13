function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(3307);

export interface AdminSubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  status: "ACTIVE" | "DRAFT";
  sortOrder: number;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  sortOrder: number;
  status: "ACTIVE" | "DRAFT";
  subCategories: AdminSubCategory[];
  createdAt: string;
}

const categoryData = [
  {
    name: "Bengali",
    desc: "Traditional Bengali cuisine with rich flavors and aromatic spices.",
    icon: "🍛",
    subs: [
      { name: "Kacchi", desc: "Slow-cooked marinated mutton with basmati rice.", items: 6 },
      { name: "Tehari", desc: "Fragrant rice layered with tender beef.", items: 4 },
      { name: "Roast", desc: "Whole chicken marinated and slow-roasted.", items: 5 },
      { name: "Kebab", desc: "Minced meat kebabs grilled over charcoal.", items: 3 },
      { name: "Rezala", desc: "Creamy yogurt-based mutton curry.", items: 4 },
      { name: "Khichuri", desc: "Comforting rice and lentil porridge.", items: 3 },
    ],
  },
  {
    name: "Chinese",
    desc: "Indo-Chinese fusion dishes with bold sauces and fresh veggies.",
    icon: "🥡",
    subs: [
      { name: "Noodles", desc: "Stir-fried noodles with vegetables and meat.", items: 8 },
      { name: "Fried Rice", desc: "Wok-tossed rice with eggs and aromatics.", items: 5 },
      { name: "Dim Sum", desc: "Steamed dumplings with various fillings.", items: 4 },
      { name: "Soup", desc: "Hot and sour, manchow, and wonton soups.", items: 6 },
    ],
  },
  {
    name: "Italian",
    desc: "Classic Italian recipes with fresh ingredients and Mediterranean flair.",
    icon: "🍝",
    subs: [
      { name: "Pizza", desc: "Wood-fired pizzas with premium toppings.", items: 7 },
      { name: "Pasta", desc: "Hand-rolled pasta in rich sauces.", items: 6 },
      { name: "Risotto", desc: "Creamy Arborio rice slow-cooked to perfection.", items: 4 },
      { name: "Soup", desc: "Minestrone and other Italian classics.", items: 3 },
    ],
  },
  {
    name: "Indian",
    desc: "North and South Indian delicacies with authentic spice blends.",
    icon: "🍛",
    subs: [
      { name: "Curry", desc: "Rich gravies and spice-forward curries.", items: 9 },
      { name: "Biryani", desc: "Layered rice with meat and aromatic spices.", items: 5 },
      { name: "Dal", desc: "Tempered lentils with ghee and cumin.", items: 4 },
      { name: "Bread", desc: "Naan, roti, paratha fresh from the tandoor.", items: 5 },
    ],
  },
  {
    name: "Desserts",
    desc: "Sweet treats and indulgent desserts for every occasion.",
    icon: "🍰",
    subs: [
      { name: "Sweets", desc: "Traditional Bengali sweets like rasgulla and sandesh.", items: 7 },
      { name: "Ice Cream", desc: "Artisanal ice cream in unique flavors.", items: 5 },
      { name: "Pastries", desc: "Layered pastries and decadent cakes.", items: 4 },
    ],
  },
] as const;

const imgs = [
  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
  "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
  "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
];

function pad(num: number) {
  return String(num).padStart(3, "0");
}

export const adminCategories: AdminCategory[] = categoryData.map((cat, i) => ({
  id: `cat_${pad(i + 1)}`,
  name: cat.name,
  slug: cat.name.toLowerCase(),
  description: cat.desc,
  icon: cat.icon,
  image: imgs[i % imgs.length],
  sortOrder: i + 1,
  status: rand() > 0.12 ? "ACTIVE" as const : "DRAFT" as const,
  subCategories: cat.subs.map((sub, j) => ({
    id: `subcat_${pad(i + 1)}_${pad(j + 1)}`,
    name: sub.name,
    slug: sub.name.toLowerCase().replace(/\s+/g, "-"),
    description: sub.desc,
    itemCount: sub.items,
    status: rand() > 0.1 ? "ACTIVE" as const : "DRAFT" as const,
    sortOrder: j + 1,
  })),
  createdAt: new Date(2025, Math.floor(rand() * 12), Math.floor(1 + rand() * 28))
    .toISOString()
    .split("T")[0],
}));
