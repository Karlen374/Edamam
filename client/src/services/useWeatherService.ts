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
  const _transformDetailWeatherInfo = (res:any) => {
    return {
      country: res.location.country,
      name: res.location.name,
      current_date: res.location.localtime,
      current_temp: res.current.temp_c,
      current_temp_f: res.current.temp_f,
      current_feelsLike: res.current.feelslike_c,
      current_feelsLike_f: res.current.feelslike_f,
      current_condition: {
        text: res.current.condition.text,
        icon: res.current.condition.icon,
        code: res.current.condition.code,
      },
      current_wind: res.current.wind_kph,
      hourlyInfo: res.forecast.forecastday[0].hour.map((item: any) => {
        return {
          time: item.time.slice(10),
          temp: item.temp_c,
        };
      }),
      forecast: res.forecast.forecastday.map((item: any) => {
        return {
          sunrise: item.astro.sunrise,
          sunset: item.astro.sunset,
          date: item.date,
          maxTemp: item.day.maxtemp_c,
          maxTemp_f: item.day.maxtemp_f,
          minTemp_f: item.day.mintemp_f,
          minTemp: item.day.mintemp_c,
          condition: {
            text: item.day.condition.text,
            icon: item.day.condition.icon,
            code: item.day.condition.code,
          },
        };
      }),
    };
  };
  const _transformAutocomplete = (res:any) => {
    return res.map((item:any) => item.name);
  };
  const getWeatherByCity = async (city:string, days = 1) => {
    const res = await request(`${_apiBase}forecast.json?key=${_apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`);
    return _transformWeatherInfo(res);
  };
  const getCurrentCityWeather = async (city:string, days = 3) => {
    const res = await request(`${_apiBase}forecast.json?key=${_apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`);
    return _transformDetailWeatherInfo(res);
  };
  const getCityAutocomplete = async (city:string) => {
    const res = await request(`${_apiBase}search.json?key=${_apiKey}&q=${city}`);
    return _transformAutocomplete(res);
  };

  return { getWeatherByCity, getCityAutocomplete, getCurrentCityWeather };
};
export default useWeatherService;
