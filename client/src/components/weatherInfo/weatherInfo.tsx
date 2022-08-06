import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWeatherService from 'src/services/useWeatherService';
import { IDetailWeatherInfo } from 'src/types/IDetailWeatherInfo';
import Avatar from '@mui/material/Avatar';
import styles from './weatherInfo.module.scss';

const WeatherInfo = () => {
  const { city } = useParams();
  const [weatherInfo, setWeatherInfo] = useState<IDetailWeatherInfo | null>(null);
  const { getCurrentCityWeather } = useWeatherService();
  const getWeather = async () => {
    if (city) {
      const data:IDetailWeatherInfo = await getCurrentCityWeather(city);
      setWeatherInfo(data);
    }
  };
  useEffect(() => {
    getWeather();
  }, []);
  console.log(weatherInfo);
  return (
    <div className={styles.weatherInfo}>
      <div className={styles.weatherInfo__Header}>
        <div>
          <h1>{weatherInfo?.name}</h1>
          <h3>{weatherInfo?.country}</h3>
        </div>
        <Avatar
          alt={weatherInfo?.current_condition.text}
          src={weatherInfo?.current_condition.icon}
          sx={{ width: 76, height: 76, margin: 'auto 0' }}
        />
      </div>

    </div>
  );
};
export default WeatherInfo;
