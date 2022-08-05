import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useAuthorizationServices from 'src/services/useAuthorizationService';
import { IRecipe } from 'src/types/IRecipe';
import { IUser } from 'src/types/IUser';
import { IUserSignInData } from 'src/types/IUserSignInData';
import { IUserSignUpData } from 'src/types/IUserSignUpData';

interface AuthorizationState {
  signUpModal:boolean;
  signInModal:boolean;
  registeredUserData:IUser | null;
  alertMessage:string
}

const initialState:AuthorizationState = {
  signUpModal: false,
  signInModal: false,
  registeredUserData: null,
  alertMessage: '',
};

export const signIn = createAsyncThunk(
  'authorization/signIn',
  async (data:IUserSignInData) => {
    const { signInUser } = useAuthorizationServices();
    const response = await signInUser(data);
    return response;
  },
);
export const signUp = createAsyncThunk(
  'authorization/signUp',
  async (data:IUserSignUpData) => {
    const { signUpUser } = useAuthorizationServices();
    const response = await signUpUser(data);
    return response;
  },
);
interface foodLikeProps{
  userId:string;
  recipe:IRecipe;
}
export const changeLike = createAsyncThunk(
  'authorization/changeLike',
  async ({ userId, recipe }:foodLikeProps) => {
    const { changeFoodLike } = useAuthorizationServices();
    const response = await changeFoodLike(userId, recipe);
    return response;
  },
);
interface favoriteCityProps{
  userId:string;
  city:string;
}
export const changeFavorite = createAsyncThunk(
  'authorization/changeFavorite',
  async ({ userId, city }:favoriteCityProps) => {
    const { changeFavoriteCities } = useAuthorizationServices();
    const response = await changeFavoriteCities(userId, city);
    return response;
  },
);
const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModal = true;
      state.signInModal = false;
    },
    closeSignUpModal: (state) => {
      state.signUpModal = false;
    },
    openSignInModal: (state) => {
      state.signInModal = true;
      state.signUpModal = false;
    },
    closeSignInModal: (state) => {
      state.signInModal = false;
    },
    signOut: (state) => {
      state.registeredUserData = null;
      localStorage.removeItem('registeredUserData');
    },
    getRegisteredUserData: (state, action) => {
      state.registeredUserData = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.registeredUserData = action.payload;
        localStorage.setItem('registeredUserData', JSON.stringify(action.payload));
      })
      .addCase(signIn.rejected, (state) => {
        state.alertMessage = 'please enter correct data';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.alertMessage = 'registration completed successfully';
      })
      .addCase(signUp.rejected, (state) => {
        state.alertMessage = 'please enter correct data';
      })
      .addCase(changeLike.fulfilled, (state, action) => {
        state.registeredUserData = action.payload;
        localStorage.setItem('registeredUserData', JSON.stringify(action.payload));
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        state.registeredUserData = action.payload;
        localStorage.setItem('registeredUserData', JSON.stringify(action.payload));
      });
  },
});

const { actions, reducer } = AuthorizationSlice;

export default reducer;

export const {
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  signOut,
  getRegisteredUserData,
} = actions;
