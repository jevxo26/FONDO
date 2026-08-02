// /data/mock-blogs.ts
export interface Blog {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    content: string;
    author: string;
    categoryId: string;
    status: "DRAFT" | "PUBLISHED";
    createdAt: string;
    updatedAt: string;
}

export const mockBlogs: Blog[] = [
    {
        id: "blog_1",
        title: "10 Healthy Food Habits",
        slug: "10-healthy-food-habits",
        thumbnail: "/images/blogs/health-habits.jpg",
        content: "<p>This is the content of the blog post...</p>",
        author: "John Doe",
        categoryId: "cat_2",
        status: "PUBLISHED",
        createdAt: "2024-02-15T10:00:00Z",
        updatedAt: "2024-02-15T10:00:00Z",
    },
    {
        id: "blog_2",
        title: "Best Restaurants in Town",
        slug: "best-restaurants-in-town",
        thumbnail: "/images/blogs/restaurants.jpg",
        content: "<p>This is the content of the blog post...</p>",
        author: "Jane Smith",
        categoryId: "cat_1",
        status: "DRAFT",
        createdAt: "2024-03-01T10:00:00Z",
        updatedAt: "2024-03-01T10:00:00Z",
    },
];