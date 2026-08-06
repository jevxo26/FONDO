// /data/mock-coupons.ts
export interface Coupon {
    id: string;
    title: string;
    code: string;
    description: string;
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number;
    maximumDiscount?: number;
    minimumOrder?: number;
    appliesTo: "FOODS" | "PACKAGES" | "CATEGORY" | "SUBSCRIPTION" | "ALL";
    foodIds?: string[];
    packageIds?: string[];
    categoryIds?: string[];
    usageLimit?: number;
    usedCount: number;
    perUserLimit?: number;
    isOneTimeUse: boolean;
    isFirstOrderOnly: boolean;
    startDate: string;
    expiry: string;
    status: "ACTIVE" | "INACTIVE" | "EXPIRED" | "SCHEDULED" | "DRAFT" | "DISABLED";
    priority: number;
    isStackable: boolean;
    autoApply: boolean;
    isFeatured: boolean;
    badge?: "NEW" | "HOT" | "LIMITED";
    color?: string;
    icon?: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export const mockCoupons: Coupon[] = [
    {
        id: "c1",
        title: "First Order Welcome",
        code: "WELCOME20",
        description: "Get 20% off on your first order",
        discountType: "PERCENTAGE",
        discountValue: 20,
        maximumDiscount: 100,
        minimumOrder: 30,
        appliesTo: "ALL",
        usageLimit: 1000,
        usedCount: 245,
        perUserLimit: 1,
        isOneTimeUse: true,
        isFirstOrderOnly: true,
        startDate: "2024-01-01T00:00:00Z",
        expiry: "2024-12-31T23:59:59Z",
        status: "ACTIVE",
        priority: 100,
        isStackable: false,
        autoApply: false,
        isFeatured: true,
        badge: "NEW",
        color: "#10B981",
        icon: "🎉",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
        createdBy: "Admin",
    },
    {
        id: "c2",
        title: "Free Delivery",
        code: "FREEDEL",
        description: "Free delivery on all orders",
        discountType: "FIXED",
        discountValue: 5,
        minimumOrder: 50,
        appliesTo: "ALL",
        usageLimit: 500,
        usedCount: 89,
        perUserLimit: 3,
        isOneTimeUse: false,
        isFirstOrderOnly: false,
        startDate: "2024-06-01T00:00:00Z",
        expiry: "2024-08-31T23:59:59Z",
        status: "ACTIVE",
        priority: 80,
        isStackable: true,
        autoApply: true,
        isFeatured: true,
        badge: "HOT",
        color: "#F59E0B",
        icon: "🚚",
        createdAt: "2024-06-01T10:00:00Z",
        updatedAt: "2024-06-01T10:00:00Z",
        createdBy: "Admin",
    },
    {
        id: "c3",
        title: "Summer Sale",
        code: "SUMMER15",
        description: "15% off on all food items",
        discountType: "PERCENTAGE",
        discountValue: 15,
        maximumDiscount: 200,
        minimumOrder: 40,
        appliesTo: "FOODS",
        foodIds: ["food_1", "food_2", "food_3"],
        usageLimit: 300,
        usedCount: 156,
        perUserLimit: 2,
        isOneTimeUse: false,
        isFirstOrderOnly: false,
        startDate: "2024-07-01T00:00:00Z",
        expiry: "2024-07-31T23:59:59Z",
        status: "ACTIVE",
        priority: 90,
        isStackable: false,
        autoApply: false,
        isFeatured: true,
        badge: "LIMITED",
        color: "#EF4444",
        icon: "☀️",
        createdAt: "2024-07-01T10:00:00Z",
        updatedAt: "2024-07-01T10:00:00Z",
        createdBy: "Admin",
    },
    {
        id: "c4",
        title: "Student Discount",
        code: "STUDENT10",
        description: "10% off for students",
        discountType: "PERCENTAGE",
        discountValue: 10,
        maximumDiscount: 50,
        minimumOrder: 20,
        appliesTo: "ALL",
        usageLimit: 200,
        usedCount: 45,
        perUserLimit: 1,
        isOneTimeUse: false,
        isFirstOrderOnly: false,
        startDate: "2024-08-01T00:00:00Z",
        expiry: "2024-12-31T23:59:59Z",
        status: "SCHEDULED",
        priority: 70,
        isStackable: false,
        autoApply: false,
        isFeatured: false,
        badge: "NEW",
        color: "#8B5CF6",
        icon: "🎓",
        createdAt: "2024-07-15T10:00:00Z",
        updatedAt: "2024-07-15T10:00:00Z",
        createdBy: "Admin",
    },
    {
        id: "c5",
        title: "Festival Offer",
        code: "FEST25",
        description: "25% off on all packages",
        discountType: "PERCENTAGE",
        discountValue: 25,
        maximumDiscount: 150,
        minimumOrder: 60,
        appliesTo: "PACKAGES",
        packageIds: ["pkg_1", "pkg_2"],
        usageLimit: 150,
        usedCount: 67,
        perUserLimit: 1,
        isOneTimeUse: true,
        isFirstOrderOnly: false,
        startDate: "2024-08-01T00:00:00Z",
        expiry: "2024-08-15T23:59:59Z",
        status: "ACTIVE",
        priority: 95,
        isStackable: false,
        autoApply: false,
        isFeatured: true,
        badge: "HOT",
        color: "#EC4899",
        icon: "🎊",
        createdAt: "2024-07-20T10:00:00Z",
        updatedAt: "2024-07-20T10:00:00Z",
        createdBy: "Admin",
    },
];