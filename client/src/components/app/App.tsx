import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from 'src/pages/MainPage';
import UserProfilePage from 'src/pages/UserProfilePage';
import FoodInfoPage from 'src/pages/FoodInfoPage';
import WeatherPage from 'src/pages/WeatherPage';
import WeatherInfoPage from 'src/pages/WeatherInfoPage';
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
          <Route path="/:foodId" element={<FoodInfoPage />} />
          <Route path="/WeatherPage" element={<WeatherPage />} />
          <Route path="/WeatherPage/:city" element={<WeatherInfoPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
