'use client'
import Header from '@/components/Header';
import NineDaysWeather from '@/components/NineDaysWeather';
import NineDaysWeatherChart from '@/components/NineDaysWeatherChart';

export default function Home() {
  return (
    <main id="main" className="main">
      <Header/>
      <section className="section dashboard">
        <div className='col'>
          <NineDaysWeather/>
          <NineDaysWeatherChart/>
        </div>

      </section>
    </main>
  )
}
