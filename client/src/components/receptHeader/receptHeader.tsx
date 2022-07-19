import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import styles from './receptHeader.module.scss';

const ReceptHeader = () => {
  const [food, setFood] = useState<string>('');
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
        <Button variant="outlined" color="success">Search</Button>
      </div>
    </div>
  );
};
export default ReceptHeader;
