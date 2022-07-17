import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { openSignUpModal } from 'src/store/slices/authorizationSlice';
import Modal from 'src/components/modal/modal';
import SignUp from 'src/components/signUp/SignUp';
import SignIn from 'src/components/signIn/signIn';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const { signUpModal, signInModal } = useAppSelector((store) => store.authorization);
  return (
    <div className={styles.AppHeader}>
      <Button onClick={() => dispatch(openSignUpModal())} variant="outlined" color="success">Sign up</Button>
      <Modal active={signUpModal}>
        <SignUp />
      </Modal>
      <Modal active={signInModal}>
        <SignIn />
      </Modal>
    </div>
  );
};
export default AppHeader;
