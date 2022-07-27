import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch } from 'src/hooks/hooks';
import { getFoods, getFoodsForAutocomplete } from 'src/store/slices/foodSlice';
import useDebounce from 'src/hooks/useDebounce';
import styles from './foodHeader.module.scss';

const FoodHeader = () => {
  const [value, setValue] = useState<string>('');
  const [liked, setLiked] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const changeRecipeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe(e.target.value);
    useDebounce(dispatch(getFoodsForAutocomplete(e.target.value)),300);
  };
  const searchFoods = () => {
    dispatch(getFoods(recipe));
  };
  const likeIcon = liked ? <Favorite sx={{ color: red[900] }} /> : <FavoriteBorder sx={{ color: red[900] }} />;
  return (
    <div className={styles.Food_Header}>
      <Grid container spacing={4}>
        <Grid item sm={6} lg={6} xs={12}>
          {liked && (
          <TextField
            label="Search"
            id="outlined-basic"
            size="small"
            value={value}
            onChange={handleChange}
          />
          )}
          {!liked && (
          <div className={styles.Food_Header__Search}>
            <TextField
              id="outlined-basic"
              label="Recipe"
              variant="outlined"
              size="small"
              value={recipe}
              onChange={changeRecipeValue}
            />
            {/* <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={brands.map((option) => option.brand)}
              renderInput={(params) => <TextField {...params} value={recipe} onChange={(e) => setRecipe(e.target.value)} label="Recipe" />}
            /> */}
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
          <IconButton onClick={() => setLiked(!liked)} color="primary" aria-label="upload picture" component="label">
            {likeIcon}
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default FoodHeader;
