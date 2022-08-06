import WeatherInfo from 'src/components/weatherInfo/weatherInfo';
import { useEffect } from 'react';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useAppDispatch } from 'src/hooks/hooks';

const WeatherInfoPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);
  return (
    <WeatherInfo />
  );
};
export default WeatherInfoPage;
