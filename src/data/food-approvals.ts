function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(8803);

const vendorNames = [
  "Spice Route Kitchen", "Golden Wok", "Pasta Paradiso", "Tandoori House",
  "Sweet Tooth Bakery", "Dragon Palace", "Bazaar Express", "Royal Tiffin",
];

const categories = ["Bengali", "Chinese", "Italian", "Indian", "Desserts"];

const foodNames = [
  "Smoked Brisket Platter", "Lamb Shawarma Wrap", "Crispy Calamari",
  "Mushroom Risotto", "Tofu Stir-fry", "Beef Steak", "Grilled Salmon",
  "Falafel Plate", "Chicken Quesadilla", "Avocado Toast", "Pancake Stack",
  "Caesar Wrap", "Tom Yum Soup", "Pad Thai", "Mango Lassi",
  "Lamb Chops", "Veggie Burger", "Fish & Chips", "Croissant Sandwich",
  "Berry Smoothie Bowl", "Sushi Platter", "Bibimbap", "Pho Bo",
  "Caprese Panini", "Chicken Wrap", "Bacon Cheeseburger", "Tiramisu",
];

export interface ApprovalItem {
  id: string;
  foodName: string;
  vendorName: string;
  category: string;
  basePrice: number;
  salePrice: number | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CHANGES_REQUESTED";
  submittedAt: string;
  reviewedAt: string | null;
  notes: string | null;
}

function pad(num: number) {
  return String(num).padStart(3, "0");
}

export const approvalItems: ApprovalItem[] = foodNames.map((name, i) => {
  const statuses: ApprovalItem["status"][] = [
    "PENDING", "PENDING", "PENDING", "PENDING", "APPROVED",
    "REJECTED", "CHANGES_REQUESTED",
  ];
  const status = statuses[Math.floor(rand() * statuses.length)];

  return {
    id: `apprv_${pad(i + 1)}`,
    foodName: name,
    vendorName: vendorNames[Math.floor(rand() * vendorNames.length)],
    category: categories[Math.floor(rand() * categories.length)],
    basePrice: Math.round(150 + rand() * 550),
    salePrice: rand() > 0.5 ? Math.round(120 + rand() * 400) : null,
    status,
    submittedAt: new Date(2026, Math.floor(rand() * 6), Math.floor(1 + rand() * 28))
      .toISOString().split("T")[0],
    reviewedAt: status === "PENDING" ? null
      : new Date(2026, Math.floor(rand() * 6), Math.floor(1 + rand() * 28))
          .toISOString().split("T")[0],
    notes: status === "REJECTED" ? "Portion size too small" :
           status === "CHANGES_REQUESTED" ? "Please update pricing" : null,
  };
});
