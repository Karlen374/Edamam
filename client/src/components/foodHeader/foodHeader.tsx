import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeFoodLike, getFavoriteFood, getFoods } from 'src/store/slices/foodSlice';
import useDebounce from 'src/hooks/useDebounce';
import useEdamamService from 'src/services/useEdamamService';
import styles from './foodHeader.module.scss';

const FoodHeader = () => {
  const { showLiked } = useAppSelector((store) => store.food);
  const [recipe, setRecipe] = useState<string>('');
  const [foodsForAutocomplete, setFoodsForAutocomplete] = useState<string[]>([]);
  const { getFoodAutocomplete } = useEdamamService();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFoods('pizza'));
  }, []);
  const getAutocomplete = async (food:string) => {
    const response = await getFoodAutocomplete(food);
    setFoodsForAutocomplete(response);
  };
  const debouncedAutocomplete = useDebounce(getAutocomplete, 400);

  const changeRecipeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe(e.target.value);
    debouncedAutocomplete(e.target.value);
  };

  const searchFoods = () => {
    dispatch(getFoods(recipe));
  };
  const changeLikeButton = () => {
    dispatch(changeFoodLike(!showLiked));
    const userData = localStorage.getItem('registeredUserData');
    if (userData) dispatch(getFavoriteFood(JSON.parse(userData).likedFoodsData));
  };
  const likeIcon = showLiked ? <Favorite sx={{ color: red[900] }} /> : <FavoriteBorder sx={{ color: red[900] }} />;
  return (
    <div className={styles.Food_Header}>
      <Grid container spacing={4}>
        <Grid item sm={6} lg={6} xs={12}>
          {!showLiked && (
          <div className={styles.Food_Header__Search}>
            <Autocomplete
              id="free-solo-demo"
              size="small"
              options={foodsForAutocomplete}
              loading
              renderInput={
                (params) => (
                  <TextField
                    {...params}
                    sx={{ width: 220 }}
                    value={recipe}
                    onChange={changeRecipeValue}
                    label={'For example "pizza"'}
                  />
                )
            }
            />
            <Button
              onClick={searchFoods}
              className={styles.Food_Header__Button}
              variant="contained"
              color="success"
            >
              Search
            </Button>
          </div>
          )}
        </Grid>
        { registeredUserData
        && (
        <Grid item sm={6} lg={6} xs={12}>
          <IconButton
            onClick={changeLikeButton}
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            {likeIcon}
          </IconButton>
        </Grid>
        )}
      </Grid>
    </div>
  );
};
export default FoodHeader;
