import { Star, Clock, ThumbsUp, UtensilsCrossed } from "lucide-react";

export const TRUST_STATS = [
  {
    icon: Star,
    value: "4.9",
    label: "Customer Rating",
    iconColor: "text-primary" as const,
  },
  {
    icon: Clock,
    value: "28 min",
    label: "Avg Delivery",
    iconColor: "text-muted-foreground" as const,
  },
  {
    icon: ThumbsUp,
    value: "98%",
    label: "Satisfaction",
    iconColor: "text-primary" as const,
  },
  {
    icon: UtensilsCrossed,
    value: "120K+",
    label: "Plates Served",
    iconColor: "text-muted-foreground" as const,
  },
];

export const CATEGORY_CARDS = [
  { id: "kacchi", label: "Kacchi", image: "/images/home/card_1.png" },
  { id: "tehari", label: "Tehari", image: "/images/home/card_2.png" },
  { id: "roast", label: "Roast", image: "/images/home/card_3.png" },
  { id: "kebab", label: "Kebab", image: "/images/home/card_4.png" },
  { id: "borhani", label: "Borhani", image: "/images/home/card_5.png" },
  { id: "dessert", label: "Dessert", image: "/images/home/hero_image.png" },
];

export const BEST_SELLERS = [
  {
    id: 1,
    title: "Royal Mutton Kacchi",
    price: 520,
    rating: 4.9,
    time: "35 min",
    description:
      "Hand-selected mutton sealed with aged basmati, saffron and kewra. Slow-cooked in copper deg for four hours.",
    thumbnail: "/images/home/card_1.png",
  },
  {
    id: 2,
    title: "Special Tehari",
    price: 380,
    thumbnail: "/images/home/card_2.png",
  },
  {
    id: 3,
    title: "Chicken Roast",
    price: 350,
    thumbnail: "/images/home/card_3.png",
  },
  {
    id: 4,
    title: "Seekh Kebab Platter",
    price: 420,
    thumbnail: "/images/home/card_4.png",
  },
  {
    id: 5,
    title: "Mutton Rezala",
    price: 480,
    thumbnail: "/images/home/card_5.png",
  },
  {
    id: 6,
    title: "Prawns Malai Curry",
    price: 550,
    rating: 4.8,
    time: "25 min",
    description:
      "Jumbo prawns simmered in a rich coconut milk curry with mustard oil and panch phoron.",
    thumbnail: "/images/home/hero_image.png",
  },
];

export const SIGNATURE_DISH = {
  title: "Royal Mutton Kacchi",
  description:
    "Our signature dish is a labor of love — hand-selected mutton sealed with aged basmati, saffron and kewra. Slow-cooked in a copper deg for four hours, each grain of rice absorbs the rich, aromatic flavors of the meat.",
  price: 520,
  image: "/images/home/card_1.png",
  ingredients: [
    "Saffron Rice",
    "Tender Mutton",
    "Caramelized Onions",
    "Whole Spices",
    "Ghee",
  ],
};

export const COMBOS = [
  {
    id: 1,
    title: "Family Feast",
    description: "Serves 4-5 people with a variety of dishes and sides",
    price: 1800,
    originalPrice: 2200,
    discount: "SAVE 18%",
    images: ["/images/home/card_1.png", "/images/home/card_2.png"],
  },
  {
    id: 2,
    title: "Couples Special",
    description: "Perfect dinner for two with dessert included",
    price: 950,
    originalPrice: 1200,
    discount: "SAVE 21%",
    images: ["/images/home/card_3.png", "/images/home/card_4.png"],
  },
  {
    id: 3,
    title: "Solo Treat",
    description: "A complete meal for one with your favorite items",
    price: 520,
    originalPrice: 650,
    discount: "SAVE 20%",
    images: ["/images/home/card_5.png", "/images/home/hero_image.png"],
  },
];

export const CHEF_STORY = {
  name: "Abu Bashar",
  title: "Head Chef & Co-Founder",
  bio: "With over 15 years of experience in traditional Bengali cuisine, Chef Abu Bashar brings the authentic flavors of Dhaka to every plate. His philosophy is simple: use the freshest ingredients, respect the traditions, and cook with love.",
  stats: [
    { label: "Years Experience", value: "15+" },
    { label: "Signature Dishes", value: "50+" },
  ],
  image: "/images/home/chef_abul_bashar.png",
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Fatima Rahman",
    avatar: "/images/home/dining_table.png",
    rating: 5,
    text: "The Kacchi was absolutely divine! Every bite reminded me of home. The subscription service is a lifesaver for busy professionals like me.",
    verified: true,
  },
  {
    id: 2,
    name: "Arif Hasan",
    avatar: "/images/home/cooking.png",
    rating: 5,
    text: "Finally, a food service that delivers restaurant-quality meals to your door. The consistency in taste and freshness is remarkable.",
    verified: true,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    avatar: "/images/home/restaurant_interior.png",
    rating: 5,
    text: "I've tried many food delivery services, but FONDO stands out. The flavors are authentic, portions generous, and delivery is always on time.",
    verified: true,
  },
];

export const CTA = {
  heading: "Ready to taste the difference?",
  subheading: "Order now and experience the authentic flavors of Dhaka.",
  primaryButton: { label: "Order Now", href: "/foods" },
  secondaryButton: { label: "View Menu", href: "/foods" },
};
