import { IRecipe } from 'src/types/IRecipe';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FoodIngredient from './foodIngredient';

interface FoodItemProps{
  foodData: IRecipe | null;
}
const FoodItem = ({ foodData }:FoodItemProps) => {
  console.log(foodData);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={(
          <Tooltip title={`cuisine type - ${foodData?.cuisineType[0]}`} placement="left-start">
            <Avatar
              alt={foodData?.cuisineType[0]}
              src={`http://localhost:5000/${foodData?.cuisineType[0]}.png`}
              sx={{ width: 56, height: 56 }}
            />
          </Tooltip>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={`Number of Calories - ${foodData?.calories}`}
        subheader={`Meal Type - ${foodData?.mealType}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={foodData?.image}
        alt={foodData?.label}
      />
      <CardContent>
        <h3>Ingredients:</h3>
        {foodData?.ingredientLines.map((item) => <FoodIngredient key={item} ingredient={item} />)}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default FoodItem;
