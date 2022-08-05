import { IWeatherInfo } from 'src/types/IWeatherInfo';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { yellow } from '@mui/material/colors';
import { changeFavorite } from 'src/store/slices/authorizationSlice';
// import styles from './weatherList.module.scss';

interface WeatherItemProps {
  weatherInfo: IWeatherInfo;
}
const WeatherItem = ({ weatherInfo }: WeatherItemProps) => {
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const dispatch = useAppDispatch();
  const favoriteIcon = registeredUserData?.favoriteCities?.map((item) => item.replace(/[-, ' ']/g, '').toUpperCase())
    .includes(weatherInfo.name.replace(/[-, ' ']/g, '').toUpperCase())
    ? <StarIcon sx={{ color: yellow[700] }} /> : <StarBorderIcon sx={{ color: yellow[700] }} />;

  const changeFavoriteStatus = () => {
    if (registeredUserData && weatherInfo) {
      dispatch(changeFavorite({ userId: registeredUserData?._id, city: weatherInfo.name }));
    }
  };
  return (
    <Card
      sx={{
        display: 'inline-block', width: 200, margin: 1,
      }}
      key={weatherInfo.localTime + weatherInfo.name}
    >
      <CardHeader
        title={weatherInfo.name}
        subheader={weatherInfo.country}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        avatar={(
          <Avatar
            alt="Weather Photo"
            src={weatherInfo.condition.icon}
            sx={{ width: 56, height: 56 }}
          />
        )}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="div" variant="h4">
          {weatherInfo.temp_c}
          °
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {weatherInfo.condition.text}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex', alignItems: 'center', pl: 1, pb: 1, marginTop: 3,
      }}
      >
        <IconButton onClick={changeFavoriteStatus} aria-label="add to favorites">
          {favoriteIcon}
        </IconButton>
        <NorthIcon />
        {weatherInfo.maxTemp_c}
        °
        <SouthIcon />
        {weatherInfo.minTemp_c}
        °
      </Box>
    </Card>
  );
};
export default WeatherItem;
