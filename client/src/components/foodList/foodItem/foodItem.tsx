import { IRecipe } from 'src/types/IRecipe';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Favorite from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeLike } from 'src/store/slices/authorizationSlice';
import React, { useState } from 'react';
import FoodIngredient from './foodIngredient';
import styles from './foodItem.module.scss';

interface FoodItemProps{
  foodData: IRecipe | null;
}
const FoodItem = ({ foodData }:FoodItemProps) => {
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const dispatch = useAppDispatch();
  const likeIcon = registeredUserData?.likedFoodsData?.map((item:IRecipe) => item.recipeId)
    .includes(foodData?.recipeId || 'null')
    ? <Favorite sx={{ color: red[900] }} /> : <FavoriteBorder sx={{ color: red[900] }} />;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeFoodLike = () => {
    if (registeredUserData && foodData) {
      dispatch(changeLike({ userId: registeredUserData?._id, recipe: foodData }));
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <h3 className={styles.Food__Item_Header}>{foodData?.label}</h3>
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
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={`Number of Calories - ${foodData?.calories}`}
        subheader={`Meal Type - ${foodData?.mealType}`}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Link className={styles.Food__Item_Link} to={`/${foodData?.recipeId}`}>
          <MenuItem onClick={handleClose}>More</MenuItem>
        </Link>
      </Menu>
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
      {registeredUserData
      && (
      <CardActions disableSpacing>
        <IconButton onClick={changeFoodLike} aria-label="add to favorites">
          {likeIcon}
        </IconButton>
      </CardActions>
      )}
    </Card>
  );
};
export default FoodItem;
