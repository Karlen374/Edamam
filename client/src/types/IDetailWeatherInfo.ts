interface IDetailCondition{
  text:string;
  icon:string;
  code:number;
}
export interface IHourlyInfo{
  time: string;
  temp: number;
}
export interface IForecast{
  sunrise: string;
  sunset:string;
  date:string;
  maxTemp:string;
  maxTemp_f:string;
  minTemp_f:string;
  minTemp:string;
  condition:IDetailCondition;
}
export interface IDetailWeatherInfo{
  current_date:string;
  current_feelsLike:number;
  current_feelsLike_f:number;
  current_temp:number;
  current_temp_f:number;
  current_wind:number;
  country:string;
  name:string;
  current_condition:IDetailCondition;
  forecast: IForecast[],
  hourlyInfo: IHourlyInfo[],
}
