import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAppDispatch } from 'src/hooks/hooks';
import { getFoods } from 'src/store/slices/foodSlice';
import styles from './receptHeader.module.scss';

const ReceptHeader = () => {
  const [food, setFood] = useState<string>('');
  const dispatch = useAppDispatch();
  const searchFoods = () => {
    dispatch(getFoods(food));
    console.log('searchFood');
  };

  return (
    <div className={styles.Search}>
      <TextField
        id="outlined-basic"
        label="Food"
        variant="outlined"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />
      <div className={styles.Search_Button}>
        <Button onClick={searchFoods} variant="outlined" color="success">Search</Button>
      </div>
    </div>
  );
};
export default ReceptHeader;
