import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import { grey } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { openSignUpModal, signOut } from 'src/store/slices/authorizationSlice';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.scss';

const AuthorizationButton = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const content = registeredUserData
    ? (
      <div>
        <Link to="/userProfile">
          <Chip
            className={styles.AppHeader_Chip}
            sx={{ color: grey[50] }}
            icon={<SettingsIcon />}
            variant="outlined"
            label={registeredUserData.userName}
          />
        </Link>
        <Button
          variant="text"
          className={styles.AppHeader_Button}
          onClick={() => dispatch(signOut())}
          sx={{ color: grey[50] }}
        >
          <LogoutIcon />
        </Button>
      </div>
    )
    : (
      <Button
        variant="text"
        className={styles.AppHeader_Button}
        onClick={() => dispatch(openSignUpModal())}
        sx={{ color: grey[50] }}
      >
        Sign Up
      </Button>
    );
  return (
    <Grid item lg={6} md={6} sm={6} xs={12}>
      <div className={styles.AppHeader_NavButtons}>
        <Link to="/">
          <Button variant="contained" color="success">Recipe Page</Button>
        </Link>
        { content }
        <Link to="/WeatherPage">
          <Button variant="contained" color="success">Weather Page</Button>
        </Link>
      </div>
    </Grid>
  );
};
export default AuthorizationButton;
