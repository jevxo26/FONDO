// /data/mock-sliders.ts
export interface Slider {
    id: string;
    title: string;
    description?: string;
    image: string;
    buttonText?: string;
    buttonUrl?: string;
    displayOrder: number;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
}

export const mockSliders: Slider[] = [
    {
        id: "1",
        title: "Welcome to FONDO",
        description: "Discover amazing food options",
        image: "/images/sliders/slide-1.jpg",
        buttonText: "Explore Now",
        buttonUrl: "/explore",
        displayOrder: 1,
        status: "ACTIVE",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
    },
    {
        id: "2",
        title: "Weekly Specials",
        description: "Check out our weekly deals",
        image: "/images/sliders/slide-2.jpg",
        buttonText: "View Deals",
        buttonUrl: "/deals",
        displayOrder: 2,
        status: "ACTIVE",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
    },
    {
        id: "3",
        title: "New Vendors",
        description: "Meet our new partners",
        image: "/images/sliders/slide-3.jpg",
        buttonText: "See Vendors",
        buttonUrl: "/vendors",
        displayOrder: 3,
        status: "INACTIVE",
        createdAt: "2024-02-01T10:00:00Z",
        updatedAt: "2024-02-01T10:00:00Z",
    },
];