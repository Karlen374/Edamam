import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/hooks/hooks';
import { closeSignUpModal, openSignInModal, signUp } from 'src/store/slices/authorizationSlice';
import styles from './SignUpForm.module.scss';

type FormData = {
  userName:string;
  userAge:number;
  userGender:string;
  userCity:string;
  email:string;
  password:string;
};

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({ mode: 'onBlur' });
  const dispatch = useAppDispatch();
  const signUpUser = (formState:FormData) => {
    dispatch(signUp(formState));
    dispatch(closeSignUpModal());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(signUpUser)}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="Name"
            type="text"
            {...register('userName', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'use characters a-Z',
              },
            })}
          />
          {errors.userName?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.userName?.message}</div>
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
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Gender"
              defaultValue=""
              {...register('userGender', {
                required: 'This field is required',
              })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors.userGender?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.userGender?.message}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="city"
            type="text"
            {...register('userCity', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'use characters a-Z',
              },
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
                value: 3,
                message: 'Password is too short',
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'use characters a-Z',
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
export default SignUpForm;
