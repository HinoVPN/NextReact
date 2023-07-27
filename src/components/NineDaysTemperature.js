import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AiFillCloud } from "react-icons/ai";


export default function NineDaysTemperature({data}) {
    const [weatherForecast, setWeatherForcast] = useState(data.weatherForecast)
    const [seaTemp, setSeaTemp] = useState(data.seaTemp)
    const [soilTemp, setSoilTemp] = useState(data.soilTemp)
  return (
    <div className='row'>
    <div className='col-lg-12'>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='row'>
                {weatherForecast && 
                    weatherForecast.slice(0,1).map(item => (
                        <div key={item.forecastDate} className="col-lg-12 col-md-6 h-100" >
                            <div className="card">
                            <p className="card-header text-center text-sm h6">
                                {new Date(`${item.forecastDate.slice(0,4)}-${item.forecastDate.slice(4,6)}-${item.forecastDate.slice(6,8)}`).toLocaleDateString('en-CA',{ month: 'short', day: 'numeric' })}
                                <br></br>
                                ({item.week.slice(0,3)})
                            </p>
                            <div className="card-body d-flex align-items-center flex-column">
                                <div className="card-icon d-flex align-items-center justify-content-center">
                                <AiFillCloud />
                                </div>
                                <div className="d-flex align-items-center flex-column">
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <h4> {item.forecastMintemp.value} | {item.forecastMaxtemp.value} °{item.forecastMaxtemp.unit}</h4>
                                    <h5> {item.forecastMinrh.value}-{item.forecastMaxrh.value}%</h5>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))
                }
                {seaTemp && 
                    <div key={seaTemp.value} className="col-lg-12 col-md-6 h-100" >
                        <div className="card">
                        <h6 className="card-header text-center text-sm">
                            {new Date(seaTemp.recordTime).toLocaleDateString('en-CA',{ month: 'long', day: 'numeric'})}
                            <br></br>
                            {new Date(seaTemp.recordTime).toLocaleTimeString('en-CA',{ hour: "numeric"})}
                        </h6>
                        <div className="card-body d-flex align-items-center flex-column">
                            <span>Sea Surface Temperature</span>
                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                <h4> {seaTemp.value} °{seaTemp.unit}</h4>
                            </div>
                            <span className='font-weight-bold'>Soil temperatures</span>
                            {soilTemp &&
                                soilTemp.map(item => (
                                    <div key={item.value} className='d-flex align-items-center justify-content-center flex-column'>
                                        <span>{item.depth.value}m : {item.value} °{item.unit}</span>
                                    </div>
                                ))
                            }
                        </div>
                        </div>
                    </div>
                }
            </div>
          </div>
          <div className='col-lg'>
            <div className='row'>
                {weatherForecast &&
                    weatherForecast.slice(1,9).map((item) => (
                      <div key={item.forecastDate} className="col-lg-3 col-md-3">
                        <div className="card">
                          <h6 className="card-header text-center">
                            {new Date(`${item.forecastDate.slice(0,4)}-${item.forecastDate.slice(4,6)}-${item.forecastDate.slice(6,8)}`).toLocaleDateString('en-CA',{ month: 'short', day: 'numeric' })}
                            <br></br>
                            ({item.week.slice(0,3)})
                          </h6>
                          <div className="card-body d-flex align-items-center flex-column">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <AiFillCloud />
                            </div>
                            <div className="d-flex align-items-center flex-column">
                              <div className='d-flex align-items-center justify-content-center flex-column'>
                                <h4> {item.forecastMintemp.value} | {item.forecastMaxtemp.value} °{item.forecastMaxtemp.unit}</h4>
                                <h5> {item.forecastMinrh.value}-{item.forecastMaxrh.value}%</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                }
            </div>
            
          </div>
        </div>
      </div>
      </div>
  )
}