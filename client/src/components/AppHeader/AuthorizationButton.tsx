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
      <>
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
        >
          <LogoutIcon />
        </Button>
      </>
    )
    : (
      <Button
        variant="text"
        className={styles.AppHeader_Button}
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </Button>
    );
  return (
    <Grid item lg={6} md={6} sm={6} xs={12}>
      { content }
      <Link to="/">
        <Button variant="contained" color="success">Home Page</Button>
      </Link>
    </Grid>
  );
};
export default AuthorizationButton;
