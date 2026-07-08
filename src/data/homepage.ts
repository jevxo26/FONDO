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
    serves: '4–5',
    popular: true,
    saveAmount: 320,
    items: ['2× Mutton Kacchi', '1× Chicken Roast', '4× Borhani', '2× Firni'],
    freeDrink: true,
    price: 1840,
  },
  {
    id: 2,
    title: 'Weekend Brunch',
    serves: '3–4',
    popular: false,
    saveAmount: 220,
    items: ['2× Chicken Tehari', '6× Seekh Kebab', '3× Borhani', '1× Firni'],
    freeDrink: true,
    price: 1240,
  },
  {
    id: 3,
    title: 'Date Night',
    serves: '2',
    popular: false,
    saveAmount: 140,
    items: ['1× Mutton Kacchi', '4× Seekh Kebab', '2× Borhani', '1× Firni'],
    freeDrink: true,
    price: 820,
  },
  {
    id: 4,
    title: 'Office Lunch',
    serves: '5–6',
    popular: false,
    saveAmount: 380,
    items: ['3× Chicken Tehari', '1× Roast Chicken', '6× Borhani'],
    freeDrink: false,
    price: 2120,
  },
  {
    id: 5,
    title: 'Office Lunch',
    serves: '5–6',
    popular: false,
    saveAmount: 380,
    items: ['3× Chicken Tehari', '1× Roast Chicken', '6× Borhani'],
    freeDrink: false,
    price: 2120,
  },
];

export const CHEF_STORY = {
  label: 'MEET OUR CHEF',
  name: 'Chef Abul Bashar',
  bio: 'Trained in the old kitchens of Puran Dhaka and refined under three-star chefs in Lucknow, Chef Bashar has spent nearly three decades perfecting a single, uncompromising idea: Mughlai food cooked the slow, honest way.',
  quote: 'A great kacchi cannot be hurried — it has to be sealed, trusted, and waited on.',
  stats: { value: '28+', label: 'years at the pass' },
  badges: [
    { icon: 'trophy', text: '3× Best Chef · Dhaka', variant: 'dark' as const },
    { icon: 'star', text: 'Featured in Vogue India', variant: 'orange' as const },
    { icon: 'book', text: 'Author · "Slow Mughlai"', variant: 'light' as const },
  ],
  image: '/images/home/chef_abul_bashar.png',
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ebrahim',
    avatar: '/images/home/chef_abul_bashar.png',
    location: 'Chittagong',
    rating: 5,
    text: 'Ordered the Family Feast for an evening with my parents. They could not stop talking about the firni. Will order again on Friday.',
  },
  {
    id: 2,
    name: 'Arif Ahmed',
    avatar: '/images/home/cooking.png',
    location: 'Sylhet',
    rating: 4,
    text: 'The kacchi tastes like our family wedding biryani. The rice, the meat, the borhani — everything was just right. Delivered hot in 28 minutes.',
  },
  {
    id: 3,
    name: 'Fatema Khatun',
    avatar: '/images/home/dining_table.png',
    location: 'Chittagong',
    rating: 5,
    text: 'I have ordered from every premium biryani spot in Dhaka. This is now my default. Packaging is genuinely beautiful too.',
  },
  {
    id: 4,
    name: 'Rashid Khan',
    avatar: '/images/home/chef_abul_bashar.png',
    location: 'Dhaka',
    rating: 5,
    text: 'I ordered the Weekend Brunch combo for my family. The food was delicious and the delivery was prompt. Highly recommend!',
  },
];

export const CTA = {
  heading: 'Ready to taste the difference?',
  subheading: 'Order now and experience the authentic flavors of Dhaka.',
  primaryButton: { label: 'Order Now', href: '/foods' },
  secondaryButton: { label: 'View Menu', href: '/foods' },
};

export const BLOG_POSTS = [
  { id: 1, title: 'Street Food in Malaysia', image: '/images/home/blog_1.png' },
  { id: 2, title: 'Chicken Curry for Bachelors', image: '/images/home/blog_2.png' },
  { id: 3, title: 'Mughlai Kitchen Secrets', image: '/images/home/blog_3.png' },
  { id: 4, title: 'Authentic Kacchi Recipe', image: '/images/home/blog_2.png' },
  { id: 5, title: 'Dhaka Food Tour', image: '/images/home/blog_1.png' },
];
