import prisma from "./lib/prisma";
import { env } from "./config/env";

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.$transaction([
    prisma.foodFavorite.deleteMany(),
    prisma.foodReview.deleteMany(),
    prisma.foodRating.deleteMany(),
    prisma.foodLabel.deleteMany(),
    prisma.foodTagMapping.deleteMany(),
    prisma.foodDiet.deleteMany(),
    prisma.foodVisibility.deleteMany(),
    prisma.foodDiscount.deleteMany(),
    prisma.foodPrice.deleteMany(),
    prisma.foodSchedule.deleteMany(),
    prisma.foodAvailability.deleteMany(),
    prisma.foodPreparation.deleteMany(),
    prisma.foodAllergen.deleteMany(),
    prisma.foodNutrition.deleteMany(),
    prisma.foodIngredient.deleteMany(),
    prisma.foodAddonItem.deleteMany(),
    prisma.foodAddon.deleteMany(),
    prisma.foodVariant.deleteMany(),
    prisma.foodGallery.deleteMany(),
    prisma.foodImage.deleteMany(),
    prisma.food.deleteMany(),
    prisma.subCategory.deleteMany(),
    prisma.category.deleteMany(),
    prisma.foodTag.deleteMany(),
  ]);

  // Tags
  const tags = await Promise.all([
    prisma.foodTag.create({ data: { name: "Healthy", slug: "healthy" } }),
    prisma.foodTag.create({ data: { name: "High Protein", slug: "high-protein" } }),
    prisma.foodTag.create({ data: { name: "Low Carb", slug: "low-carb" } }),
    prisma.foodTag.create({ data: { name: "Keto", slug: "keto" } }),
    prisma.foodTag.create({ data: { name: "Popular", slug: "popular" } }),
    prisma.foodTag.create({ data: { name: "Chef Special", slug: "chef-special" } }),
    prisma.foodTag.create({ data: { name: "New", slug: "new" } }),
    prisma.foodTag.create({ data: { name: "Best Seller", slug: "best-seller" } }),
  ]);
  const tagMap: Record<string, string> = {};
  tags.forEach((t) => (tagMap[t.name] = t.id));

  // Categories & Subcategories
  const riceCat = await prisma.category.create({
    data: {
      name: "Rice & Biryani",
      slug: "rice-biryani",
      description: "Fragrant rice dishes and biryanis",
      sortOrder: 1,
      subCategories: {
        create: [
          { name: "Biryani", slug: "biryani", sortOrder: 1 },
          { name: "Plain Rice", slug: "plain-rice", sortOrder: 2 },
          { name: "Fried Rice", slug: "fried-rice", sortOrder: 3 },
        ],
      },
    },
    include: { subCategories: true },
  });

  const curryCat = await prisma.category.create({
    data: {
      name: "Curry & Gravy",
      slug: "curry-gravy",
      description: "Rich curries and gravies",
      sortOrder: 2,
      subCategories: {
        create: [
          { name: "Chicken Curry", slug: "chicken-curry", sortOrder: 1 },
          { name: "Beef Curry", slug: "beef-curry", sortOrder: 2 },
          { name: "Fish Curry", slug: "fish-curry", sortOrder: 3 },
          { name: "Vegetable Curry", slug: "vegetable-curry", sortOrder: 4 },
        ],
      },
    },
    include: { subCategories: true },
  });

  const breadCat = await prisma.category.create({
    data: {
      name: "Bread & Paratha",
      slug: "bread-paratha",
      description: "Freshly baked breads and parathas",
      sortOrder: 3,
      subCategories: {
        create: [
          { name: "Roti", slug: "roti", sortOrder: 1 },
          { name: "Paratha", slug: "paratha", sortOrder: 2 },
          { name: "Naan", slug: "naan", sortOrder: 3 },
        ],
      },
    },
    include: { subCategories: true },
  });

  const drinkCat = await prisma.category.create({
    data: {
      name: "Drinks & Beverages",
      slug: "drinks-beverages",
      description: "Refreshing drinks and beverages",
      sortOrder: 4,
      subCategories: {
        create: [
          { name: "Lassi", slug: "lassi", sortOrder: 1 },
          { name: "Juice", slug: "juice", sortOrder: 2 },
          { name: "Tea & Coffee", slug: "tea-coffee", sortOrder: 3 },
        ],
      },
    },
    include: { subCategories: true },
  });

  const dessertCat = await prisma.category.create({
    data: {
      name: "Desserts & Sweets",
      slug: "desserts-sweets",
      description: "Traditional and modern desserts",
      sortOrder: 5,
      subCategories: {
        create: [
          { name: "Bengali Sweets", slug: "bengali-sweets", sortOrder: 1 },
          { name: "Ice Cream", slug: "ice-cream", sortOrder: 2 },
          { name: "Pudding", slug: "pudding", sortOrder: 3 },
        ],
      },
    },
    include: { subCategories: true },
  });

  const saladCat = await prisma.category.create({
    data: {
      name: "Salads & Sides",
      slug: "salads-sides",
      description: "Fresh salads and side dishes",
      sortOrder: 6,
      subCategories: {
        create: [
          { name: "Green Salad", slug: "green-salad", sortOrder: 1 },
          { name: "Raita", slug: "raita", sortOrder: 2 },
          { name: "Pickles", slug: "pickles", sortOrder: 3 },
        ],
      },
    },
    include: { subCategories: true },
  });

  const categories: Record<string, any> = {
    "rice-biryani": riceCat,
    "curry-gravy": curryCat,
    "bread-paratha": breadCat,
    "drinks-beverages": drinkCat,
    "desserts-sweets": dessertCat,
    "salads-sides": saladCat,
  };

  // Helper to get random subcategory
  function getSubId(catSlug: string): string {
    const subs = categories[catSlug].subCategories;
    return subs[Math.floor(Math.random() * subs.length)].id;
  }

  // Foods
  const foodsData = [
    {
      name: "Chicken Biryani",
      slug: "chicken-biryani",
      catSlug: "rice-biryani",
      foodType: "NON_VEG" as const,
      spiceLevel: "MEDIUM",
      calories: 650,
      protein: 28,
      fat: 22,
      carbohydrate: 75,
      prepTime: 30,
      servingSize: "1 plate (400g)",
      isFeatured: true,
      isPopular: true,
      isRecommended: true,
      description: "Fragrant basmati rice layered with marinated chicken, caramelized onions, and aromatic spices. Cooked in the traditional dum style.",
      tagNames: ["Popular", "Best Seller", "Chef Special"],
      label: { label: "Best Seller", color: "#FF6B35" },
      diets: ["High Protein"],
      allergens: ["Milk", "Gluten"],
      ingredients: [
        { name: "Basmati Rice", qty: "200g", unit: "g" },
        { name: "Chicken", qty: "150g", unit: "g" },
        { name: "Yogurt", qty: "50g", unit: "g" },
        { name: "Onion", qty: "30g", unit: "g" },
      ],
      variants: [
        { name: "Regular", price: 250, servingSize: "1 plate" },
        { name: "Large", price: 380, servingSize: "1.5 plate" },
      ],
      addons: [
        { name: "Extra Chicken", items: [{ name: "1 Piece", price: 60 }, { name: "2 Pieces", price: 110 }] },
        { name: "Beverage", items: [{ name: "Borhani", price: 30 }, { name: "Coke", price: 25 }] },
      ],
    },
    {
      name: "Beef Curry",
      slug: "beef-curry",
      catSlug: "curry-gravy",
      foodType: "NON_VEG" as const,
      spiceLevel: "HOT",
      calories: 450,
      protein: 32,
      fat: 25,
      carbohydrate: 15,
      prepTime: 45,
      servingSize: "1 bowl (300g)",
      isFeatured: true,
      isPopular: true,
      isRecommended: false,
      description: "Tender beef slow-cooked in rich aromatic gravy with traditional Bengali spices. Perfect with rice or bread.",
      tagNames: ["Chef Special", "High Protein"],
      label: { label: "Chef Special", color: "#E63946" },
      diets: ["High Protein", "Keto"],
      allergens: ["Gluten"],
      ingredients: [
        { name: "Beef", qty: "200g", unit: "g" },
        { name: "Onion", qty: "50g", unit: "g" },
        { name: "Garlic", qty: "10g", unit: "g" },
        { name: "Ginger", qty: "10g", unit: "g" },
      ],
      variants: [
        { name: "Regular", price: 320, servingSize: "1 bowl" },
        { name: "Large", price: 480, servingSize: "1.5 bowl" },
      ],
      addons: [
        { name: "Extra Beef", items: [{ name: "Extra 50g", price: 80 }] },
        { name: "Bread", items: [{ name: "2 Roti", price: 20 }, { name: "1 Naan", price: 30 }] },
      ],
    },
    {
      name: "Vegetable Khichuri",
      slug: "vegetable-khichuri",
      catSlug: "rice-biryani",
      foodType: "VEG" as const,
      spiceLevel: "MILD",
      calories: 350,
      protein: 12,
      fat: 8,
      carbohydrate: 60,
      prepTime: 25,
      servingSize: "1 plate (350g)",
      isFeatured: false,
      isPopular: true,
      isRecommended: true,
      description: "Comforting one-pot dish of rice and lentils with mixed vegetables. Light, healthy, and easy to digest.",
      tagNames: ["Healthy", "Popular"],
      label: { label: "Healthy Choice", color: "#2A9D8F" },
      diets: ["Vegetarian", "Weight Loss"],
      allergens: [],
      ingredients: [
        { name: "Rice", qty: "100g", unit: "g" },
        { name: "Lentils", qty: "50g", unit: "g" },
        { name: "Mixed Vegetables", qty: "100g", unit: "g" },
        { name: "Ghee", qty: "10g", unit: "g" },
      ],
      variants: [
        { name: "Regular", price: 180, servingSize: "1 plate" },
        { name: "Large", price: 260, servingSize: "1.5 plate" },
      ],
      addons: [
        { name: "Toppings", items: [{ name: "Extra Ghee", price: 20 }, { name: "Fried Onion", price: 15 }] },
      ],
    },
    {
      name: "Grilled Chicken Salad",
      slug: "grilled-chicken-salad",
      catSlug: "salads-sides",
      foodType: "NON_VEG" as const,
      spiceLevel: "MILD",
      calories: 280,
      protein: 35,
      fat: 12,
      carbohydrate: 10,
      prepTime: 15,
      servingSize: "1 bowl (300g)",
      isFeatured: true,
      isPopular: false,
      isRecommended: true,
      description: "Fresh mixed greens topped with herb-marinated grilled chicken breast, cherry tomatoes, cucumber, and house dressing.",
      tagNames: ["Healthy", "High Protein", "Low Carb", "Keto"],
      label: { label: "Low Calorie", color: "#2A9D8F" },
      diets: ["Keto", "Weight Loss", "Low Sodium"],
      allergens: ["Milk"],
      ingredients: [
        { name: "Chicken Breast", qty: "150g", unit: "g" },
        { name: "Lettuce", qty: "100g", unit: "g" },
        { name: "Tomato", qty: "50g", unit: "g" },
        { name: "Olive Oil", qty: "15ml", unit: "ml" },
      ],
      variants: [
        { name: "Regular", price: 280, servingSize: "1 bowl" },
        { name: "Large", price: 380, servingSize: "1.5 bowl" },
      ],
      addons: [
        { name: "Extras", items: [{ name: "Extra Chicken", price: 70 }, { name: "Avocado", price: 50 }, { name: "Boiled Egg", price: 20 }] },
      ],
    },
    {
      name: "Daal (Lentil Soup)",
      slug: "daal-lentil-soup",
      catSlug: "curry-gravy",
      foodType: "VEG" as const,
      spiceLevel: "MILD",
      calories: 180,
      protein: 14,
      fat: 5,
      carbohydrate: 28,
      prepTime: 20,
      servingSize: "1 bowl (250ml)",
      isFeatured: false,
      isPopular: true,
      isRecommended: false,
      description: "Traditional Bengali lentil soup tempered with garlic, cumin, and mustard seeds. A comforting staple.",
      tagNames: ["Healthy", "Popular"],
      label: { label: "Everyday Classic", color: "#457B9D" },
      diets: ["Vegetarian", "Vegan"],
      allergens: [],
      ingredients: [
        { name: "Red Lentils", qty: "100g", unit: "g" },
        { name: "Turmeric", qty: "5g", unit: "g" },
        { name: "Garlic", qty: "10g", unit: "g" },
        { name: "Cumin", qty: "5g", unit: "g" },
      ],
      variants: [
        { name: "Regular", price: 80, servingSize: "1 bowl" },
        { name: "Large", price: 130, servingSize: "1.5 bowl" },
      ],
      addons: [
        { name: "Extras", items: [{ name: "Extra Ghee Tadka", price: 15 }] },
      ],
    },
    {
      name: "Mutton Rezala",
      slug: "mutton-rezala",
      catSlug: "curry-gravy",
      foodType: "NON_VEG" as const,
      spiceLevel: "MILD",
      calories: 520,
      protein: 30,
      fat: 28,
      carbohydrate: 18,
      prepTime: 50,
      servingSize: "1 bowl (300g)",
      isFeatured: true,
      isPopular: false,
      isRecommended: true,
      description: "Royal Mughlai dish featuring tender mutton in a creamy white gravy flavored with rose water, kewra, and saffron.",
      tagNames: ["Chef Special", "Best Seller"],
      label: { label: "Signature Dish", color: "#9B5DE5" },
      diets: ["High Protein"],
      allergens: ["Milk", "Nuts"],
      ingredients: [
        { name: "Mutton", qty: "200g", unit: "g" },
        { name: "Yogurt", qty: "100g", unit: "g" },
        { name: "Cream", qty: "50ml", unit: "ml" },
        { name: "Rose Water", qty: "5ml", unit: "ml" },
      ],
      variants: [
        { name: "Regular", price: 450, servingSize: "1 bowl" },
        { name: "Large", price: 650, servingSize: "1.5 bowl" },
      ],
      addons: [
        { name: "Extra Mutton", items: [{ name: "Extra 100g", price: 150 }] },
        { name: "Bread", items: [{ name: "2 Naan", price: 40 }] },
      ],
    },
    {
      name: "Plain Paratha",
      slug: "plain-paratha",
      catSlug: "bread-paratha",
      foodType: "VEG" as const,
      spiceLevel: "MILD",
      calories: 200,
      protein: 5,
      fat: 12,
      carbohydrate: 22,
      prepTime: 10,
      servingSize: "1 piece (80g)",
      isFeatured: false,
      isPopular: true,
      isRecommended: false,
      description: "Flaky, golden-brown layered flatbread made with whole wheat flour and ghee. Perfect with any curry.",
      tagNames: ["Popular"],
      label: { label: "Popular Pick", color: "#F4A261" },
      diets: ["Vegetarian"],
      allergens: ["Gluten", "Milk"],
      ingredients: [
        { name: "Wheat Flour", qty: "80g", unit: "g" },
        { name: "Ghee", qty: "10g", unit: "g" },
        { name: "Salt", qty: "2g", unit: "g" },
      ],
      variants: [
        { name: "1 Piece", price: 15, servingSize: "1 pc" },
        { name: "3 Pieces", price: 40, servingSize: "3 pc" },
        { name: "5 Pieces", price: 60, servingSize: "5 pc" },
      ],
      addons: [],
    },
    {
      name: "Mango Lassi",
      slug: "mango-lassi",
      catSlug: "drinks-beverages",
      foodType: "VEG" as const,
      spiceLevel: "MILD",
      calories: 180,
      protein: 6,
      fat: 8,
      carbohydrate: 24,
      prepTime: 5,
      servingSize: "1 glass (300ml)",
      isFeatured: true,
      isPopular: true,
      isRecommended: false,
      description: "Creamy yogurt-based drink blended with ripe Alphonso mangoes and a hint of cardamom. Refreshingly delicious.",
      tagNames: ["Popular", "Best Seller"],
      label: { label: "Refreshing", color: "#F4A261" },
      diets: ["Vegetarian"],
      allergens: ["Milk"],
      ingredients: [
        { name: "Yogurt", qty: "150ml", unit: "ml" },
        { name: "Mango Pulp", qty: "100g", unit: "g" },
        { name: "Sugar", qty: "15g", unit: "g" },
        { name: "Cardamom", qty: "1g", unit: "g" },
      ],
      variants: [
        { name: "Regular", price: 80, servingSize: "300ml" },
        { name: "Large", price: 120, servingSize: "500ml" },
      ],
      addons: [],
    },
    {
      name: "Rosogolla (2 pcs)",
      slug: "rosogolla-2pcs",
      catSlug: "desserts-sweets",
      foodType: "VEG" as const,
      spiceLevel: "MILD",
      calories: 220,
      protein: 4,
      fat: 5,
      carbohydrate: 42,
      prepTime: 2,
      servingSize: "2 pieces (100g)",
      isFeatured: false,
      isPopular: true,
      isRecommended: false,
      description: "Soft, spongy cottage cheese dumplings soaked in light sugar syrup. Bengal's most beloved sweet.",
      tagNames: ["Popular", "New"],
      label: { label: "Traditional", color: "#E63946" },
      diets: ["Vegetarian"],
      allergens: ["Milk"],
      ingredients: [
        { name: "Chhena", qty: "80g", unit: "g" },
        { name: "Sugar Syrup", qty: "50ml", unit: "ml" },
        { name: "Rose Water", qty: "2ml", unit: "ml" },
      ],
      variants: [
        { name: "2 Pieces", price: 40, servingSize: "2 pcs" },
        { name: "6 Pieces", price: 110, servingSize: "6 pcs" },
      ],
      addons: [],
    },
    {
      name: "Fish Curry (Rui/Katol)",
      slug: "fish-curry-rui-katol",
      catSlug: "curry-gravy",
      foodType: "SEAFOOD" as const,
      spiceLevel: "MEDIUM",
      calories: 380,
      protein: 28,
      fat: 18,
      carbohydrate: 12,
      prepTime: 35,
      servingSize: "1 bowl (350g)",
      isFeatured: true,
      isPopular: true,
      isRecommended: true,
      description: "Traditional Bengali fish curry made with freshwater Rui/Katol in a turmeric and mustard gravy. Authentic and soulful.",
      tagNames: ["Chef Special", "High Protein", "Popular"],
      label: { label: "Bengali Classic", color: "#E63946" },
      diets: ["High Protein"],
      allergens: ["Fish"],
      ingredients: [
        { name: "Rui Fish", qty: "200g", unit: "g" },
        { name: "Mustard Paste", qty: "20g", unit: "g" },
        { name: "Turmeric", qty: "5g", unit: "g" },
        { name: "Green Chili", qty: "10g", unit: "g" },
      ],
      variants: [
        { name: "Regular", price: 280, servingSize: "1 bowl" },
        { name: "Large", price: 420, servingSize: "1.5 bowl" },
      ],
      addons: [
        { name: "Extras", items: [{ name: "Fish Head", price: 50 }] },
      ],
    },
  ];

  for (const fd of foodsData) {
    const cat = categories[fd.catSlug];
    const subId = getSubId(fd.catSlug);

    const food = await prisma.food.create({
      data: {
        categoryId: cat.id,
        subCategoryId: subId,
        foodCode: `FD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        name: fd.name,
        slug: fd.slug,
        shortDescription: fd.description.slice(0, 120),
        description: fd.description,
        thumbnail: `https://placehold.co/400x300/E8F5E9/2E7D32?text=${encodeURIComponent(fd.name)}`,
        coverImage: `https://placehold.co/800x400/E8F5E9/2E7D32?text=${encodeURIComponent(fd.name)}`,
        preparationTime: fd.prepTime,
        calories: fd.calories,
        protein: fd.protein,
        fat: fd.fat,
        carbohydrate: fd.carbohydrate,
        servingSize: fd.servingSize,
        foodType: fd.foodType,
        spiceLevel: fd.spiceLevel,
        isFeatured: fd.isFeatured,
        isPopular: fd.isPopular,
        isRecommended: fd.isRecommended,
        status: "active",
      },
    });

    // Nutrition
    await prisma.foodNutrition.create({
      data: {
        foodId: food.id,
        calories: fd.calories,
        protein: fd.protein,
        fat: fd.fat,
        carbohydrate: fd.carbohydrate,
        fiber: Math.floor(fd.carbohydrate * 0.1),
        sugar: Math.floor(fd.carbohydrate * 0.15),
        sodium: Math.floor(Math.random() * 500 + 100),
        cholesterol: fd.foodType === "VEG" ? 0 : Math.floor(Math.random() * 100 + 50),
        servingSize: fd.servingSize,
      },
    });

    // Price
    const basePrice = fd.variants[0]?.price || 100;
    await prisma.foodPrice.create({
      data: {
        foodId: food.id,
        basePrice,
        salePrice: basePrice - Math.floor(basePrice * 0.1),
        currency: "BDT",
        status: "active",
      },
    });

    // Availability
    await prisma.foodAvailability.create({
      data: {
        foodId: food.id,
        isAvailable: true,
        availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    });

    // Visibility
    await prisma.foodVisibility.create({
      data: {
        foodId: food.id,
        isVisible: true,
        isFeatured: fd.isFeatured,
        isRecommended: fd.isRecommended,
        displayOrder: 0,
      },
    });

    // Rating (start with mock)
    const avgRating = (3 + Math.random() * 2).toFixed(1);
    await prisma.foodRating.create({
      data: {
        foodId: food.id,
        averageRating: parseFloat(avgRating),
        totalReview: Math.floor(Math.random() * 50 + 5),
        fiveStar: Math.floor(Math.random() * 20 + 3),
        fourStar: Math.floor(Math.random() * 15 + 2),
        threeStar: Math.floor(Math.random() * 10 + 1),
        twoStar: Math.floor(Math.random() * 5),
        oneStar: Math.floor(Math.random() * 3),
      },
    });

    // Label
    if (fd.label) {
      await prisma.foodLabel.create({
        data: { foodId: food.id, label: fd.label.label, color: fd.label.color },
      });
    }

    // Diets
    for (const diet of fd.diets) {
      await prisma.foodDiet.create({
        data: { foodId: food.id, dietType: diet },
      });
    }

    // Allergens
    for (const allergen of fd.allergens) {
      await prisma.foodAllergen.create({
        data: { foodId: food.id, allergen },
      });
    }

    // Ingredients
    for (const ing of fd.ingredients) {
      await prisma.foodIngredient.create({
        data: {
          foodId: food.id,
          ingredientName: ing.name,
          quantity: ing.qty,
          unit: ing.unit,
        },
      });
    }

    // Tags
    for (const tagName of fd.tagNames) {
      if (tagMap[tagName]) {
        await prisma.foodTagMapping.create({
          data: { foodId: food.id, tagId: tagMap[tagName] },
        });
      }
    }

    // Variants
    for (const v of fd.variants) {
      await prisma.foodVariant.create({
        data: {
          foodId: food.id,
          name: v.name,
          price: v.price,
          servingSize: v.servingSize,
          status: "active",
        },
      });
    }

    // Addons
    if (fd.addons.length > 0) {
      const addon = await prisma.foodAddon.create({
        data: {
          foodId: food.id,
          name: fd.addons[0].name,
          isRequired: false,
          maxSelection: fd.addons[0].items.length,
          status: "active",
        },
      });

      for (const item of fd.addons[0].items) {
        await prisma.foodAddonItem.create({
          data: {
            addonId: addon.id,
            name: item.name,
            price: item.price,
            status: "active",
          },
        });
      }

      if (fd.addons.length > 1) {
        const addon2 = await prisma.foodAddon.create({
          data: {
            foodId: food.id,
            name: fd.addons[1].name,
            isRequired: false,
            maxSelection: fd.addons[1].items.length,
            status: "active",
          },
        });

        for (const item of fd.addons[1].items) {
          await prisma.foodAddonItem.create({
            data: {
              addonId: addon2.id,
              name: item.name,
              price: item.price,
              status: "active",
            },
          });
        }
      }
    }
  }

  console.log("Seed complete — 6 categories, 10 foods created.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
