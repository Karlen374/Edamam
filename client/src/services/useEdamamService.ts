import { IRecipe } from 'src/types/IRecipe';
import { useHttp } from 'src/hooks/useHttp';

const useEdamamService = () => {
  const _apiBase = 'https://api.edamam.com/';
  const _apiId = 'app_id=a62789ea';
  const _apiKey = 'app_key=007b4d8509034db5f42cde8cc8f8d0ee';
  const { request } = useHttp();

  const getFoodsByValue = async (value:string) => {
    const res = await request(`${_apiBase}api/recipes/v2?type=public&q=${value}&${_apiId}&${_apiKey}`);
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
        dietlabels: food.dietLabels,
        healthLabels: food.healthLabels,
        ingredientLines: food.ingredientLines,
        totalWeight: food.totalWeight,
        ingredients: food.ingredients,
        cuisineTypes: food.cuisineType,
        mealType: food.mealType,
      };
      return foodTransformObj;
    });
  };

  return { getFoodsByValue };
};
export default useEdamamService;
