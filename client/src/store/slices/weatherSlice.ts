import { IWeatherInfo } from 'src/types/IWeatherInfo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useWeatherService from 'src/services/useWeatherService';

interface WeatherState {
  weatherLoading: boolean;
  alertMessage: string;
  showLiked: boolean;
  citiesWeatherData: IWeatherInfo[];
}

const initialState:WeatherState = {
  weatherLoading: false,
  alertMessage: '',
  showLiked: false,
  citiesWeatherData: [],
};

export const getCityWeatherData = createAsyncThunk(
  'weather/getCityWeatherData',
  async (city:string) => {
    const { getWeatherByCity } = useWeatherService();
    const response = await getWeatherByCity(city);
    return response;
  },
);
const WeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityWeatherData.pending, (state) => {
        state.weatherLoading = true;
      })
      .addCase(getCityWeatherData.fulfilled, (state, action) => {
        console.log('action.payload=', action.payload);
        state.citiesWeatherData = [...state.citiesWeatherData, action.payload];
      });
  },
});

const { reducer } = WeatherSlice;

export default reducer;

// export const {
// } = actions;
