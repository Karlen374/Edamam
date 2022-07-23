import { IIngredient } from './IIngredient';

export interface IRecipe {
  recipeId: string;
  label: string;
  image: string;
  dietLabels: string[];
  healthLabels: string[];
  ingredientLines: string[];
  ingredients: IIngredient[];
  calories: number;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
}
