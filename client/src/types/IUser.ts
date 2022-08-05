import { IRecipe } from './IRecipe';

export interface IUser {
  userName: string;
  userAge: number;
  userCity: string;
  userGender: string;
  email: string;
  _id: string;
  trainerId: string;
  userRole: string;
  token: string;
  likedFoodsData: IRecipe[];
  favoriteCities: string[];
}
