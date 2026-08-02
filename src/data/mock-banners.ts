// /data/mock-banners.ts
export interface Banner {
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    redirectType: "product" | "category" | "page" | "url";
    redirectId?: string;
    displayOrder: number;
    startDate?: string;
    endDate?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const mockBanners: Banner[] = [
    {
        id: "1",
        title: "Summer Sale",
        subtitle: "Get up to 50% off on selected items",
        imageUrl: "/images/banners/summer-sale.jpg",
        redirectType: "category",
        redirectId: "cat_1",
        displayOrder: 1,
        startDate: "2024-06-01T00:00:00Z",
        endDate: "2024-08-31T23:59:59Z",
        isActive: true,
        createdAt: "2024-05-15T10:00:00Z",
        updatedAt: "2024-05-15T10:00:00Z",
    },
    {
        id: "2",
        title: "New Arrivals",
        subtitle: "Check out our latest collection",
        imageUrl: "/images/banners/new-arrivals.jpg",
        redirectType: "product",
        redirectId: "prod_1",
        displayOrder: 2,
        startDate: "2024-07-01T00:00:00Z",
        endDate: "2024-09-30T23:59:59Z",
        isActive: true,
        createdAt: "2024-06-20T10:00:00Z",
        updatedAt: "2024-06-20T10:00:00Z",
    },
    {
        id: "3",
        title: "Holiday Special",
        subtitle: "Festive offers for everyone",
        imageUrl: "/images/banners/holiday.jpg",
        redirectType: "page",
        redirectId: "page_1",
        displayOrder: 3,
        startDate: "2024-12-01T00:00:00Z",
        endDate: "2024-12-31T23:59:59Z",
        isActive: false,
        createdAt: "2024-11-01T10:00:00Z",
        updatedAt: "2024-11-01T10:00:00Z",
    },
];