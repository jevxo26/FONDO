import { FAQ } from "@/types/faq";

export const mockFAQs: FAQ[] = [
  {
    id: "faq_01",
    categoryId: "cat_1",
    question: "How long does delivery take?",
    answer: "Usually we deliver within 30-45 minutes depending on location.",
    sortOrder: 1,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "faq_02",
    categoryId: "cat_1",
    question: "Do you provide vegetarian food?",
    answer: "Yes, we have multiple vegetarian options available.",
    sortOrder: 2,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];