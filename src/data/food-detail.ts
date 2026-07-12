function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(9201);

const reviewAuthors = [
  "Amina K.", "Rafiq H.", "Sadia M.", "Tanvir A.", "Nusrat J.",
  "Kabir S.", "Farhana B.", "Mehedi R.", "Taslima P.", "Jahid I.",
];

const reviewComments = [
  "Absolutely delicious! The flavors were perfectly balanced.",
  "Good portion size for the price. Would order again.",
  "Freshly prepared and arrived hot. Impressive packaging.",
  "Taste was great but spice level was a bit too mild for me.",
  "My family loved it! Ordering again this weekend.",
  "Not bad but I've had better. The delivery was prompt though.",
  "Excellent quality ingredients. You can taste the difference.",
  "Too oily for my liking. The flavor was okay.",
  "Perfect for our office lunch. Everyone enjoyed it.",
  "The portion was smaller than expected but taste made up for it.",
  "Authentic flavors! Reminds me of homemade cooking.",
  "Value for money. Will definitely recommend to friends.",
];

const foodDescriptions: Record<string, string> = {
  "Royal Mutton Kacchi": "A regal preparation of tender mutton slow-cooked with aromatic basmati rice, layered with saffron, caramelized onions, and a blend of traditional spices. This dish is a celebration of flavor, cooked in a sealed pot to lock in every drop of richness.",
  "Chicken Biryani": "Fragrant basmati rice layered with marinated chicken, caramelized onions, and a signature spice blend. Each grain is separate, each bite infused with the aroma of saffron and ghee.",
  "Special Tehari": "A traditional Bengali take on biryani, featuring succulent beef slow-cooked with aged rice and a medley of warm spices. The meat is so tender it falls off the bone.",
  "Mutton Rezala": "Succulent pieces of mutton cooked in a creamy, pale-yellow gravy made from poppy seed paste, ghee, and aromatic spices. A mild yet profoundly flavorful Mughlai classic.",
  "Shorshe Ilish": "Hilsa fish fillets simmered in a pungent mustard seed gravy with green chilies and turmeric. A quintessential Bengali delicacy served with steamed rice.",
  "Prawn Malai Curry": "Jumbo prawns cooked in a rich coconut milk gravy with turmeric, cinnamon, and cardamom. The sweetness of coconut balances the warmth of spices perfectly.",
  "Chicken Korma": "Tender chicken pieces slow-cooked in a luxurious gravy of yoghurt, cream, ground nuts, and rose-scented spices. A royal dish fit for special occasions.",
  "Vegetable Khichuri": "A comforting one-pot dish of rice and lentils cooked with seasonal vegetables and a tempering of cumin and ghee. Light, nourishing, and full of subtle flavors.",
  "Kung Pao Chicken": "Crispy chicken stir-fried with peanuts, dried red chilies, and Sichuan peppercorns in a savory-sweet soy glaze. The perfect balance of heat and crunch.",
  "Fried Rice": "Steamed rice wok-tossed with eggs, spring onions, carrots, and peas in a light soy seasoning. Simple, satisfying, and packed with wok hei flavor.",
  "Spring Rolls": "Crispy golden rolls stuffed with a savory filling of shredded vegetables, glass noodles, and aromatic herbs. Served with a tangy dipping sauce.",
  "Mapo Tofu": "Silken tofu cubes in a fiery Sichuan chili bean sauce with minced pork, fermented black beans, and numbing Sichuan peppercorns.",
  "Chow Mein": "Stir-fried noodles with crunchy vegetables, soy sauce, and a hint of sesame oil. A classic Indo-Chinese staple with the perfect chew.",
  "Margherita Pizza": "Classic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, basil leaves, and a drizzle of extra virgin olive oil on a thin, charred crust.",
  "Pasta Alfredo": "Fettuccine tossed in a velvety parmesan cream sauce with butter, garlic, and a pinch of nutmeg. Rich, comforting, and indulgent.",
  "Lasagna": "Layers of tender pasta sheets filled with seasoned ground beef, béchamel sauce, and melted mozzarella, baked to golden perfection.",
  "Risotto": "Arborio rice slowly stirred with bone broth, white wine, and parmesan until creamy. Finished with a pat of butter for extra silkiness.",
  "Minestrone Soup": "A hearty Italian vegetable soup with cannellini beans, pasta, tomatoes, and fresh herbs simmered in a savory broth.",
  "Butter Chicken": "Tandoori chicken pieces simmered in a velvety tomato-cream sauce enriched with butter, kasuri methi, and aromatic spices.",
  "Palak Paneer": "Cubes of homemade cottage cheese in a vibrant spinach puree seasoned with cumin, garlic, and garam masala. A vegetarian classic.",
  "Dal Makhani": "Black lentils and kidney beans slow-cooked overnight with butter, cream, and aromatic spices until rich and velvety.",
  "Chicken Tikka": "Chicken pieces marinated in spiced yoghurt and grilled to perfection. Served with mint chutney and pickled onions.",
  "Gulab Jamun": "Deep-fried milk solid dumplings soaked in rose-scented sugar syrup. Warm, soft, and impossibly sweet.",
  "Firni": "A delicate rice pudding slow-cooked with milk, cardamom, and saffron, garnished with slivered almonds and pistachios.",
  "Chocolate Mousse": "Rich, airy dark chocolate mousse made with Belgian chocolate, fresh cream, and a touch of espresso. A decadent finish to any meal.",
  "Beef Bhuna": "Prime beef chunks slow-cooked with caramelized onions, yogurt, and a robust blend of whole spices until the gravy reduces to a thick, intense coating.",
  "Smoked Brisket Platter": "Slow-smoked beef brisket with a peppery bark, served with tangy BBQ sauce, pickles, and toasted brioche buns.",
  "Lamb Shawarma Wrap": "Thinly sliced spiced lamb with garlic toum, pickled turnips, and fresh veggies wrapped in warm pita bread.",
  "Crispy Calamari": "Tender calamari rings lightly battered and fried golden, served with marinara dipping sauce and lemon wedges.",
  "Mushroom Risotto": "Creamy arborio rice with sauteed wild mushrooms, truffle oil, parmesan, and fresh thyme. Rich and earthy.",
  "Tofu Stir-fry": "Crispy tofu tossed with colorful bell peppers, snap peas, and broccoli in a savory ginger-soy glaze.",
  "Beef Steak": "Prime cut grilled to perfection, served with garlic butter, roasted vegetables, and herbed mashed potatoes.",
  "Grilled Salmon": "Atlantic salmon fillet with lemon-herb crust, served with sauteed asparagus and dill yoghurt sauce.",
  "Falafel Plate": "Crispy chickpea falafel with hummus, tabbouleh, pita bread, and a drizzle of tahini sauce. Fresh and satisfying.",
  "Chicken Quesadilla": "Grilled tortilla filled with seasoned chicken, melted cheese, bell peppers, and onions. Served with sour cream and salsa.",
  "Avocado Toast": "Smashed avocado on sourdough with cherry tomatoes, microgreens, chili flakes, and a poached egg.",
  "Pancake Stack": "Fluffy buttermilk pancakes layered with fresh berries, maple syrup, and a dollop of whipped cream.",
  "Caesar Wrap": "Grilled chicken, romaine, parmesan, and caesar dressing wrapped in a sun-dried tomato tortilla.",
  "Tom Yum Soup": "Hot and sour Thai soup with shrimp, mushrooms, lemongrass, galangal, and kaffir lime leaves in a spicy broth.",
  "Pad Thai": "Rice noodles stir-fried with shrimp, tofu, bean sprouts, eggs, and peanuts in a tangy tamarind sauce.",
  "Mango Lassi": "A refreshing blend of ripe mangoes, yoghurt, and a pinch of cardamom. Cool and creamy.",
  "Lamb Chops": "Herb-crusted lamb chops grilled to medium-rare, served with mint sauce and roasted root vegetables.",
  "Veggie Burger": "House-made black bean and quinoa patty with lettuce, tomato, avocado, and chipotle aioli on a brioche bun.",
  "Fish & Chips": "Beer-battered cod fillets fried golden, served with thick-cut fries, mushy peas, and tartar sauce.",
  "Croissant Sandwich": "Flaky butter croissant filled with smoked turkey, brie, arugula, and honey mustard.",
  "Berry Smoothie Bowl": "Blended acai and mixed berries topped with granola, coconut flakes, banana, and chia seeds.",
  "Sushi Platter": "Chef's selection of nigiri, maki, and sashimi with pickled ginger, wasabi, and soy sauce.",
  "Bibimbap": "Korean rice bowl with sauteed vegetables, beef bulgogi, a fried egg, and gochujang sauce.",
  "Pho Bo": "Vietnamese beef noodle soup with rich bone broth, rice noodles, rare beef slices, and fresh herbs.",
  "Caprese Panini": "Grilled ciabatta with fresh mozzarella, tomato slices, basil pesto, and balsamic glaze.",
  "Chicken Wrap": "Grilled chicken breast with mixed greens, tomatoes, cucumber, and tzatziki in a whole wheat wrap.",
  "Bacon Cheeseburger": "Angus beef patty with crispy bacon, cheddar, lettuce, tomato, and special sauce on a sesame bun.",
  "Tiramisu": "Layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder. A classic Italian indulgence.",
};

