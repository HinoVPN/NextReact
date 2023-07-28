import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

export default function Header({changeToggled}) {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
        <AiOutlineMenu className="toggle-sidebar-btn" onClick={event => changeToggled(true)}/>
      </div>
    </header>
  
  )
}