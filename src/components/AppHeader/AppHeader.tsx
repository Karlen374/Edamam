import Button from '@mui/material/Button';
import { useState } from 'react';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const [loginModal,setLoginModal] = useState<boolean>(false);
  return (
    <div className={styles.AppHeader}>
      <Button onClick={} variant="outlined" color="success">Sign in</Button>
    </div>
  );
};
export default AppHeader;
