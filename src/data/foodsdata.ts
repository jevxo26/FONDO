//src/data/foodsdata.ts
export interface Variant {
  id: string;
  name: string;
  price: string;
  discountPrice: string | null;
  servingSize: string;
}

export interface AddonItem {
  id: string;
  addonId: string;
  name: string;
  price: string;
  status: string;
}

export interface Addon {
  id: string;
  foodId: string;
  name: string;
  isRequired: boolean;
  maxSelection: number;
  items: AddonItem[];
}

export interface FoodItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  coverImage: string;
  foodType: "SEAFOOD" | "VEG" | "NON-VEG";
  spiceLevel: "MILD" | "MEDIUM" | "HOT";
  preparationTime: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  servingSize: string;
  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  category: { id: string; name: string; slug: string };
  variants: Variant[];
  addons: Addon[];
  rating: { averageRating: number; totalReview: number };
  labels: { id: string; label: string; color: string }[];
  tags: { name: string }[];
  diets: { dietType: string }[];
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  subCategories: { id: string; name: string; slug: string }[];
}

export const BACKEND_CATEGORIES: CategoryItem[] = [
  {
    id: "cd885af0-72a5-44f2-adb9-a9017c3cf36e",
    name: "Rice & Biryani",
    slug: "rice-biryani",
    subCategories: [
      { id: "43d344ce-a8cf-4534-98a7-f91993b9a5bf", name: "Biryani", slug: "biryani" },
      { id: "ebd22780-d067-4104-903a-618e2ddee048", name: "Plain Rice", slug: "plain-rice" }
    ]
  },
  {
    id: "curry-gravy-cat",
    name: "Curry & Gravy",
    slug: "curry-gravy",
    subCategories: []
  },
  {
    id: "desserts-sweets-cat",
    name: "Desserts & Sweets",
    slug: "desserts-sweets",
    subCategories: []
  },
  {
    id: "drinks-beverages-cat",
    name: "Drinks & Beverages",
    slug: "drinks-beverages",
    subCategories: []
  }
];

export const BACKEND_FOODS: FoodItem[] = [
  {
    id: "27faf81e-626c-473a-9076-02ada8dbe241",
    name: "Fish Curry (Rui/Katol)",
    slug: "fish-curry-rui-katol",
    shortDescription: "Traditional Bengali fish curry made with freshwater Rui/Katol in a turmeric and mustard gravy. Authentic and soulful.",
    thumbnail: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60",
    coverImage: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60",
    foodType: "SEAFOOD",
    spiceLevel: "MEDIUM",
    preparationTime: 35,
    calories: 380,
    protein: 28,
    fat: 18,
    carbohydrate: 12,
    servingSize: "1 bowl (350g)",
    isFeatured: true,
    isPopular: true,
    isRecommended: true,
    category: { id: "10c3b344-4f07-4dfd-b580-e4dd2ef4fbbb", name: "Curry & Gravy", slug: "curry-gravy" },
    variants: [
      { id: "603702e4-2b34-451a-aeaf-535765c4443b", name: "Regular", price: "280", discountPrice: null, servingSize: "1 bowl" },
      { id: "03d0878c-9578-4a79-9f73-00096aab771a", name: "Large", price: "420", discountPrice: null, servingSize: "1.5 bowl" }
    ],
    addons: [
      {
        id: "cca67fc4-27ca-4abd-892c-a0b113c63d47",
        foodId: "27faf81e-626c-473a-9076-02ada8dbe241",
        name: "Extras",
        isRequired: false,
        maxSelection: 1,
        items: [{ id: "1e5ad240-b67a-4976-823d-86e9f230f9ba", addonId: "cca67fc4-27ca-4abd-892c-a0b113c63d47", name: "Fish Head", price: "50", status: "active" }]
      }
    ],
    rating: { averageRating: 4.7, totalReview: 20 },
    labels: [{ id: "9dd11a30-6f12-48b0-b6d2-694829acadde", label: "Bengali Classic", color: "#E63946" }],
    tags: [{ name: "Chef Special" }, { name: "High Protein" }, { name: "Popular" }],
    diets: [{ dietType: "High Protein" }]
  },
  {
    id: "07f5887f-9403-4030-9cbd-a128812ab131",
    name: "Rosogolla (2 pcs)",
    slug: "rosogolla-2pcs",
    shortDescription: "Soft, spongy cottage cheese dumplings soaked in light sugar syrup. Bengal's most beloved sweet.",
    thumbnail: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60",
    coverImage: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60",
    foodType: "VEG",
    spiceLevel: "MILD",
    preparationTime: 2,
    calories: 220,
    protein: 4,
    fat: 5,
    carbohydrate: 42,
    servingSize: "2 pieces (100g)",
    isFeatured: false,
    isPopular: true,
    isRecommended: false,
    category: { id: "359023e6-b4f9-4848-b334-3ab7201086b8", name: "Desserts & Sweets", slug: "desserts-sweets" },
    variants: [
      { id: "6a4a3716-01e7-4468-918e-78d0a58832a0", name: "2 Pieces", price: "40", discountPrice: null, servingSize: "2 pcs" },
      { id: "8547c818-33ac-4421-98bb-154968aaf689", name: "6 Pieces", price: "110", discountPrice: null, servingSize: "6 pcs" }
    ],
    addons: [],
    rating: { averageRating: 3.6, totalReview: 9 },
    labels: [{ id: "fabba032-b821-43cc-b5c8-c1373b795e34", label: "Traditional", color: "#E63946" }],
    tags: [{ name: "Popular" }, { name: "New" }],
    diets: [{ dietType: "Vegetarian" }]
  },
  {
    id: "6f78e9c4-aa55-481b-b7dd-e325e3c196f3",
    name: "Mango Lassi",
    slug: "mango-lassi",
    shortDescription: "Creamy yogurt-based drink blended with ripe Alphonso mangoes and a hint of cardamom. Refreshingly delicious.",
    thumbnail: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&auto=format&fit=crop&q=60",
    coverImage: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&auto=format&fit=crop&q=60",
    foodType: "VEG",
    spiceLevel: "MILD",
    preparationTime: 5,
    calories: 180,
    protein: 6,
    fat: 8,
    carbohydrate: 24,
    servingSize: "1 glass (300ml)",
    isFeatured: true,
    isPopular: true,
    isRecommended: false,
    category: { id: "a406a43d-932a-46d5-9a03-e43c380c0282", name: "Drinks & Beverages", slug: "drinks-beverages" },
    variants: [
      { id: "17d963a6-f7f9-470c-99b8-2697bac8ecb6", name: "Regular", price: "80", discountPrice: null, servingSize: "300ml" },
      { id: "8420dc46-b863-4cc6-bc26-50004c862735", name: "Large", price: "120", discountPrice: null, servingSize: "500ml" }
    ],
    addons: [],
    rating: { averageRating: 3.1, totalReview: 13 },
    labels: [{ id: "52783f69-29b7-4149-8230-349dc1073c8a", label: "Refreshing", color: "#F4A261" }],
    tags: [{ name: "Popular" }, { name: "Best Seller" }],
    diets: [{ dietType: "Vegetarian" }]
  }
];