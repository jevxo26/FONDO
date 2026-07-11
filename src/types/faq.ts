export interface FAQ {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  sortOrder: number;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
