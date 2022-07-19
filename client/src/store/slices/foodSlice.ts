import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useAuthorizationServices from 'src/services/useAuthorizationService';
import { IUser } from 'src/types/IUser';
import { IUserSignInData } from 'src/types/IUserSignInData';
import { IUserSignUpData } from 'src/types/IUserSignUpData';

interface FoodState {
  loading: boolean;
  alertMessage: string;
  foodsData: 
  favoriteFoods:
}

const initialState:FoodState = {
  loading: false;
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
