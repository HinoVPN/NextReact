'use client'
import NineDaysWeatherBlock from '../components/NineDaysWeatherBlock';
import Header from '../components/Header';
import React from 'react';

export default function Home() {
  return (
    <main id="main" className="main">
      <Header/>
      <section className="section dashboard">
        <NineDaysWeatherBlock />
      </section>
    </main>
  )
}
