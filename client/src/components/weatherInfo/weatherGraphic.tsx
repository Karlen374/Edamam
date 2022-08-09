import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { IHourlyInfo } from 'src/types/IDetailWeatherInfo';

interface IWeatherInfoProps{
  hourlyInfo: IHourlyInfo[];
  weatherDegree: string;
}
const WeatherGraphic = ({ hourlyInfo, weatherDegree }:IWeatherInfoProps) => {
  if (weatherDegree === 'F') {
    hourlyInfo = hourlyInfo.map((item) => {
      return {
        temp: (item.temp * 9) / 5 + 32,
        time: item.time,
      };
    });
  }
  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={hourlyInfo}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#82ca9d" fill="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WeatherGraphic;
