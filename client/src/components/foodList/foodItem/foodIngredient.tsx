import Typography from '@mui/material/Typography';

interface FoodIngredientProps{
  ingredient: string;
}
const FoodIngredient = ({ ingredient }:FoodIngredientProps) => {
  return (
    <Typography key={ingredient} variant="body2" color="text.secondary">
      {ingredient}
    </Typography>
  );
};
export default FoodIngredient;
