import { IForecast } from 'src/types/IDetailWeatherInfo';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import cryptoRandomString from 'crypto-random-string';
import Chip from '@mui/material/Chip';
import LightModeIcon from '@mui/icons-material/LightMode';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import styles from './weatherInfo.module.scss';

interface WeatherInfoItemProps {
  weatherInfo: IForecast
}

const WeatherInfoItem = ({ weatherInfo }:WeatherInfoItemProps) => {
  return (
    <Card
      sx={{
        display: 'inline-block', width: 200, margin: 1,
      }}
      key={cryptoRandomString({ length: 10 })}
    >
      <CardHeader
        title={weatherInfo.date}
        avatar={(
          <Avatar
            alt="Weather Photo"
            src={weatherInfo.condition.icon}
            sx={{ width: 56, height: 56 }}
          />
        )}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {weatherInfo.condition.text}
        </Typography>
      </Box>
      <Chip
        icon={<LightModeIcon />}
        variant="outlined"
        className={styles.weatherInfo__Header_sunrise}
        label={`Sunrise ${weatherInfo?.sunrise}`}
        size="small"
      />
      <Chip
        icon={<WbTwilightIcon />}
        variant="outlined"
        className={styles.weatherInfo__Header_sunset}
        label={`Sunset ${weatherInfo?.sunset}`}
        size="small"
      />
      <Box sx={{
        display: 'flex', alignItems: 'center', pl: 1, pb: 1, marginTop: 3,
      }}
      >
        <NorthIcon />
        {weatherInfo.maxTemp}
        °
        C
        <SouthIcon />
        {weatherInfo.minTemp}
        °
        C
      </Box>
    </Card>
  );
};
export default WeatherInfoItem;
