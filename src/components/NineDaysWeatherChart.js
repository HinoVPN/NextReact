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


export default function NineDaysWeatherChart() {

    const data = useRef(null);

    const tempOptions = useRef(null)
    const tempSeries = useRef(null)

    const humidityOptions = useRef(null)
    const humiditySeries = useRef(null)

    useEffect(()=>{
        axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')
        .then(response => {
            data.current = response.data
            tempOptions.current = getWeatherValues(data.current.weatherForecast,"forecastDate")
            tempSeries.current = getWeatherValues(data.current.weatherForecast,"temp")
            humidityOptions.current = getWeatherValues(data.current.weatherForecast,"forecastDateHumidity")
            humiditySeries.current = getWeatherValues(data.current.weatherForecast,"humidity")
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

  return (
    <div className='row'>
    <div className='col-lg-12'>
    <div className='row'>
        <div className='col-lg-6'>
            <div className='card'>
                <div className='card-body'>
                    {
                        tempOptions.current && tempSeries.current &&
                        <Chart 
                            options={tempOptions.current} 
                            series={tempSeries.current} 
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
                        humidityOptions.current && humiditySeries.current &&
                        <Chart 
                            options={humidityOptions.current} 
                            series={humiditySeries.current} 
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