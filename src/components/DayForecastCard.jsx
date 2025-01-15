import React from 'react'
import CardLayout from './UI/CardLayout';
import Sun from "../assets/images/sun.svg"
import moment from 'moment';
import { weatherCodesMapping } from './util';

const DayForecastCard = ({data, date}) => {
    // const weatherData ={
    //     day:"Thursday",
    //     date:"Dec 12",
    //     weatherCondition:"Clear Sky",
    //     tempMin:19,
    //     tempMax: 25,
    // };
  return (
    <CardLayout>
        <div className='day-forecast-container'>
            <p className='label-18'>{moment(date).format("dddd")}</p>
            <p className='text-blue'>{moment(date).format("MMM DD")}</p>
            <img src={weatherCodesMapping[data.weatherCode].img} width={48} height={48}/>
            <p className='label-18'>{data.weatherCondition}</p>
            <p className='temp-range'>{Math.floor(data.temperature2mMin)}-{Math.floor(data.temperature2mMax)} &deg;C</p>
        </div>
    </CardLayout>
  )
}

export default DayForecastCard;