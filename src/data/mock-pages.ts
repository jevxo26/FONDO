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
// /data/mock-pages.ts - Add more pages
export const mockPages: Page[] = [
    {
        id: "page_1",
        title: "About Us",
        slug: "about",
        content: `
      <h2>Welcome to FONDO</h2>
      <p>FONDO is Bangladesh's leading food delivery platform, connecting thousands of restaurants with hungry customers across the country.</p>
      <h3>Our Mission</h3>
      <p>To make great food accessible to everyone, anytime, anywhere.</p>
      <h3>Our Values</h3>
      <ul>
        <li><strong>Quality:</strong> We partner with the best restaurants</li>
        <li><strong>Reliability:</strong> On-time delivery, every time</li>
        <li><strong>Community:</strong> Supporting local businesses</li>
        <li><strong>Innovation:</strong> Always improving our service</li>
      </ul>
      <h3>Our Team</h3>
      <p>We're a passionate team of food lovers, technologists, and customer service professionals dedicated to revolutionizing food delivery in Bangladesh.</p>
    `,
        metaTitle: "About FONDO | Food Delivery Platform",
        metaDescription: "Learn about FONDO, Bangladesh's premier food delivery platform connecting restaurants with customers.",
        isPublished: true,
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
    },
    {
        id: "page_2",
        title: "Privacy Policy",
        slug: "privacy",
        content: `
      <h2>Privacy Policy</h2>
      <p>Last updated: January 1, 2024</p>
      <h3>Information We Collect</h3>
      <p>We collect information you provide directly, such as your name, email address, phone number, and delivery address.</p>
      <h3>How We Use Your Information</h3>
      <ul>
        <li>To process and deliver your orders</li>
        <li>To communicate with you about your orders</li>
        <li>To improve our services</li>
        <li>To send promotional offers (with your consent)</li>
      </ul>
      <h3>Data Security</h3>
      <p>We implement industry-standard security measures to protect your personal information.</p>
      <h3>Contact Us</h3>
      <p>If you have any questions about our privacy practices, please contact us at privacy@fondo.com.</p>
    `,
        metaTitle: "Privacy Policy | FONDO",
        metaDescription: "Read FONDO's privacy policy to understand how we collect, use, and protect your personal information.",
        isPublished: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
    },
    {
        id: "page_3",
        title: "Terms of Service",
        slug: "terms",
        content: `
      <h2>Terms of Service</h2>
      <p>Last updated: January 1, 2024</p>
      <h3>Acceptance of Terms</h3>
      <p>By using FONDO's services, you agree to these terms.</p>
      <h3>User Accounts</h3>
      <p>You are responsible for maintaining the security of your account.</p>
      <h3>Ordering and Delivery</h3>
      <ul>
        <li>Orders are subject to restaurant availability</li>
        <li>Delivery times are estimates</li>
        <li>You agree to pay for orders you place</li>
      </ul>
      <h3>Refund Policy</h3>
      <p>Refunds are processed for orders that are canceled by the restaurant or not delivered.</p>
      <h3>Limitation of Liability</h3>
      <p>FONDO is not liable for any indirect damages arising from use of our services.</p>
    `,
        metaTitle: "Terms of Service | FONDO",
        metaDescription: "Read FONDO's terms of service for using our food delivery platform.",
        isPublished: true,
        createdAt: "2024-02-01T10:00:00Z",
        updatedAt: "2024-02-01T10:00:00Z",
    },
];