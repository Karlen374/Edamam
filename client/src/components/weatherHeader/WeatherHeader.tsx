import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { useAppDispatch } from 'src/hooks/hooks';
import { getCityWeatherData } from 'src/store/slices/weatherSlice';
import styles from './WeatherHeader.module.scss';

const WeatherHeader = () => {
  const [city, setCity] = useState<string>('');
  const dispatch = useAppDispatch();
  const changeSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const searchWeather = () => {
    dispatch(getCityWeatherData(city));
    setCity('');
  };
  return (
    <div className={styles.Weather_Header}>
      <TextField
        label="Search"
        id="outlined-basic"
        size="small"
        value={city}
        onChange={changeSearchCity}
      />
      <Button
        onClick={searchWeather}
        className={styles.Food_Header__Button}
        variant="contained"
        color="success"
      >
        Search
      </Button>
    </div>
  );
};
export default WeatherHeader;
