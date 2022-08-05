import { useHttp } from 'src/hooks/useHttp';

const useWeatherService = () => {
  const { request } = useHttp();
  const _apiBase = 'http://api.weatherapi.com/v1/';
  const _apiKey = '4dcf1b00434041aa907125404220308';

  const _transformWeatherInfo = (res:any) => {
    return {
      condition: {
        text: res.current.condition.text,
        icon: res.current.condition.icon,
      },
      temp_c: res.current.temp_c,
      temp_f: res.current.temp_f,
      feelsLike_c: res.current.feelslike_c,
      feelsLike_f: res.current.feelslike_f,
      country: res.location.country,
      name: res.location.name,
      localTime: res.location.localtime,
      maxTemp_c: res.forecast.forecastday[0].day.maxtemp_c,
      minTemp_c: res.forecast.forecastday[0].day.mintemp_c,
    };
  };
  const _transformAutocomplete = (res:any) => {
    return res.map((item:any) => item.name);
  };
  const getWeatherByCity = async (city:string, days = 1) => {
    const res = await request(`${_apiBase}forecast.json?key=${_apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`);
    return _transformWeatherInfo(res);
  };

  const getCityAutocomplete = async (city:string) => {
    const res = await request(`${_apiBase}search.json?key=${_apiKey}&q=${city}`);
    return _transformAutocomplete(res);
  };

  return { getWeatherByCity, getCityAutocomplete };
};
export default useWeatherService;
