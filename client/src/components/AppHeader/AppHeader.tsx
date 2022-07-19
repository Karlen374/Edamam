import styles from './AppHeader.module.scss';
import AuthorizationButton from './AuthorizationButton';
import AuthorizationModals from './AuthorizationModals';

const AppHeader = () => {
  return (
    <div className={styles.AppHeader}>
      <AuthorizationButton />
      <AuthorizationModals />
    </div>
  );
};
export default AppHeader;
