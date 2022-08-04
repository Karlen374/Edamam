export interface ICondition{
  text:string;
  icon:string
}
export interface IWeatherInfo {
  condition: ICondition;
  temp_c: number;
  temp_f: number
  feelsLike_c: number;
  feelsLike_f: number;
  country: string;
  name: string;
  localTime: string;
  maxTemp_c: string;
  minTemp_c: string;
}
