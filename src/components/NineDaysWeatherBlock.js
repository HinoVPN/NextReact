import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useRef, useState } from 'react'
import NineDaysWeatherChart from './NineDaysWeatherChart'
import NineDaysTemperature from './NineDaysTemperature'
import axios from 'axios'

export default function NineDaysWeatherBlock() {

    const [data,setData] = useState(null)
    
    useEffect(()=>{
        axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

  return (
    <div className='col'>
        <div className='row'>
            <div className='col'>
                <p className="h2">Nine Days Weather for Hong Kong</p>
            </div>
        </div>
        {data &&
            <NineDaysTemperature data={data}/>
        }
        {data &&
            <NineDaysWeatherChart data={data}/>
        }
        
    </div>
  
  )
}