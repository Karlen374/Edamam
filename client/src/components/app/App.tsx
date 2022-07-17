import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <AppHeader />
      <h1>Work</h1>
    </div>
  );
};

export default App;
