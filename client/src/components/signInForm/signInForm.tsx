import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { closeSignInModal, openSignUpModal, signIn } from 'src/store/slices/authorizationSlice';
import { useAppDispatch } from 'src/hooks/hooks';
import styles from './signInForm.module.scss';

const SignInForm = () => {
type FormData = {
  email: string;
  password: string;
}
const {
  register,
  formState: { errors },
  handleSubmit,
  reset,
} = useForm<FormData>({ mode: 'onBlur' });
const dispatch = useAppDispatch();
const signInUser = (formState:FormData) => {
  dispatch(signIn(formState));
  dispatch(closeSignInModal());
  reset();
};
return (
  <form onSubmit={handleSubmit(signInUser)}>
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextField
          id="outlined-name"
          label="адрес эл. почты"
          type="email"
          {...register('email', {
            required: 'Это поле обязательное',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Пожалуйста Введите корректный E-mail! ',
            },
          })}
        />
        {errors.email?.message && (
          <div className={styles.SignIn_Form__ErrorMessage}>{errors.email?.message}</div>
        )}
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextField
          id="outlined-password-input"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Это поле обязательное',
            minLength: {
              value: 3,
              message: 'Пароль слишком короткий',
            },
          })}
        />
        {errors.password?.message && (
          <div className={styles.SignIn_Form__ErrorMessage}>{errors.password?.message}</div>
        )}
      </Grid>
      <div className={styles.SignIn_Form__Buttons}>
        <Button type="submit" variant="contained" color="success">
          Войти
        </Button>
        <Button variant="text" color="success" onClick={() => dispatch(openSignUpModal())}>
          Регистрация
        </Button>
      </div>
    </Grid>
  </form>
);
};
export default SignInForm;
