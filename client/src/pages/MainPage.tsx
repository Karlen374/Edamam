import { useEffect } from 'react';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import FoodList from 'src/components/foodList/foodList';
import FoodHeader from 'src/components/foodHeader/foodHeader';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { foodLoading, foodsData } = useAppSelector((store) => store.food);
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);
  const foodListView = foodsData ? <FoodList /> : <h2>Search food</h2>;
  const foodDataView = foodLoading ? <CircularProgress sx={{ marginTop: 10 }} /> : foodListView;
  return (
    <>
      <FoodHeader />
      {foodDataView}
    </>
  );
};
export default MainPage;
