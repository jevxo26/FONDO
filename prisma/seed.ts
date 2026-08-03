import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient, type FoodType, type Role } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_PASSWORD = "Password@123";
const img = (seed: string, w = 600, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const ADMIN_EMAIL = "admin@fondo.com";

// ============================================================
// Helpers
// ============================================================

async function deleteFoodWithChildren(foodId: string) {
  await prisma.$transaction([
    prisma.vendorFoodStatusHistory.deleteMany({ where: { vendorFood: { foodId } } }),
    prisma.vendorFood.deleteMany({ where: { foodId } }),
    prisma.vendorFoodAssignment.deleteMany({ where: { foodId } }),
    prisma.packageMealFood.deleteMany({ where: { foodId } }),
    prisma.foodVariant.deleteMany({ where: { foodId } }),
    prisma.foodAddonItem.deleteMany({ where: { addon: { foodId } } }),
    prisma.foodAddon.deleteMany({ where: { foodId } }),
    prisma.foodIngredient.deleteMany({ where: { foodId } }),
    prisma.foodAllergen.deleteMany({ where: { foodId } }),
    prisma.foodPreparation.deleteMany({ where: { foodId } }),
    prisma.foodAvailability.deleteMany({ where: { foodId } }),
    prisma.foodSchedule.deleteMany({ where: { foodId } }),
    prisma.foodPrice.deleteMany({ where: { foodId } }),
    prisma.foodDiscount.deleteMany({ where: { foodId } }),
    prisma.foodTagMapping.deleteMany({ where: { foodId } }),
    prisma.foodLabel.deleteMany({ where: { foodId } }),
    prisma.foodReview.deleteMany({ where: { foodId } }),
    prisma.foodFavorite.deleteMany({ where: { foodId } }),
    prisma.foodVisibility.deleteMany({ where: { foodId } }),
    prisma.foodDiet.deleteMany({ where: { foodId } }),
    prisma.foodImage.deleteMany({ where: { foodId } }),
    prisma.food.delete({ where: { id: foodId } }),
  ]);
}

async function deletePackageWithChildren(packageId: string) {
  await prisma.$transaction([
    prisma.packageImage.deleteMany({ where: { packageId } }),
    prisma.packageTag.deleteMany({ where: { packageId } }),
    prisma.packageReview.deleteMany({ where: { packageId } }),
    prisma.packageRating.deleteMany({ where: { packageId } }),
    prisma.packageNutrition.deleteMany({ where: { packageId } }),
    prisma.packageSchedule.deleteMany({ where: { packageId } }),
    prisma.packageAvailability.deleteMany({ where: { packageId } }),
    prisma.packageCustomization.deleteMany({ where: { packageId } }),
    prisma.packageBenefit.deleteMany({ where: { packageId } }),
    prisma.packageRule.deleteMany({ where: { packageId } }),
    prisma.packagePrice.deleteMany({ where: { packageId } }),
    prisma.packageMealFood.deleteMany({ where: { packageMeal: { packageDay: { packageId } } } }),
    prisma.packageMeal.deleteMany({ where: { packageDay: { packageId } } }),
    prisma.packageDay.deleteMany({ where: { packageId } }),
    prisma.package.delete({ where: { id: packageId } }),
  ]);
}

type FoodSeed = {
  name: string;
  slug: string;
  category: string;
  subCategory?: string;
  foodType: FoodType;
  spiceLevel?: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  salePrice?: number;
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrate?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  servingSize?: string;
  preparationTime?: number;
  featured?: boolean;
  popular?: boolean;
  recommended?: boolean;
  variants: { name: string; price: number; discountPrice?: number; weight?: string; servingSize?: string }[];
  addons?: { name: string; isRequired?: boolean; maxSelection?: number; items: { name: string; price: number }[] }[];
  ingredients: string[];
  allergens?: string[];
  labels?: string[];
  tagSlugs?: string[];
  diets?: string[];
  schedules?: { mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS"; startTime: string; endTime: string }[];
  availableDays?: string[];
  gallery?: number;
};

async function seedFood(vendorId: string, adminUserId: string, categoryMap: Record<string, string>, subCategoryMap: Record<string, string>, tagIdBySlug: Map<string, string>, f: FoodSeed) {
  const existing = await prisma.food.findUnique({ where: { slug: f.slug } });
  if (existing) await deleteFoodWithChildren(existing.id);

  const foodCode = `FD-${f.slug.split("-").slice(0, 2).join("-").toUpperCase()}`;

  return prisma.food.create({
    data: {
      categoryId: categoryMap[f.category],
      subCategoryId: f.subCategory ? subCategoryMap[f.subCategory] : undefined,
      foodCode,
      name: f.name,
      slug: f.slug,
      shortDescription: f.shortDescription,
      description: f.description,
      thumbnail: img(`${f.slug}-t`, 600, 450),
      coverImage: img(`${f.slug}-c`, 1200, 600),
      preparationTime: f.preparationTime ?? 30,
      calories: f.calories,
      protein: f.protein,
      fat: f.fat,
      carbohydrate: f.carbohydrate,
      fiber: f.fiber,
      sugar: f.sugar,
      sodium: f.sodium,
      servingSize: f.servingSize,
      averageRating: f.popular ? 4.6 : 4.2,
      totalReview: f.popular ? 128 : 42,
      foodType: f.foodType,
      spiceLevel: f.spiceLevel,
      isFeatured: f.featured ?? false,
      isPopular: f.popular ?? false,
      isRecommended: f.recommended ?? false,
      status: "APPROVED",
      approvedBy: adminUserId,
      approvedAt: new Date(),

      variants: { create: f.variants.map((v) => ({ name: v.name, price: v.price, discountPrice: v.discountPrice, weight: v.weight, servingSize: v.servingSize })) },
      prices: { create: [{ basePrice: f.basePrice, salePrice: f.salePrice, currency: "BDT" }] },
      addons: f.addons
        ? {
            create: f.addons.map((a) => ({
              name: a.name,
              isRequired: a.isRequired ?? false,
              maxSelection: a.maxSelection,
              items: { create: a.items.map((i) => ({ name: i.name, price: i.price })) },
            })),
          }
        : undefined,
      ingredients: { create: f.ingredients.map((name) => ({ ingredientName: name })) },
      allergens: f.allergens ? { create: f.allergens.map((allergen) => ({ allergen })) } : undefined,
      preparation: { create: { preparationTime: f.preparationTime ?? 30 } },
      availability: {
        create: { isAvailable: true, availableDays: f.availableDays ?? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      },
      schedules: f.schedules
        ? { create: f.schedules.map((s) => ({ mealType: s.mealType, startTime: s.startTime, endTime: s.endTime })) }
        : undefined,
      discounts: f.salePrice
        ? { create: [{ discountType: "PERCENTAGE", discountValue: Math.round(((f.basePrice - f.salePrice) / f.basePrice) * 100) }] }
        : undefined,
      labels: f.labels ? { create: f.labels.map((label) => ({ label, color: "#CEA359" })) } : undefined,
      tagMappings: f.tagSlugs?.length
        ? { create: f.tagSlugs.map((slug) => ({ tagId: tagIdBySlug.get(slug)! })).filter((m) => Boolean(m.tagId)) }
        : undefined,
      diets: f.diets ? { create: f.diets.map((dietType) => ({ dietType })) } : undefined,
      images: { create: Array.from({ length: f.gallery ?? 3 }, (_, i) => ({ image: img(`${f.slug}-g${i}`, 800, 600), sortOrder: i })) },
      visibility: { create: { isVisible: true, isFeatured: f.featured ?? false, isRecommended: f.recommended ?? false } },

      vendorFoods: {
        create: {
          vendorId,
          vendorFoodCode: f.slug.toUpperCase(),
          status: "active",
          isAvailable: true,
          isPrimary: true,
          statusHistories: {
            create: { oldStatus: null, newStatus: "approved", reason: "Seeded as approved food" },
          },
        },
      },
      vendorFoodAssignments: {
        create: { vendorId, priority: 1, isDefault: true, allocationPercentage: 100, status: "active" },
      },
    },
  });
}

type PackageSeed = {
  name: string;
  slug: string;
  packageCode: string;
  packageType: string;
  description: string;
  durationDays: number;
  price: number;
  discountPrice?: number;
  category: string;
  days: { dayNumber: number; title: string; meals: { mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS"; mealTime: string; foods: { slug: string; quantity?: number }[] }[] }[];
  benefits?: { title: string; description?: string; icon?: string }[];
  tags?: string[];
  dailyCalories?: number;
  dailyProtein?: number;
  dailyCarbs?: number;
  dailyFat?: number;
};

async function seedPackage(vendorId: string, adminUserId: string, categoryId: string, foodBySlug: Map<string, string>, p: PackageSeed) {
  const existing = await prisma.package.findUnique({ where: { slug: p.slug } });
  if (existing) await deletePackageWithChildren(existing.id);

  const totalMeals = p.days.reduce((sum, d) => sum + d.meals.length, 0);

  return prisma.package.create({
    data: {
      packageCode: p.packageCode,
      name: p.name,
      slug: p.slug,
      description: p.description,
      thumbnail: img(`${p.slug}-t`, 800, 500),
      coverImage: img(`${p.slug}-c`, 1200, 600),
      packageType: p.packageType,
      durationDays: p.durationDays,
      totalMeals,
      price: p.price,
      discountPrice: p.discountPrice,
      currency: "BDT",
      isCustomizable: true,
      status: "APPROVED",
      approvedBy: adminUserId,
      approvedAt: new Date(),
      vendorId,
      packageCategoryId: categoryId,

      prices: {
        create: [{ basePrice: p.price, discountPrice: p.discountPrice, totalPrice: p.discountPrice ?? p.price, status: "active" }],
      },
      nutrition: {
        create: {
          dailyCalories: p.dailyCalories,
          dailyProtein: p.dailyProtein,
          dailyCarbohydrate: p.dailyCarbs,
          dailyFat: p.dailyFat,
        },
      },
      rule: { create: { minimumOrderDays: 1, maximumOrderDays: 30, minimumMealsPerDay: 2, maximumMealsPerDay: 4, advancePaymentRequired: true } },
      benefits: p.benefits ? { create: p.benefits.map((b, i) => ({ title: b.title, description: b.description, icon: b.icon, sortOrder: i })) } : undefined,
      tags: p.tags ? { create: p.tags.map((tag) => ({ tag })) } : undefined,
      schedule: { create: { deliveryDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], deliveryTimeStart: "08:00", deliveryTimeEnd: "20:00", mealCutoffTime: "22:00", status: "active" } },
      availability: { create: { availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], status: "active" } },
      customization: { create: { allowFoodReplace: true, allowMealSkip: true, allowExtraMeal: true, allowDrink: true } },
      rating: { create: { averageRating: 4.5, totalReview: 76, fiveStar: 58, fourStar: 12, threeStar: 4, twoStar: 1, oneStar: 1 } },
      images: { create: [0, 1].map((i) => ({ image: img(`${p.slug}-i${i}`, 800, 600), sortOrder: i })) },

      days: {
        create: p.days.map((d) => ({
          dayNumber: d.dayNumber,
          title: d.title,
          meals: {
            create: d.meals.map((m) => ({
              mealType: m.mealType,
              mealTime: m.mealTime,
              foods: {
                create: m.foods
                  .map((fm) => ({ foodId: foodBySlug.get(fm.slug)!, quantity: fm.quantity ?? 1 }))
                  .filter((fm) => Boolean(fm.foodId)),
              },
            })),
          },
        })),
      },
    },
  });
}

// ============================================================
// Main
// ============================================================

async function main() {
  const hash = await bcrypt.hash(SEED_PASSWORD, 10);

  // ---- Users (5 roles) ----
  const users: Record<Role, string> = {
    SUPER_ADMIN: "superadmin@fondo.com",
    ADMIN: "admin@fondo.com",
    VENDOR: "vendor@fondo.com",
    RIDER: "rider@fondo.com",
    CUSTOMER: "customer@fondo.com",
  };

  for (const [role, email] of Object.entries(users)) {
    const firstName = role.charAt(0) + role.slice(1).toLowerCase();
    await prisma.user.upsert({
      where: { email },
      update: { password: hash, isEmailVerified: true, isPhoneVerified: true, status: "ACTIVE" },
      create: {
        firstName,
        lastName: "User",
        phone: `01${String(1000000000 + Object.values(users).indexOf(email) * 100).padStart(9, "0")}`,
        email,
        password: hash,
        role: role as Role,
        status: "ACTIVE",
        isEmailVerified: true,
        isPhoneVerified: true,
      },
    });
  }

  const adminUserId = (await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } }))!.id;

  // ---- Vendor ----
  const vendor = await prisma.vendor.upsert({
    where: { email: users.VENDOR },
    update: { status: "APPROVED", isActive: true },
    create: {
      vendorCode: "VND-001",
      businessName: "Green Bowl Kitchen",
      ownerName: "Vendor Owner",
      phone: "01900000001",
      email: users.VENDOR,
      tradeLicenseNumber: "TL-2024-001",
      tinNumber: "TIN-2024-001",
      binNumber: "BIN-2024-001",
      logo: img("vendor-logo", 200, 200),
      coverImage: img("vendor-cover", 1200, 400),
      description: "Fresh, healthy and home-style meals delivered daily.",
      status: "APPROVED",
      verificationStatus: "VERIFIED",
      isActive: true,
      isOnline: true,
      commissionType: "PERCENTAGE",
      commissionValue: 10,
      openingTime: "08:00",
      closingTime: "22:00",
    },
  });

  await prisma.vendorSettings.upsert({
    where: { vendorId: vendor.id },
    update: {},
    create: { vendorId: vendor.id, autoAcceptOrder: false, autoAssignRider: false, allowCustomMeal: true, allowPackage: true, notificationEnabled: true },
  });

  await prisma.user.update({ where: { email: users.VENDOR }, data: { vendorId: vendor.id } });

  // ---- Rider ----
  const riderUser = await prisma.user.findUnique({ where: { email: users.RIDER } });
  const rider = await prisma.rider.upsert({
    where: { riderCode: "RDR-001" },
    update: { userId: riderUser!.id },
    create: {
      riderCode: "RDR-001",
      fullName: "Rider User",
      phone: "01900000002",
      email: users.RIDER,
      profileImage: img("rider", 200, 200),
      employmentType: "FULL_TIME",
      status: "active",
      isOnline: false,
      isAvailable: true,
      joiningDate: new Date(),
      userId: riderUser!.id,
    },
  });
  console.log("rider:", rider.riderCode);

  // ---- Categories + SubCategories ----
  const categorySeeds = [
    { name: "Main Course", slug: "main-course", subs: [["Rice", "rice"], ["Curry", "curry"], ["Noodles", "noodles"]] },
    { name: "Breakfast", slug: "breakfast", subs: [["Paratha", "paratha"], ["Omelette", "omelette"]] },
    { name: "Beverage", slug: "beverage", subs: [["Cold Drinks", "cold-drinks"], ["Smoothies", "smoothies"]] },
    { name: "Dessert", slug: "dessert", subs: [["Cakes", "cakes"], ["Ice Cream", "ice-cream"]] },
  ] as const;

  const categoryMap: Record<string, string> = {};
  const subCategoryMap: Record<string, string> = {};

  for (const cat of categorySeeds) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { status: "active", popular: true },
      create: { name: cat.name, slug: cat.slug, description: `${cat.name} dishes`, icon: "utensils", image: img(`cat-${cat.slug}`, 800, 500), status: "active", popular: true },
    });
    categoryMap[cat.name] = category.id;
    for (const [subName, subSlug] of cat.subs) {
      const sub = await prisma.subCategory.upsert({
        where: { slug: subSlug },
        update: { categoryId: category.id, status: "active" },
        create: { categoryId: category.id, name: subName, slug: subSlug, status: "active" },
      });
      subCategoryMap[subName] = sub.id;
    }
  }

  // ---- Food Tags ----
  const tagSlugs = ["healthy", "high-protein", "keto", "vegan", "spicy", "low-carb", "gluten-free"];
  const tagNameBySlug: Record<string, string> = {
    healthy: "Healthy",
    "high-protein": "High Protein",
    keto: "Keto",
    vegan: "Vegan",
    spicy: "Spicy",
    "low-carb": "Low Carb",
    "gluten-free": "Gluten Free",
  };
  for (const slug of tagSlugs) {
    await prisma.foodTag.upsert({ where: { slug }, update: {}, create: { name: tagNameBySlug[slug], slug } });
  }
  const tagRecords = await prisma.foodTag.findMany({ where: { slug: { in: tagSlugs } } });
  const tagIdBySlug = new Map(tagRecords.map((t) => [t.slug, t.id]));

  // ---- Foods ----
  const foods: FoodSeed[] = [
    {
      name: "Grilled Chicken Bowl",
      slug: "grilled-chicken-bowl",
      category: "Main Course",
      subCategory: "Rice",
      foodType: "NON_VEG",
      spiceLevel: "MILD",
      shortDescription: "Juicy grilled chicken over herbed rice with fresh veggies.",
      description: "Tender grilled chicken breast served over fragrant herbed basmati rice, sautéed peppers and a side of mint yogurt.",
      basePrice: 320,
      salePrice: 289,
      calories: 520,
      protein: 42,
      fat: 14,
      carbohydrate: 48,
      fiber: 6,
      sugar: 4,
      sodium: 720,
      servingSize: "1 bowl (450g)",
      preparationTime: 25,
      featured: true,
      popular: true,
      recommended: true,
      variants: [
        { name: "Regular", price: 320, discountPrice: 289, weight: "450g", servingSize: "1 bowl" },
        { name: "Large", price: 420, discountPrice: 379, weight: "650g", servingSize: "1 large bowl" },
      ],
      addons: [
        {
          name: "Extra Toppings",
          maxSelection: 2,
          items: [
            { name: "Extra Chicken", price: 80 },
            { name: "Extra Rice", price: 40 },
            { name: "Extra Cheese", price: 60 },
          ],
        },
        { name: "Sauce", isRequired: true, maxSelection: 1, items: [{ name: "Mint Yogurt", price: 0 }, { name: "BBQ", price: 20 }] },
      ],
      ingredients: ["Chicken breast", "Basmati rice", "Bell peppers", "Mint yogurt", "Olive oil"],
      allergens: ["Milk", "Gluten"],
      labels: ["Chef's Special"],
      tagSlugs: ["healthy", "high-protein", "spicy"],
      diets: ["High Protein", "Balanced"],
      schedules: [
        { mealType: "LUNCH", startTime: "11:00", endTime: "16:00" },
        { mealType: "DINNER", startTime: "18:00", endTime: "22:00" },
      ],
    },
    {
      name: "Beef Biryani",
      slug: "beef-biryani",
      category: "Main Course",
      subCategory: "Rice",
      foodType: "NON_VEG",
      spiceLevel: "HOT",
      shortDescription: "Fragrant spiced rice layered with tender beef.",
      description: "Slow-cooked beef biryani with basmati rice, fried onions, saffron and fresh coriander, served with raita.",
      basePrice: 280,
      salePrice: 249,
      calories: 680,
      protein: 30,
      fat: 26,
      carbohydrate: 74,
      fiber: 4,
      sugar: 3,
      sodium: 890,
      servingSize: "1 plate (400g)",
      preparationTime: 35,
      popular: true,
      variants: [{ name: "Single", price: 280, discountPrice: 249, weight: "400g" }, { name: "Family", price: 980, discountPrice: 899, weight: "1.4kg" }],
      ingredients: ["Beef", "Basmati rice", "Onion", "Yogurt", "Biryani masala"],
      allergens: ["Milk"],
      tagSlugs: ["spicy"],
      schedules: [{ mealType: "LUNCH", startTime: "11:30", endTime: "16:00" }],
      gallery: 4,
    },
    {
      name: "Veg Thali",
      slug: "veg-thali",
      category: "Main Course",
      subCategory: "Curry",
      foodType: "VEG",
      spiceLevel: "MEDIUM",
      shortDescription: "A balanced platter of seasonal veg curries, dal and rice.",
      description: "Traditional veg thali with two seasonal curries, dal, steamed rice, salad, papad and a sweet dessert.",
      basePrice: 220,
      calories: 610,
      protein: 18,
      fat: 16,
      carbohydrate: 92,
      fiber: 12,
      sugar: 8,
      sodium: 640,
      servingSize: "1 thali",
      preparationTime: 20,
      recommended: true,
      variants: [{ name: "Standard", price: 220, weight: "1 thali" }],
      ingredients: ["Mixed vegetables", "Dal", "Steamed rice", "Salad", "Papad"],
      labels: ["House Special"],
      tagSlugs: ["healthy", "vegan"],
      diets: ["Vegan", "Balanced"],
      schedules: [
        { mealType: "LUNCH", startTime: "12:00", endTime: "15:00" },
        { mealType: "DINNER", startTime: "19:00", endTime: "22:00" },
      ],
    },
    {
      name: "Chicken Shashlik",
      slug: "chicken-shashlik",
      category: "Main Course",
      subCategory: "Curry",
      foodType: "NON_VEG",
      spiceLevel: "HOT",
      shortDescription: "Flame-grilled chicken skewers with tangy dip.",
      description: "Char-grilled chicken skewers marinated in a smoky spice blend, served with garlic dip and buttered naan.",
      basePrice: 350,
      calories: 540,
      protein: 46,
      fat: 20,
      carbohydrate: 32,
      fiber: 3,
      sugar: 5,
      sodium: 810,
      servingSize: "2 skewers",
      preparationTime: 28,
      featured: true,
      variants: [{ name: "Regular", price: 350, weight: "2 skewers" }, { name: "Large", price: 480, discountPrice: 440, weight: "3 skewers" }],
      addons: [{ name: "Naan", maxSelection: 2, items: [{ name: "Butter Naan", price: 40 }, { name: "Garlic Naan", price: 50 }] }],
      ingredients: ["Chicken", "Paprika", "Garlic", "Butter", "Coriander"],
      allergens: ["Gluten", "Milk"],
      tagSlugs: ["high-protein", "spicy"],
      schedules: [{ mealType: "DINNER", startTime: "18:00", endTime: "22:00" }],
    },
    {
      name: "Omelette Breakfast Plate",
      slug: "omelette-breakfast-plate",
      category: "Breakfast",
      subCategory: "Omelette",
      foodType: "NON_VEG",
      spiceLevel: "MILD",
      shortDescription: "Fluffy three-egg omelette with toast and veggies.",
      description: "Three-egg omelette with onions, peppers and herbs, served with whole-wheat toast and seasonal fruit.",
      basePrice: 150,
      calories: 380,
      protein: 24,
      fat: 22,
      carbohydrate: 26,
      fiber: 4,
      sugar: 6,
      sodium: 520,
      servingSize: "1 plate",
      preparationTime: 15,
      variants: [{ name: "Single", price: 150, weight: "1 plate" }],
      addons: [{ name: "Extras", maxSelection: 2, items: [{ name: "Extra Egg", price: 20 }, { name: "Cheese", price: 30 }, { name: "Bacon", price: 60 }] }],
      ingredients: ["Eggs", "Onion", "Bell pepper", "Whole-wheat toast", "Herbs"],
      allergens: ["Egg"],
      tagSlugs: ["high-protein"],
      schedules: [{ mealType: "BREAKFAST", startTime: "07:00", endTime: "11:00" }],
    },
    {
      name: "Masala Dosa",
      slug: "masala-dosa",
      category: "Breakfast",
      subCategory: "Paratha",
      foodType: "VEG",
      spiceLevel: "MEDIUM",
      shortDescription: "Crispy golden dosa with spiced potato filling.",
      description: "Crispy fermented crepe stuffed with spiced potato masala, served with coconut chutney and sambar.",
      basePrice: 160,
      salePrice: 145,
      calories: 420,
      protein: 10,
      fat: 14,
      carbohydrate: 64,
      fiber: 8,
      sugar: 5,
      sodium: 580,
      servingSize: "1 dosa",
      preparationTime: 18,
      recommended: true,
      variants: [{ name: "Plain", price: 160, discountPrice: 145 }, { name: "Butter", price: 180 }],
      ingredients: ["Rice", "Urad dal", "Potato", "Coconut", "Mustard seeds"],
      tagSlugs: ["vegan", "healthy"],
      diets: ["Vegan"],
      schedules: [{ mealType: "BREAKFAST", startTime: "07:30", endTime: "11:30" }],
    },
    {
      name: "Mango Smoothie",
      slug: "mango-smoothie",
      category: "Beverage",
      subCategory: "Smoothies",
      foodType: "VEGAN",
      shortDescription: "Creamy chilled mango smoothie, no added sugar.",
      description: "Blended ripe mangoes with coconut milk and a hint of cardamom. Naturally sweet, no added sugar.",
      basePrice: 180,
      salePrice: 160,
      calories: 210,
      protein: 3,
      fat: 6,
      carbohydrate: 38,
      fiber: 4,
      sugar: 30,
      sodium: 40,
      servingSize: "400ml",
      preparationTime: 8,
      variants: [{ name: "Regular", price: 180, discountPrice: 160, servingSize: "400ml" }, { name: "Large", price: 240, servingSize: "600ml" }],
      ingredients: ["Mango", "Coconut milk", "Cardamom"],
      tagSlugs: ["vegan", "healthy"],
      diets: ["Vegan", "Gluten Free"],
      schedules: [{ mealType: "SNACKS", startTime: "14:00", endTime: "20:00" }],
      availableDays: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
    },
    {
      name: "Brownie Sundae",
      slug: "brownie-sundae",
      category: "Dessert",
      subCategory: "Cakes",
      foodType: "VEG",
      shortDescription: "Warm chocolate brownie with vanilla ice cream.",
      description: "Rich fudgy brownie served warm with vanilla ice cream, chocolate sauce and roasted nuts.",
      basePrice: 190,
      calories: 490,
      protein: 6,
      fat: 24,
      carbohydrate: 62,
      fiber: 3,
      sugar: 44,
      sodium: 210,
      servingSize: "1 bowl",
      preparationTime: 12,
      popular: true,
      variants: [{ name: "Single", price: 190, weight: "1 bowl" }],
      addons: [{ name: "Add-ons", maxSelection: 2, items: [{ name: "Extra Ice Cream", price: 40 }, { name: "Chocolate Sauce", price: 20 }, { name: "Nuts", price: 25 }] }],
      ingredients: ["Chocolate", "Flour", "Eggs", "Butter", "Vanilla ice cream"],
      allergens: ["Gluten", "Milk", "Egg"],
      labels: ["Best Seller"],
      schedules: [{ mealType: "SNACKS", startTime: "15:00", endTime: "22:00" }],
    },
  ];

  const foodBySlug = new Map<string, string>();
  for (const f of foods) {
    const food = await seedFood(vendor.id, adminUserId, categoryMap, subCategoryMap, tagIdBySlug, f);
    foodBySlug.set(f.slug, food.id);
  }

  // ---- Package Category ----
  const pkgCategory = await prisma.packageCategory.upsert({
    where: { slug: "meal-plan" },
    update: {},
    create: { name: "Meal Plan", slug: "meal-plan", description: "Weekly and monthly meal subscriptions", image: img("pkg-cat", 800, 500) },
  });

  // ---- Packages ----
  const packages: PackageSeed[] = [
    {
      name: "7-Day Healthy Meal Plan",
      slug: "7-day-healthy-meal-plan",
      packageCode: "PKG-001",
      packageType: "WEEKLY",
      description: "A week of balanced, chef-cooked meals — 3 meals a day delivered fresh.",
      durationDays: 7,
      price: 3500,
      discountPrice: 2999,
      category: "Meal Plan",
      dailyCalories: 2100,
      dailyProtein: 90,
      dailyCarbs: 210,
      dailyFat: 65,
      benefits: [
        { title: "3 meals a day", description: "Breakfast, lunch and dinner, daily." },
        { title: "Free delivery", description: "Delivered to your door every morning." },
        { title: "Flexible menu", description: "Swap meals anytime before 10 PM." },
      ],
      tags: ["High Protein", "Balanced", "Free Delivery"],
      days: [
        {
          dayNumber: 1,
          title: "Day 1",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "masala-dosa" }, { slug: "mango-smoothie" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "grilled-chicken-bowl", quantity: 2 }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "veg-thali" }] },
          ],
        },
        {
          dayNumber: 2,
          title: "Day 2",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "omelette-breakfast-plate" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "chicken-shashlik" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "veg-thali" }] },
          ],
        },
        {
          dayNumber: 3,
          title: "Day 3",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "masala-dosa" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "beef-biryani" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "grilled-chicken-bowl" }] },
          ],
        },
        {
          dayNumber: 4,
          title: "Day 4",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "omelette-breakfast-plate" }, { slug: "mango-smoothie" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "veg-thali" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "chicken-shashlik" }] },
          ],
        },
        {
          dayNumber: 5,
          title: "Day 5",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "masala-dosa" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "grilled-chicken-bowl" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "brownie-sundae" }] },
          ],
        },
        {
          dayNumber: 6,
          title: "Day 6",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "omelette-breakfast-plate" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "beef-biryani" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "veg-thali" }] },
          ],
        },
        {
          dayNumber: 7,
          title: "Day 7",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "masala-dosa" }, { slug: "mango-smoothie" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "grilled-chicken-bowl" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "brownie-sundae" }] },
          ],
        },
      ],
    },
    {
      name: "3-Day Weight Loss Diet",
      slug: "3-day-weight-loss-diet",
      packageCode: "PKG-002",
      packageType: "WEEKLY",
      description: "Three days of low-calorie, high-protein meals to kick-start your diet.",
      durationDays: 3,
      price: 1299,
      discountPrice: 1099,
      category: "Meal Plan",
      dailyCalories: 1600,
      dailyProtein: 110,
      dailyCarbs: 120,
      dailyFat: 50,
      benefits: [
        { title: "Low calorie", description: "Carefully portioned under 1600 kcal/day." },
        { title: "High protein", description: "110g protein to keep you full." },
      ],
      tags: ["High Protein", "Low Calorie", "Keto Friendly"],
      days: [
        {
          dayNumber: 1,
          title: "Day 1",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "omelette-breakfast-plate" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "grilled-chicken-bowl" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "chicken-shashlik" }] },
          ],
        },
        {
          dayNumber: 2,
          title: "Day 2",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "mango-smoothie" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "grilled-chicken-bowl" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "veg-thali" }] },
          ],
        },
        {
          dayNumber: 3,
          title: "Day 3",
          meals: [
            { mealType: "BREAKFAST", mealTime: "08:00", foods: [{ slug: "omelette-breakfast-plate" }, { slug: "mango-smoothie" }] },
            { mealType: "LUNCH", mealTime: "13:00", foods: [{ slug: "chicken-shashlik" }] },
            { mealType: "DINNER", mealTime: "20:00", foods: [{ slug: "grilled-chicken-bowl" }] },
          ],
        },
      ],
    },
  ];

  for (const p of packages) {
    await seedPackage(vendor.id, adminUserId, pkgCategory.id, foodBySlug, p);
  }

  // ---- Summary ----
  const [usersCount, foodsCount, packagesCount, vendorFoodsCount, packageMealsCount] = await Promise.all([
    prisma.user.count(),
    prisma.food.count(),
    prisma.package.count(),
    prisma.vendorFood.count(),
    prisma.packageMeal.count(),
  ]);

  console.log("==========================================");
  console.log("FONDO seed complete");
  console.log("  Users        :", usersCount, "(all roles, password: Password@123)");
  console.log("  Vendor       :", vendor.businessName, "-", vendor.status);
  console.log("  Foods        :", foodsCount, "(all APPROVED, public)");
  console.log("  VendorFoods  :", vendorFoodsCount);
  console.log("  Packages     :", packagesCount, "(APPROVED)");
  console.log("  PackageMeals :", packageMealsCount);
  console.log("------------------------------------------");
  console.log("  SUPER_ADMIN  : superadmin@fondo.com");
  console.log("  ADMIN        : admin@fondo.com");
  console.log("  VENDOR       : vendor@fondo.com");
  console.log("  RIDER        : rider@fondo.com");
  console.log("  CUSTOMER     : customer@fondo.com");
  console.log("==========================================");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(process.exitCode ?? 0);
  });
