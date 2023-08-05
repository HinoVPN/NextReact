'use client'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Link from 'next/link';
import { Button, Col, Container, Nav, Navbar } from 'react-bootstrap';
import LoginModal from 'modals/LoginModal';


export default function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (<>
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
        <Button size="sm" onClick={handleShow}>Sign Up / Sign In</Button>
      </Navbar.Collapse>
    </Container>
    </Navbar>

    <LoginModal show={show} handleClose={handleClose} />

  </>
  )
}