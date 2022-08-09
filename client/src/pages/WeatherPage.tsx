import { useEffect } from 'react';
import WeatherHeader from 'src/components/weatherHeader/WeatherHeader';
import WeatherList from 'src/components/weatherList/weatherList';
import { useAppDispatch } from 'src/hooks/hooks';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { clearCitiesWeatherData, getCityWeatherData } from 'src/store/slices/weatherSlice';

const WeatherPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
    if (registeredUserData) {
      dispatch(clearCitiesWeatherData());
      JSON.parse(registeredUserData).favoriteCities.map((item:string) => {
        return dispatch(getCityWeatherData(item));
      });
      dispatch(getCityWeatherData(JSON.parse(registeredUserData).userCity));
    }
  }, []);
  return (
    <>
      <WeatherHeader />
      <WeatherList />
    </>
  );
};
export default WeatherPage;
