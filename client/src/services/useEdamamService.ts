import { IRecipe } from 'src/types/IRecipe';
import { useHttp } from 'src/hooks/useHttp';

const useEdamamService = () => {
  const _apiBase = 'https://api.edamam.com/';
  const _apiIdRecipe = 'app_id=a62789ea';
  const _apiKeyRecipe = 'app_key=007b4d8509034db5f42cde8cc8f8d0ee';
  const _apiIdFood = 'app_id=1eeb79c0';
  const _apiKeyFood = 'app_key=0967caab91e1215b810f9fa39597f9f6';
  const { request } = useHttp();

  const getFoodAutocomplete = async (value:string) => {
    const res = await request(`${_apiBase}auto-complete?${_apiIdFood}&${_apiKeyFood}&q=${value}`);
    return res;
  };
  const getFoodsByValue = async (value:string) => {
    const res = await request(`${_apiBase}api/recipes/v2?type=public&q=${value}&${_apiIdRecipe}&${_apiKeyRecipe}`);
    return res.hits.map((item:any) => {
      const food:IRecipe = item.recipe;
      const recipeId = item.recipe.uri.split('').reverse().join('').slice(0, 32)
        .split('')
        .reverse()
        .join('');
      const foodTransformObj = {
        recipeId,
        calories: Math.floor(food.calories),
        label: food.label,
        image: food.image,
        dietLabels: food.dietLabels,
        healthLabels: food.healthLabels,
        ingredientLines: food.ingredientLines,
        totalWeight: food.totalWeight,
        ingredients: food.ingredients,
        cuisineType: food.cuisineType,
        mealType: food.mealType,
      };
      return foodTransformObj;
    });
  };
  const getFoodById = async (id:string) => {
    const res = await request(`${_apiBase}api/recipes/v2/${id}?type=public&${_apiIdRecipe}&${_apiKeyRecipe}`);
    const food:IRecipe = res.recipe;
    const recipeId = res.recipe.uri.split('').reverse().join('').slice(0, 32)
      .split('')
      .reverse()
      .join('');
    const foodTransformObj = {
      recipeId,
      calories: Math.floor(food.calories),
      label: food.label,
      image: food.image,
      dietLabels: food.dietLabels,
      healthLabels: food.healthLabels,
      ingredientLines: food.ingredientLines,
      totalWeight: food.totalWeight,
      ingredients: food.ingredients,
      cuisineType: food.cuisineType,
      mealType: food.mealType,
    };
    return foodTransformObj;
  };

  return { getFoodsByValue, getFoodAutocomplete, getFoodById };
};
export default useEdamamService;
