import { Flame, Leaf, ShieldCheck, Truck } from 'lucide-react';

export const TRUST_FEATURES = [
  { icon: Leaf, label: 'Fresh daily' },
  { icon: Leaf, label: 'Fresh daily' },
  { icon: Leaf, label: 'Fresh daily' },
  { icon: ShieldCheck, label: '100% Halal' },
  { icon: Truck, label: 'Fast delivery' },
  { icon: Flame, label: 'Coal slow oven' },
];

export const CATEGORY_CARDS = [
  { id: 'kacchi', label: 'Kacchi', image: '/images/home/card_1.png' },
  { id: 'tehari', label: 'Tehari', image: '/images/home/card_2.png' },
  { id: 'roast', label: 'Roast', image: '/images/home/card_3.png' },
  { id: 'kebab', label: 'Kebab', image: '/images/home/card_4.png' },
  { id: 'borhani', label: 'Borhani', image: '/images/home/card_5.png' },
  { id: 'dessert', label: 'Dessert', image: '/images/home/hero_image.png' },
];

export const BEST_SELLERS = [
  {
    id: 1,
    title: 'Royal Mutton Kacchi',
    price: 520,
    rating: 4.9,
    time: '35 min',
    description:
      'Hand-selected mutton sealed with aged basmati, saffron and kewra. Slow-cooked in copper deg for four hours.',
    thumbnail: '/images/home/card_1.png',
  },
  {
    id: 2,
    title: 'Special Tehari',
    price: 380,
    rating: 4.8,
    time: '30 min',
    description:
      'Fragrant basmati rice layered with tender beef, caramelized onions, and a blend of 12 spices.',
    thumbnail: '/images/home/card_2.png',
  },
  {
    id: 3,
    title: 'Chicken Roast',
    price: 350,
    rating: 4.7,
    time: '25 min',
    description:
      'Whole chicken marinated in yogurt and roasted with traditional Bengali spices until golden.',
    thumbnail: '/images/home/card_3.png',
  },
  {
    id: 4,
    title: 'Seekh Kebab Platter',
    price: 420,
    rating: 4.9,
    time: '20 min',
    description:
      'Minced lamb kebabs grilled over charcoal, served with mint chutney and warm naan.',
    thumbnail: '/images/home/card_4.png',
  },
  {
    id: 5,
    title: 'Mutton Rezala',
    price: 480,
    rating: 4.6,
    time: '40 min',
    description:
      'Tender mutton in a creamy, mildly spiced yogurt gravy with aromatic whole spices.',
    thumbnail: '/images/home/card_5.png',
  },
  {
    id: 6,
    title: 'Prawns Malai Curry',
    price: 550,
    rating: 4.8,
    time: '25 min',
    description:
      'Jumbo prawns simmered in a rich coconut milk curry with mustard oil and panch phoron.',
    thumbnail: '/images/home/hero_image.png',
  },
];

export const SIGNATURE_DISH = {
  label: 'TODAY ON THE PASS',
  heading: "Tonight's signature plates.",
  description:
    "Chef Razzak hand-picks three dishes each evening based on the morning's market. Limited portions, prepared in single batches, finished with saffron pulled from his own garden.",
  image: '/images/home/signature_dish.png',
  infoCards: [
    {
      title: "Chef's story",
      text: 'Trained in Old Dhaka, refined in Lucknow.',
    },
    {
      title: 'Ingredients',
      text: 'Aged basmati · saffron · kewra · ghee.',
    },
    {
      title: 'Heritage',
      text: 'A 120-year-old Mughlai recipe, preserved.',
    },
    {
      title: 'Pairs with',
      text: 'Borhani, salad, and our house firni.',
    },
  ],
  primaryButton: { label: 'Order signature' },
  secondaryButton: { label: 'Explore the menu' },
};

export const COMBOS = [
  {
    id: 1,
    title: 'Family Feast',
    description: 'Serves 4-5 people with a variety of dishes and sides',
    price: 1800,
    originalPrice: 2200,
    discount: 'SAVE 18%',
    images: ['/images/home/card_1.png', '/images/home/card_2.png'],
  },
  {
    id: 2,
    title: 'Couples Special',
    description: 'Perfect dinner for two with dessert included',
    price: 950,
    originalPrice: 1200,
    discount: 'SAVE 21%',
    images: ['/images/home/card_3.png', '/images/home/card_4.png'],
  },
  {
    id: 3,
    title: 'Solo Treat',
    description: 'A complete meal for one with your favorite items',
    price: 520,
    originalPrice: 650,
    discount: 'SAVE 20%',
    images: ['/images/home/card_5.png', '/images/home/hero_image.png'],
  },
];

export const CHEF_STORY = {
  name: 'Abu Bashar',
  title: 'Head Chef & Co-Founder',
  bio: 'With over 15 years of experience in traditional Bengali cuisine, Chef Abu Bashar brings the authentic flavors of Dhaka to every plate. His philosophy is simple: use the freshest ingredients, respect the traditions, and cook with love.',
  stats: [
    { label: 'Years Experience', value: '15+' },
    { label: 'Signature Dishes', value: '50+' },
  ],
  image: '/images/home/chef_abul_bashar.png',
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Fatima Rahman',
    avatar: '/images/home/dining_table.png',
    rating: 5,
    text: 'The Kacchi was absolutely divine! Every bite reminded me of home. The subscription service is a lifesaver for busy professionals like me.',
    verified: true,
  },
  {
    id: 2,
    name: 'Arif Hasan',
    avatar: '/images/home/cooking.png',
    rating: 5,
    text: 'Finally, a food service that delivers restaurant-quality meals to your door. The consistency in taste and freshness is remarkable.',
    verified: true,
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    avatar: '/images/home/restaurant_interior.png',
    rating: 5,
    text: "I've tried many food delivery services, but FONDO stands out. The flavors are authentic, portions generous, and delivery is always on time.",
    verified: true,
  },
];

export const CTA = {
  heading: 'Ready to taste the difference?',
  subheading: 'Order now and experience the authentic flavors of Dhaka.',
  primaryButton: { label: 'Order Now', href: '/foods' },
  secondaryButton: { label: 'View Menu', href: '/foods' },
};
