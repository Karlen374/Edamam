import { $registeredUserData, clearRegisteredUserData } from 'src/models/authorization/authorization';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import { changeLoginFormViewedModal } from 'src/models/modal/modal';
import styles from './appHeader.module.scss';
import { useAppDispatch } from 'src/hooks/hooks';
import { openSignUpModal } from 'src/store/slices/authorizationSlice';

const AuthorizationButton = () => {
  const dispatch = useAppDispatch()
  const content = registeredUserData
    ? (
      <>
        <Chip
          avatar={registeredUserData.avatar
            ? <Avatar alt={registeredUserData.userName} src={`http://localhost:5000/${registeredUserData.avatar}`} />
            : <Avatar>{registeredUserData.userName[0]}</Avatar>}
          sx={{ color: grey[50] }}
          variant="outlined"
          label={registeredUserData.userName}
        />
        <Button
          variant="text"
          className={styles.AppHeader_Button}
          onClick={() => dispatch(clearRegisteredUserData())}
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
      <Link href="/">
        <Button variant="contained" color="success">Home Page</Button>
      </Link>
    </Grid>
  );
};
export default AuthorizationButton;
