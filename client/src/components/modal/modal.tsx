import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import { useAppDispatch } from 'src/hooks/hooks';
import { closeSignInModal, closeSignUpModal } from 'src/store/slices/authorizationSlice';
import { ModalProps } from './modal.interface';
import styles from './modal.module.scss';

const Modal = ({ active, children }:ModalProps) => {
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeSignUpModal());
    dispatch(closeSignInModal());
  };

  const modalClass = clsx({
    [styles.Modal]: true,
    [styles.active__Modal]: active,
  });
  const modalContentClass = clsx({
    [styles.Modal__content]: true,
    [styles.active__Modal]: active,
  });

  return (
    <CSSTransition
      in={active}
      timeout={1000}
      classNames="alert"
      unmountOnExit
    >
      <div className={modalClass} onClick={close} aria-hidden="true">
        <div className={modalContentClass} onClick={(e) => e.stopPropagation()} aria-hidden="true">
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};
export default Modal;
