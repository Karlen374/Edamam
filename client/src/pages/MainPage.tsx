import { useEffect } from 'react';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import FoodList from 'src/components/foodList/foodList';
import FoodHeader from 'src/components/foodHeader/foodHeader';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const {
    foodLoading,
    favoriteFoodsData,
    foodsData,
    showLiked,
  } = useAppSelector((store) => store.food);

  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);

  const foodListView = foodsData ? <FoodList foodsData={foodsData} /> : <h2>Search food</h2>;
  const favoriteFoodListView = favoriteFoodsData?.length
    ? <FoodList foodsData={favoriteFoodsData} /> : <h2>You don&apos;t have a favorite food yet</h2>;
  const foodData = showLiked ? favoriteFoodListView : foodListView;
  const foodDataView = foodLoading ? <CircularProgress sx={{ marginTop: 10 }} /> : foodData;

  return (
    <>
      <FoodHeader />
      {foodDataView}
    </>
  );
};
export default MainPage;
