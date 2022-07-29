import React, { useState } from 'react';
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
  const [value, setValue] = useState<string>('');
  const { showLiked } = useAppSelector((store) => store.food);
  const [recipe, setRecipe] = useState<string>('');
  const [foodsForAutocomplete, setFoodsForAutocomplete] = useState<string[]>([]);
  const { getFoodAutocomplete } = useEdamamService();
  const dispatch = useAppDispatch();

  const getAutocomplete = async (food:string) => {
    const response = await getFoodAutocomplete(food);
    setFoodsForAutocomplete(response);
  };
  const debouncedAutocomplete = useDebounce(getAutocomplete, 400);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const changeRecipeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe(e.target.value);
    debouncedAutocomplete(e.target.value);
  };

  const searchFoods = () => {
    dispatch(getFoods(recipe));
  };
  const changeLikeButton = () => {
    dispatch(changeFoodLike(!showLiked));
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getFavoriteFood(JSON.parse(registeredUserData).likedFoodsData));
  };
  const likeIcon = showLiked ? <Favorite sx={{ color: red[900] }} /> : <FavoriteBorder sx={{ color: red[900] }} />;
  return (
    <div className={styles.Food_Header}>
      <Grid container spacing={4}>
        <Grid item sm={6} lg={6} xs={12}>
          {showLiked && (
          <TextField
            label="Search"
            id="outlined-basic"
            size="small"
            value={value}
            onChange={handleChange}
          />
          )}
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
                    label="Recipe"
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
      </Grid>
    </div>
  );
};
export default FoodHeader;
