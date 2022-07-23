import { IRecipe } from 'src/types/IRecipe';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FoodIngredient from './foodIngredient';
// import styles from './foodItem.module.scss';

interface FoodItemProps{
  foodData: IRecipe | null;
}
const FoodItem = ({ foodData }:FoodItemProps) => {
  console.log(foodData);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
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
        {foodData?.ingredientLines.map((item) => <FoodIngredient ingredient={item} />)}
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
