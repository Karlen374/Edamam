import { useEffect } from 'react';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useAppDispatch } from 'src/hooks/hooks';
import ReceptHeader from 'src/components/receptHeader/receptHeader';

const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);
  return (
    <>
      <ReceptHeader />
      <h2>Work</h2>
    </>
  );
};
export default MainPage;
