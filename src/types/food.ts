export interface Food {
  id: string;
  categoryId: string;
  subCategoryId: string;
  foodCode: string;
  name: string;
  slug: string;
  price: number;
  shortDescription: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  preparationTime: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  servingSize: string;
  foodType: string;
  spiceLevel: string;
  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}