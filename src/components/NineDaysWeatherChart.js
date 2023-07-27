import 'bootstrap/dist/css/bootstrap.css'
import Chart from 'react-apexcharts'
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function getWeatherValues(list, key){
    if(key == "forecastDate"){
        let resultList = []
        list.forEach(day => {
            let date = day[key]
            let convertedDate = new Date(`${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`).toLocaleDateString('en-CA',{ month: 'short', day: 'numeric' })
            resultList.push(convertedDate) 
        });

        return {
            chart: {
            id: 'Nine Days Weather'
            },
            xaxis: {
            categories: resultList
            }
        }
    }else if(key == 'temp'){
    
        let maxList = []
        let minList = []

        list.forEach(day => {
            let max = day.forecastMaxtemp.value
            let min = day.forecastMintemp.value
            console.log(max,min)
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
    }
    
    return    
}


export default function NineDaysWeatherChart() {

    const data = useRef(null);
    const [weatherForecast, setWeatherForcast] = useState(null)

    const options = useRef(null)

    const series = useRef(null)

    useEffect(()=>{
        axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')
        .then(response => {
            data.current = response.data
            options.current = getWeatherValues(data.current.weatherForecast,"forecastDate")
            series.current = getWeatherValues(data.current.weatherForecast,"temp")
            setWeatherForcast(data.current.weatherForecast)
            console.log(series)

        })
        .catch(error => {
            console.log(error);
        });
    }, [])
  return (
    <div className='row'>
    <div className='col-lg-12'>
    <div className='row'>

        <div className='col-lg-12'>

            <div className='card'>
                <div className='card-header'>Chart</div>
                <div className='card-body'>
                    <Chart 
                        options={options.current} 
                        series={series.current} 
                        type="line" 
                        height={350} 
                    />
                </div>
            </div>

        </div>

    </div>
    </div>
    </div>
  )
}