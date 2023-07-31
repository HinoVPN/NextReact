'use client'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';


export default function Header() {
  return (
    // <header id="header" className="header fixed-top d-flex align-items-center">
    //     <div className="d-flex align-items-center justify-content-between">
    //       <Link className="d-none d-lg-block text-decoration-none text-dark"  href="/"><span>NiceAdmin</span></Link>
    //     </div>
    //     <div className="d-flex align-items-center justify-content-between">
    //       <Link className="ms-3 d-none d-lg-block text-decoration-none text-dark"  href="/weather"><span>Weather</span></Link>
    //     </div>
    //     <div className=" d-flex align-items-center justify-content-between">
    //       <Link className="ms-3 d-none d-lg-block text-decoration-none text-dark"  href="/todo"><span>ToDoList</span></Link>
    //     </div>
    // </header>

    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top">
    <Container>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Navbar.Text><Link className="ms-2 text-decoration-none text-secondary"  href="/">NiceAdmin</Link></Navbar.Text>
          <Navbar.Text><Link className="ms-2 text-decoration-none text-secondary"  href="/weather">Weather</Link></Navbar.Text>
          <Navbar.Text><Link className="ms-2 text-decoration-none text-secondary"  href="/todo">To-Do List</Link></Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  
  )
}