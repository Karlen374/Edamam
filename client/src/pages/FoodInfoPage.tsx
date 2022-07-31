import { useEffect } from 'react';
import FoodInfo from 'src/components/foodInfo/foodInfo';
import { useAppDispatch } from 'src/hooks/hooks';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';

const FoodInfoPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);
  return (
    <FoodInfo />
  );
};
export default FoodInfoPage;
