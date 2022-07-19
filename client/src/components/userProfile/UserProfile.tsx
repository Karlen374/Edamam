// import styles from './UserProfile.module.scss';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector } from 'src/hooks/hooks';

const UserProfile = () => {
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {registeredUserData?.userName.slice(0, 1)}
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={registeredUserData?.userName}
        subheader={registeredUserData?.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Age -
          {registeredUserData?.userAge}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender -
          {registeredUserData?.userGender}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Chip icon={<LocationCityIcon />} label={registeredUserData?.userCity} variant="outlined" />
      </CardActions>
    </Card>
  );
};
export default UserProfile;
