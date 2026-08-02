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
// Add to mock data for more realistic content

// /data/mock-blogs.ts - Add more published blogs with rich content
export const mockBlogs: Blog[] = [
    {
        id: "blog_1",
        title: "10 Healthy Food Habits to Transform Your Life",
        slug: "10-healthy-food-habits",
        thumbnail: "/images/blogs/health-habits.jpg",
        content: `
      <h2>Start Your Journey to Better Health</h2>
      <p>Eating healthy doesn't have to be complicated. Here are 10 simple habits that can transform your life...</p>
      <h3>1. Eat More Whole Foods</h3>
      <p>Whole foods are unprocessed and contain essential nutrients your body needs...</p>
      <ul>
        <li>Fresh fruits and vegetables</li>
        <li>Whole grains like oats and quinoa</li>
        <li>Lean proteins from natural sources</li>
      </ul>
      <h3>2. Stay Hydrated</h3>
      <p>Water is essential for every bodily function. Aim for at least 8 glasses a day...</p>
      <blockquote>
        <p>"Let food be thy medicine and medicine be thy food." - Hippocrates</p>
      </blockquote>
      <p>Start small, stay consistent, and watch your health improve over time.</p>
    `,
        author: "John Doe",
        categoryId: "cat_2",
        status: "PUBLISHED",
        createdAt: "2024-02-15T10:00:00Z",
        updatedAt: "2024-02-15T10:00:00Z",
    },
    {
        id: "blog_2",
        title: "Best Restaurants in Town: A Local's Guide",
        slug: "best-restaurants-in-town",
        thumbnail: "/images/blogs/restaurants.jpg",
        content: `
      <h2>Discover the Hidden Gems of Your City</h2>
      <p>From cozy cafes to fine dining, here's our curated list of the best restaurants...</p>
      <h3>1. The Gourmet Kitchen</h3>
      <p>Known for their farm-to-table approach and seasonal menus...</p>
      <h3>2. The Cozy Corner</h3>
      <p>A hidden gem with the best coffee and pastries in town...</p>
      <blockquote>
        <p>"Good food is the foundation of genuine happiness."</p>
      </blockquote>
      <p>Explore these spots and discover your new favorite restaurant.</p>
    `,
        author: "Jane Smith",
        categoryId: "cat_1",
        status: "PUBLISHED",
        createdAt: "2024-03-01T10:00:00Z",
        updatedAt: "2024-03-01T10:00:00Z",
    },
    {
        id: "blog_3",
        title: "The Ultimate Guide to Meal Prep for Busy People",
        slug: "ultimate-meal-prep-guide",
        thumbnail: "/images/blogs/meal-prep.jpg",
        content: `
      <h2>Save Time and Eat Healthier with Meal Prep</h2>
      <p>Meal prep is the secret weapon of busy people who want to eat well...</p>
      <h3>Why Meal Prep Works</h3>
      <p>Planning and preparing your meals in advance helps you:</p>
      <ul>
        <li>Save time during the week</li>
        <li>Eat healthier meals consistently</li>
        <li>Reduce food waste</li>
        <li>Save money on dining out</li>
      </ul>
      <h3>Getting Started</h3>
      <p>Start with simple meals and gradually expand your repertoire...</p>
      <blockquote>
        <p>"Failing to plan is planning to fail." - Benjamin Franklin</p>
      </blockquote>
      <p>With a little planning, you can transform your eating habits and your life.</p>
    `,
        author: "Sarah Johnson",
        categoryId: "cat_1",
        status: "PUBLISHED",
        createdAt: "2024-03-15T10:00:00Z",
        updatedAt: "2024-03-15T10:00:00Z",
    },
    {
        id: "blog_4",
        title: "Understanding Food Allergies and Intolerances",
        slug: "understanding-food-allergies",
        thumbnail: "/images/blogs/allergies.jpg",
        content: `
      <h2>Know Your Body, Know Your Food</h2>
      <p>Food allergies and intolerances affect millions of people worldwide...</p>
      <h3>Common Food Allergens</h3>
      <ul>
        <li>Dairy</li>
        <li>Eggs</li>
        <li>Peanuts</li>
        <li>Tree nuts</li>
        <li>Soy</li>
        <li>Wheat</li>
        <li>Fish and shellfish</li>
      </ul>
      <h3>Managing Your Diet</h3>
      <p>With the right approach, you can still enjoy delicious food...</p>
      <blockquote>
        <p>"The doctor of the future will no longer treat the human frame with drugs, but rather will cure and prevent disease with nutrition." - Thomas Edison</p>
      </blockquote>
    `,
        author: "Dr. Michael Lee",
        categoryId: "cat_2",
        status: "PUBLISHED",
        createdAt: "2024-04-01T10:00:00Z",
        updatedAt: "2024-04-01T10:00:00Z",
    },
];