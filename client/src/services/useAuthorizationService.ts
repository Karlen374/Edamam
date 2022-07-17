import { useHttp } from 'src/hooks/useHttp';

const useAuthorizationServices = () => {
  const _apiBase = 'https://localhost/auth';
  const { request } = useHttp();

  const signInUser = async(email:string, password:string) => {
    const res = await request(`${_apiBase}/signIn`, 'POST', )
    return res;
  };
  // const signUpUser = async()=>{
  //   const res=await request(`${_apiBase}forecast.json?${_apikey}&q=${city}&days=8&aqi=no&alerts=no`)
  //   return _transformWeatherByDays(res);
  // };

  return { signInUser };
};

export default useAuthorizationServices;
