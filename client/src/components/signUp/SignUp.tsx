import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/hooks/hooks';
import { openSignInModal } from 'src/store/slices/authorizationSlice';
import styles from './SignUp.module.scss';

type FormData = {
  userName:string;
  userAge:number;
  userGender:string;
  userCity:string;
  email:string;
  password:string;
};

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({ mode: 'onBlur' });
  const dispatch = useAppDispatch();
  const signUpUser = () => {
    console.log('sign Up');
    reset();
  };
  // console.log(errors);
  return (
    <form onSubmit={handleSubmit(signUpUser)}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="Name"
            type="text"
            {...register('userName', {
              required: 'This field is required',
            })}
          />
          {errors.userName?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>error</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="Age"
            type="number"
            {...register('userAge', {
              required: 'This field is required',
              min: {
                value: 18,
                message: 'You must be over 18 to create an account',
              },
              max: {
                value: 100,
                message: 'enter correct age',
              },
            })}
          />
          {errors.userAge?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.userAge?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <select {...register('userGender', {
            required: 'This field is required',
          })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.userGender?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.userGender?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="city"
            type="text"
            {...register('userCity', {
              required: 'This field is required',
            })}
          />
          {errors.userCity?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.userCity?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-name"
            label="E-mail address"
            type="email"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please Enter a valid E-mail! ',
              },
            })}
          />
          {errors.email?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.email?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 5,
                message: 'Password is too short',
              },
            })}
          />
          {errors.password?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.password?.message}</div>
          )}
        </Grid>
        <div className={styles.SignUp_Form__Buttons}>
          <Button variant="contained" type="submit" color="success">
            Создать
          </Button>
          <Button variant="text" onClick={() => dispatch(openSignInModal())} color="success">
            Уже есть Аккаунт ?
          </Button>
        </div>
      </Grid>
    </form>
  );
};
export default SignUp;
