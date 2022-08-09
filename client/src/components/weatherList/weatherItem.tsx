import { IWeatherInfo } from 'src/types/IWeatherInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { yellow, red } from '@mui/material/colors';
import cryptoRandomString from 'crypto-random-string';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { changeFavorite } from 'src/store/slices/authorizationSlice';

interface WeatherItemProps {
  weatherInfo: IWeatherInfo;
}
const WeatherItem = ({ weatherInfo }: WeatherItemProps) => {
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const dispatch = useAppDispatch();
  const favoriteIcon = registeredUserData?.favoriteCities?.map((item) => item.replace(/[-, ' ']/g, '').toUpperCase())
    .includes(weatherInfo.name.replace(/[-, ' ']/g, '').toUpperCase())
    ? <StarIcon sx={{ color: yellow[700] }} /> : <StarBorderIcon sx={{ color: yellow[700] }} />;
  const userCityFavoriteIcon = registeredUserData?.userCity.replace(/[-, ' ']/g, '').toUpperCase()
    .includes(weatherInfo.name.replace(/[-, ' ']/g, '').toUpperCase());
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
      key={cryptoRandomString({ length: 10 })}
    >
      <CardHeader
        title={weatherInfo.name}
        subheader={weatherInfo.country}
        action={(
          <Tooltip title="More" placement="right-start">
            <Link to={`/WeatherPage/${weatherInfo.name}`}>
              <IconButton size="small" aria-label="settings">
                <CallMadeIcon fontSize="small" />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        avatar={(
          <Avatar
            alt="Weather Photo"
            src={weatherInfo.condition.icon}
            sx={{ width: 60, height: 60 }}
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
        {' '}
        {(registeredUserData && !userCityFavoriteIcon)
        && (
        <IconButton onClick={changeFavoriteStatus} aria-label="add to favorites">
          {favoriteIcon}
        </IconButton>
        )}
        {(registeredUserData && userCityFavoriteIcon)
        && (
        <Tooltip title="This is your city, you cannot add or remove from favorites" placement="left-start">
          <IconButton aria-label="add to favorites">
            <StarIcon sx={{ color: red[700] }} />
          </IconButton>
        </Tooltip>
        )}
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
