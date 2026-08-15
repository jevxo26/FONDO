// /data/mock-blog-categories.ts
export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
}

export const mockBlogCategories: BlogCategory[] = [
    {
        id: "cat_1",
        name: "Food",
        slug: "food",
        description: "All about food and cuisine",
        status: "ACTIVE",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
    },
    {
        id: "cat_2",
        name: "Health",
        slug: "health",
        description: "Nutrition and wellness tips",
        status: "ACTIVE",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
    },
    {
        id: "cat_3",
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Food lifestyle and culture",
        status: "INACTIVE",
        createdAt: "2024-02-01T10:00:00Z",
        updatedAt: "2024-02-01T10:00:00Z",
    },
];