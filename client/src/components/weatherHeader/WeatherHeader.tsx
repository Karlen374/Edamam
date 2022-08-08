import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch } from 'src/hooks/hooks';
import { getCityWeatherData } from 'src/store/slices/weatherSlice';
import useWeatherService from 'src/services/useWeatherService';
import useDebounce from 'src/hooks/useDebounce';
import styles from './WeatherHeader.module.scss';

const WeatherHeader = () => {
  const [city, setCity] = useState<string>('');
  const [citiesForAutocomplete, setCitiesForAutocomplete] = useState<string[]>([]);
  const { getCityAutocomplete } = useWeatherService();
  const dispatch = useAppDispatch();

  const searchWeather = () => {
    dispatch(getCityWeatherData(city));
    setCity('');
  };
  const getAutocomplete = async (value:string) => {
    const response = await getCityAutocomplete(value);
    setCitiesForAutocomplete(response);
  };
  const debouncedAutocomplete = useDebounce(getAutocomplete, 400);

  const changeSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    if (e.target.value) debouncedAutocomplete(e.target.value);
  };

  return (
    <div className={styles.Weather_Header}>
      <Autocomplete
        id="free-solo-demo"
        size="small"
        options={citiesForAutocomplete}
        loading
        renderInput={
                (params) => (
                  <TextField
                    {...params}
                    sx={{ width: 220 }}
                    value={city}
                    onChange={changeSearchCity}
                    label={'For example "London"'}
                  />
                )
            }
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
