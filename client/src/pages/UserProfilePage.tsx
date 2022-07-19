import UserProfile from 'src/components/userProfile/UserProfile';
import { useEffect } from 'react';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useAppDispatch } from 'src/hooks/hooks';

const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);
  return (
    <UserProfile />
  );
};
export default UserProfilePage;
