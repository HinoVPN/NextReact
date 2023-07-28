'use client'
import NineDaysWeatherBlock from '../components/NineDaysWeatherBlock';
import Header from '../components/Header';
import React, { useState } from 'react';
import SideBar from '../components/SideBar';

export default function Home() {

  const [toggled, setToggled] = useState(false);

  function changeToggled(bool){
    setToggled(bool)
  }
  return (
    <>
    <Header changeToggled={changeToggled} />
    <SideBar changeToggled={changeToggled} toggled={toggled}/>
    <main id="main" className="main">
      <section className="section dashboard">
        <NineDaysWeatherBlock />
      </section>
    </main>
    </>
  )
}
