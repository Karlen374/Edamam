import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from 'src/pages/MainPage';
import UserProfilePage from 'src/pages/UserProfilePage';
import AppHeader from '../AppHeader/AppHeader';
import styles from './App.module.scss';

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
