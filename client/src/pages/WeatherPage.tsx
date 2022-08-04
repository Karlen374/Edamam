import { useEffect } from 'react';
import WeatherHeader from 'src/components/weatherHeader/WeatherHeader';
import WeatherList from 'src/components/weatherList/weatherList';
import { useAppDispatch } from 'src/hooks/hooks';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';

const WeatherPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);
  return (
    <>
      <WeatherHeader />
      <WeatherList />
    </>
  );
};
export default WeatherPage;
