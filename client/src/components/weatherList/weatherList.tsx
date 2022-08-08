import { useAppSelector } from 'src/hooks/hooks';
import WeatherItem from './weatherItem';

const WeatherList = () => {
  const { citiesWeatherData } = useAppSelector((store) => store.weather);
  return (
    <>
      { citiesWeatherData.map((item) => {
        return (
          <WeatherItem key={item.localTime} weatherInfo={item} />
        );
      })}
    </>
  );
};
export default WeatherList;
