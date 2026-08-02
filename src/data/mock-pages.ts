// /data/mock-pages.ts
export interface Page {
    id: string;
    title: string;
    slug: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export const mockPages: Page[] = [
    {
        id: "page_1",
        title: "About Us",
        slug: "about-us",
        content: "<p>This is the about us page content...</p>",
        metaTitle: "About FONDO",
        metaDescription: "Learn more about FONDO",
        isPublished: true,
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
    },
    {
        id: "page_2",
        title: "Contact Us",
        slug: "contact-us",
        content: "<p>This is the contact us page content...</p>",
        metaTitle: "Contact FONDO",
        metaDescription: "Get in touch with FONDO",
        isPublished: false,
        createdAt: "2024-02-01T10:00:00Z",
        updatedAt: "2024-02-01T10:00:00Z",
    },
];