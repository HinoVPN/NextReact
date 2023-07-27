import 'bootstrap/dist/css/bootstrap.css'
import Chart from 'react-apexcharts'
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function getWeatherValues(list, key){
    let resultList = []
    let maxList = []
    let minList = []
    if(key == 'forecastDate'){
        list.forEach(day => {
            let date = day.forecastDate
            let convertedDate = new Date(`${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`).toLocaleDateString('en-CA',{ month: 'short', day: 'numeric' })
            resultList.push(convertedDate) 
        });

        return {
            title:{
                text: 'Nine Days Temperature',
            },
            chart: {
                id: 'Nine Days Weather'
            },
            xaxis: {
                categories: resultList
            },
            // colors: ['#546E7A', '#E91E63']
        }
    }else if(key == "forecastDateHumidity"){
        list.forEach(day => {
            let date = day.forecastDate
            let convertedDate = new Date(`${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`).toLocaleDateString('en-CA',{ month: 'short', day: 'numeric' })
            resultList.push(convertedDate) 
        });

        return {
            title:{
                text: 'Nine Days Humidity',
            },
            chart: {
                id: 'Nine Days Weather'
            },
            xaxis: {
                categories: resultList
            },
            // colors: ['#546E7A', '#E91E63']
        }
    }else if(key == 'temp'){
        list.forEach(day => {
            let max = day.forecastMaxtemp.value
            let min = day.forecastMintemp.value
            maxList.push(parseFloat(max)) 
            minList.push(parseFloat(min))
        });

        return [
            {
                name: 'MaxTemp',
                data: maxList
            },
            {
                name: 'MinTemp',
                data: minList
            }
        ]
    }else if(key == 'humidity'){
        list.forEach(day => {
            let max = day.forecastMaxrh.value
            let min = day.forecastMinrh.value
            maxList.push(parseFloat(max)) 
            minList.push(parseFloat(min))
        });

        return [
            {
                name: 'Max Humidity',
                data: maxList
            },
            {
                name: 'Min Humidity',
                data: minList
            }
        ]
    }
    
    return    
}


export default function NineDaysWeatherChart({data}) {


    const [tempOptions,setTempOptions]= useState(getWeatherValues(data.weatherForecast,"forecastDate"))
    const [humidityOptions,setHumidityOptions] = useState(getWeatherValues(data.weatherForecast,"forecastDateHumidity"))
    const [tempSeries,setTempSeries] = useState(getWeatherValues(data.weatherForecast,"temp"))
    const [humiditySeries,setHumiditySeries] = useState(getWeatherValues(data.weatherForecast,"humidity"))
  return (
    <div className='row'>
    <div className='col-lg-12'>
    <div className='row'>
        <div className='col-lg-6'>
            <div className='card'>
                <div className='card-body'>
                    {
                        tempOptions && tempSeries &&
                        <Chart 
                            options={tempOptions} 
                            series={tempSeries} 
                            type="line" 
                            height={350} 
                        />
                    }
                </div>
            </div>
        </div>

        <div className='col-lg-6'>
            <div className='card'>
                <div className='card-body'>
                    {
                        humidityOptions && humiditySeries &&
                        <Chart 
                            options={humidityOptions} 
                            series={humiditySeries} 
                            type="line" 
                            height={350} 
                        />
                    }
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}