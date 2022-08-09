import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWeatherService from 'src/services/useWeatherService';
import { IDetailWeatherInfo } from 'src/types/IDetailWeatherInfo';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import LightModeIcon from '@mui/icons-material/LightMode';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import AirIcon from '@mui/icons-material/Air';
import styles from './weatherInfo.module.scss';
import WeatherInfoItem from './weatherInfoItem';
import WeatherGraphic from './weatherGraphic';

const WeatherInfo = () => {
  const { city } = useParams();
  const [weatherInfo, setWeatherInfo] = useState<IDetailWeatherInfo | null>(null);
  const [weatherDegree, setWeatherDegree] = useState<string>('C');
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
  return (
    <>
      <div className={styles.weatherInfo}>
        <div className={styles.weatherInfo__Header}>
          <div>
            <h1 className={styles.weatherInfo__Header_city}>{weatherInfo?.name}</h1>
            <h3 className={styles.weatherInfo__Header_country}>{weatherInfo?.country}</h3>
            <p className={styles.weatherInfo__Header_date}>{weatherInfo?.current_date.slice(0, 10)}</p>
          </div>
        </div>
        <div className={styles.weatherInfo__SubHeader}>
          <div>
            <p className={styles.weatherInfo__Header_tmp}>
              {weatherDegree === 'C' ? `${weatherInfo?.current_temp}` : `${weatherInfo?.current_temp_f}`}
              °
              <button
                style={{ color: `${weatherDegree === 'C' ? 'black' : 'grey'}` }}
                type="button"
                className={styles.weatherInfo__Header_degree}
                onClick={() => setWeatherDegree('C')}
              >
                C
              </button>
              |
              <button
                style={{ color: `${weatherDegree === 'F' ? 'black' : 'grey'}` }}
                type="button"
                className={styles.weatherInfo__Header_degree}
                onClick={() => setWeatherDegree('F')}
              >
                F
              </button>
            </p>
            <p className={styles.weatherInfo__Header_feelsTmp}>
              Feels Like
              <br />
              {weatherDegree === 'C' ? `${weatherInfo?.current_feelsLike}` : `${weatherInfo?.current_feelsLike_f}`}
              °
              {weatherDegree}
            </p>
          </div>
          <Avatar
            alt={weatherInfo?.current_condition.text}
            src={weatherInfo?.current_condition.icon}
            sx={{ width: 76, height: 76, margin: 'auto 0' }}
          />
        </div>
        <p className={styles.weatherInfo__Condition_text}>{weatherInfo?.current_condition.text}</p>
        <p className={styles.weatherInfo__Condition_maxTemp}>
          MaxTemp:
          {weatherDegree === 'C' ? `${weatherInfo?.forecast[0].maxTemp}` : `${weatherInfo?.forecast[0].maxTemp_f}`}
          °
          {weatherDegree}
        </p>
        <p className={styles.weatherInfo__Condition_minTemp}>
          MinTemp:
          {weatherDegree === 'C' ? `${weatherInfo?.forecast[0].minTemp}` : `${weatherInfo?.forecast[0].minTemp_f}`}
          °
          {weatherDegree}
        </p>
        {weatherInfo && <WeatherGraphic hourlyInfo={weatherInfo?.hourlyInfo} weatherDegree={weatherDegree} />}
        <Chip
          icon={<LightModeIcon />}
          variant="outlined"
          className={styles.weatherInfo__Header_sunrise}
          label={`Sunrise ${weatherInfo?.forecast[0].sunrise}`}
        />
        <Chip
          icon={<WbTwilightIcon />}
          variant="outlined"
          className={styles.weatherInfo__Header_sunset}
          label={`Sunset ${weatherInfo?.forecast[0].sunset}`}
        />
        <Chip
          icon={<AirIcon />}
          variant="outlined"
          className={styles.weatherInfo__Header_wind}
          label={`Wind ${weatherInfo?.current_wind} kph`}
        />
      </div>
      {weatherInfo && <WeatherInfoItem weatherInfo={weatherInfo?.forecast[1]} />}
      {weatherInfo && <WeatherInfoItem weatherInfo={weatherInfo?.forecast[2]} />}
    </>
  );
};
export default WeatherInfo;
