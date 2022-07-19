import { useHttp } from 'src/hooks/useHttp';
import { IUserSignInData } from 'src/types/IUserSignInData';
import { IUserSignUpData } from 'src/types/IUserSignUpData';

const useAuthorizationServices = () => {
  const _apiBase = 'http://localhost:5000/auth';
  const { request } = useHttp();

  const signInUser = async (data:IUserSignInData) => {
    const res = await request(`${_apiBase}/signIn`, 'POST', JSON.stringify(data));
    return res;
  };

  const signUpUser = async (data:IUserSignUpData) => {
    const res = await request(`${_apiBase}/signUp`, 'POST', JSON.stringify({ ...data, trainerId: '' }));
    return res;
  };

  return { signInUser, signUpUser };
};

export default useAuthorizationServices;
