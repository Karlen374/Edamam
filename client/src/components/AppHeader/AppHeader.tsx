import { useEffect } from 'react';
import { useAppDispatch } from 'src/hooks/hooks';
import styles from './AppHeader.module.scss';
import AuthorizationButton from './AuthorizationButton';
import AuthorizationModals from './AuthorizationModals';

const AppHeader = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // getRegisteredUserData
  }, []);
  return (
    <div className={styles.AppHeader}>
      <AuthorizationButton />
      <AuthorizationModals />
    </div>
  );
};
export default AppHeader;
