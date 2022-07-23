import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useEdamamService from 'src/services/useEdamamService';
import { IRecipe } from 'src/types/IRecipe';

interface FoodState {
  foodLoading: boolean;
  alertMessage: string;
  foodsData: IRecipe[] | null;
  favoriteFoodsData: IRecipe[] | null;
}

const initialState:FoodState = {
  foodLoading: false,
  alertMessage: '',
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

const { reducer } = FoodSlice;

export default reducer;

// export const {
// } = actions;
