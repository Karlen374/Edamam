interface IDetailCondition{
  text:string;
  icon:string;
  code:number;
}
interface IForecast{
  sunrise: string;
  sunset:string;
  date:string;
  maxTemp:string;
  minTemp:string;
  condition:IDetailCondition;
}
export interface IDetailWeatherInfo{
  current_date:string;
  current_feelsLike:number;
  current_temp:number;
  country:string;
  name:string;
  current_condition:IDetailCondition;
  forecast: IForecast[]
}
