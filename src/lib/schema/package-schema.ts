import * as yup from 'yup';

// Dynamic Meal Item Schema
export const mealSchema = yup.object().shape({
  day: yup.string().required('Day is required'),
  mealType: yup.string().required('Meal type is required'),
  time: yup.string().required('Time is required'),
  foodItem: yup.string().required('Food item name is required'),
  calories: yup
    .number()
    .typeError('Calories must be a number')
    .positive('Calories must be > 0')
    .required('Calories required'),
  protein: yup.number().typeError('Must be a number').min(0).required(),
  fat: yup.number().typeError('Must be a number').min(0).required(),
  carbs: yup.number().typeError('Must be a number').min(0).required(),
});

// Package Form Validation Schema
export const packageSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Package name must be at least 3 characters')
    .required('Package name is required'),
  code: yup.string().required('Package code is required'),
  category: yup.string().required('Category is required'),
  durationDays: yup
    .number()
    .typeError('Duration must be a number')
    .positive('Must be positive')
    .required('Duration is required'),
  totalMeals: yup
    .number()
    .typeError('Total meals must be a number')
    .positive('Must be positive')
    .required('Total meals required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  discountedPrice: yup
    .number()
    .typeError('Discounted price must be a number')
    .min(0, 'Cannot be negative')
    .test(
      'less-than-price',
      'Discounted price cannot exceed standard price',
      function (value) {
        const { price } = this.parent;
        return value === undefined || price === undefined || value <= price;
      }
    )
    .required('Discounted price is required'),
  isCustomizable: yup.boolean().default(true),
  status: yup.string().oneOf(['Active', 'Inactive']).required('Status is required'),
  meals: yup.array().of(mealSchema).min(1, 'At least one meal item is required'),
});