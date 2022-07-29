import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useEdamamService from 'src/services/useEdamamService';
import { IRecipe } from 'src/types/IRecipe';

interface FoodState {
  foodLoading: boolean;
  alertMessage: string;
  showLiked: boolean;
  foodsData: IRecipe[] | null;
  favoriteFoodsData: IRecipe[] | null;
}

const initialState:FoodState = {
  foodLoading: false,
  alertMessage: '',
  showLiked: false,
  foodsData: null,
  favoriteFoodsData: null,
};

export const getFoods = createAsyncThunk(
  'food/getFoods',
  async (food:string) => {
    const { getFoodsByValue } = useEdamamService();
    const response = await getFoodsByValue(food);
    return response;
  },
);

const FoodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    changeFoodLike: (state, action) => {
      state.showLiked = action.payload;
    },
    getFavoriteFood: (state, action) => {
      state.favoriteFoodsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.pending, (state) => {
        state.foodLoading = true;
      })
      .addCase(getFoods.rejected, (state) => {
        state.alertMessage = 'server page error please refresh or try again later';
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.foodLoading = false;
        state.foodsData = action.payload;
      });
  },
});

const { actions, reducer } = FoodSlice;

export default reducer;

export const {
  changeFoodLike,
  getFavoriteFood,
} = actions;
