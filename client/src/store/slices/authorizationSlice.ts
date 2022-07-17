import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'src/types/IUser';

interface AuthorizationState {
  signUpModal:boolean;
  signInModal:boolean;
  registeredUserData:IUser | null;
}

const initialState:AuthorizationState = {
  signUpModal: false,
  signInModal: false,
  registeredUserData: null,
};

export const signIn = createAsyncThunk(
  'char/getData',
  async (state) => {
    const { getAllCharacters } = useMarvelServices();
    const response = await getAllCharacters(state);
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
    clearRegisteredUserData: (state) => {
      state.registeredUserData = null;
    },
    // loadLocalStorage: (state) => {
    //   state.data = JSON.parse(getLocalStorage()?.getItem('data'));
    //   state.visibleData = JSON.parse(getLocalStorage()?.getItem('data'));
    // },
    // changeFilter: (state, action) => {
    //   state.filter = action.payload;
    //   if (action.payload === 10) {
    //     state.visibleData.sort((a, b) => (a.brand.toLowerCase() > b.brand.toLowerCase() ? 1 : -1));
    //   }
    //   if (action.payload === 20) {
    //     state.visibleData.sort((a, b) => (a.price - b.price));
    //   }
    //   if (action.payload === 30) {
    //     state.visibleData.sort((a, b) => (a.releaseYear - b.releaseYear));
    //   }
    // },

    // changeSearchValue: (state, action) => {
    //   state.searchValue = action.payload;

    //   if (action.payload) {
    //     state.visibleData = state.visibleData.filter((item) => {
    //       const searchMarkers = `${item.brand} ${item.model} ${item.releaseYear} ${
    //         item.brand} ${item.releaseYear} ${item.model} ${
    //         item.model} ${item.releaseYear} ${item.brand} ${
    //         item.model} ${item.brand} ${item.releaseYear} ${
    //         item.releaseYear} ${item.brand} ${item.model} ${
    //         item.releaseYear} ${item.model} ${item.brand}`;
    //       return searchMarkers.toUpperCase().indexOf(action.payload.toUpperCase()) > -1;
    //     });
    //   } else {
    //     state.visibleData = state.data.filter((item) => {
    //       const searchMarkers = `${item.brand} ${item.model} ${item.releaseYear} ${
    //         item.brand} ${item.releaseYear} ${item.model} ${
    //         item.model} ${item.releaseYear} ${item.brand} ${
    //         item.model} ${item.brand} ${item.releaseYear} ${
    //         item.releaseYear} ${item.brand} ${item.model} ${
    //         item.releaseYear} ${item.model} ${item.brand}`;
    //       return searchMarkers.toUpperCase().indexOf(action.payload.toUpperCase()) > -1;
    //     });
    //   }
    //   state.filter = '';
    // },

    // addNewCar: (state, action) => {
    //   state.data = [...state.data, action.payload];
    //   state.visibleData = state.data;
    //   state.filter = '';
    //   localStorage.setItem('data', JSON.stringify(state.data));
    // },

    // selectedCarInfo: (state, action) => {
    //   /* eslint-disable*/
    //   state.selectedCar = state.data.filter((item) => item.id === action.payload)[0];
    // },

    // setSelectedCar: (state) => {
    //   state.selectedCar = {
    //     id: '', brand: '', model: '', price: 0, releaseYear: 0, description: '', viewed: false, liked: false,
    //   };
    // },

    // saveEditCar: (state, action) => {
    //   state.data = [...state.data.filter((item) => item.id !== action.payload.id), action.payload];
    //   state.visibleData = state.data;
    //   state.filter = '';
    //   getLocalStorage()?.setItem('data', JSON.stringify(state.data));
    // },

    // changeViewed: (state, action) => {
    //   state.data = state.data.filter((item) => {
    //     if (item.id === action.payload) item.viewed = true;
    //     return item;
    //   });
    //   state.visibleData = state.data;
    //   getLocalStorage()?.setItem('data', JSON.stringify(state.data));
    // },

    // changeLiked: (state, action) => {
    //   state.data = state.data.filter((item) => {
    //     if (item.id === action.payload) item.liked = !item.liked;
    //     return item;
    //   });
    //   state.visibleData = state.visibleData.filter((item) => {
    //     if (item.id === action.payload) item.liked = !item.liked;
    //     return item;
    //   });
    //   getLocalStorage()?.setItem('data', JSON.stringify(state.data));
    // },

    // showLiked: (state) => {
    //   state.visibleData = state.visibleData.filter((item) => item.liked);
    //   state.LikeButton = true;
    // },

    // showAll: (state) => {
    //   state.LikeButton = false;
    //   state.searchValue = '';
    //   state.filter = '';
    //   state.visibleData = state.data.filter((item) => {
    //     const searchMarkers = `${item.brand} ${item.model} ${item.releaseYear} ${
    //       item.brand} ${item.releaseYear} ${item.model} ${
    //       item.model} ${item.releaseYear} ${item.brand} ${
    //       item.model} ${item.brand} ${item.releaseYear} ${
    //       item.releaseYear} ${item.brand} ${item.model} ${
    //       item.releaseYear} ${item.model} ${item.brand}`;
    //     return searchMarkers.toUpperCase().indexOf(state.searchValue.toUpperCase()) > -1;
    //   });
    // },

    // changeVisibleByInterval: (state, action) => {
    //   /* eslint-disable*/
    //   state.visibleData = state.data.filter((item) => {
    //     if (action.payload[0] <= item.price && action.payload[1] >= item.price) {
    //       return item;
    //     }
    //   });
    //   state.filter = '';
    //   state.searchValue = '';
    //   state.LikeButton = false;
    // },

  },
  /* eslint-disable no-param-reassign */
});

const { actions, reducer } = AuthorizationSlice;

export default reducer;

export const {
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
} = actions;
