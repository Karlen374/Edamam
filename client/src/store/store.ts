import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import food from 'src/store/slices/foodSlice';
import authorization from 'src/store/slices/authorizationSlice';
import weather from 'src/store/slices/weatherSlice';

export const store = configureStore({
  reducer: {
    authorization,
    food,
    weather,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
