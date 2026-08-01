export interface SelectedFood {
  foodId: string;
  quantity: number;
  isExtra: boolean;
}

export interface SelectedMeal {
  mealType: string;
  mealTime: string;
  foods: SelectedFood[];
}

export interface SelectedDay {
  dayNumber: number;
  meals: SelectedMeal[];
}