const ratings = [3.5, 4.0, 4.5, 4.0, 5.0, 3.0, 4.5, 3.5, 4.0, 4.5, 3.5, 4.0];

const foodImages = [
  "https://images.pexels.com/photos/2299981/pexels-photo-2299981.jpeg",
  "https://images.pexels.com/photos/6068717/pexels-photo-6068717.jpeg",
  "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
];

export interface FoodReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FoodDetail {
  id: string;
  name: string;
  description: string;
  images: string[];
  gallery: string[];
  avgRating: number;
  totalReviews: number;
  reviews: FoodReview[];
}

export function getFoodDetail(foodName: string): FoodDetail {
  const existing = foodDetailsMap.get(foodName);
  if (existing) return existing;

  const reviewCount = 3 + Math.floor(rand() * 4);
  const reviews: FoodReview[] = [];
  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      id: `rev_${foodName.toLowerCase().replace(/\s+/g, "_")}_${i + 1}`,
      author: reviewAuthors[Math.floor(rand() * reviewAuthors.length)],
      rating: ratings[Math.floor(rand() * ratings.length)],
      comment: reviewComments[Math.floor(rand() * reviewComments.length)],
      date: new Date(2026, Math.floor(rand() * 6), Math.floor(1 + rand() * 28))
        .toISOString().split("T")[0],
    });
  }

  const totalRating = reviews.reduce((s, r) => s + r.rating, 0);
  const avgRating = Math.round((totalRating / reviews.length) * 10) / 10;

  const shuffled = [...foodImages].sort(() => rand() - 0.5);
  const detail: FoodDetail = {
    id: `detail_${foodName.toLowerCase().replace(/\s+/g, "_")}`,
    name: foodName,
    description: foodDescriptions[foodName] ?? "A delicious dish prepared with the finest ingredients, blending traditional recipes with modern culinary techniques.",
    images: shuffled,
    gallery: shuffled,
    avgRating,
    totalReviews: reviews.length,
    reviews,
  };

  foodDetailsMap.set(foodName, detail);
  return detail;
}

const foodDetailsMap = new Map<string, FoodDetail>();
