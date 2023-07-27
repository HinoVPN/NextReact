'use client'
import Header from '@/components/Header';
import NineDaysWeather from '@/components/NineDaysWeather';

export default function Home() {
  return (
    <main id="main" className="main">
      <Header/>
      <section className="section dashboard">
        <NineDaysWeather/>
      </section>
    </main>
  )
}
