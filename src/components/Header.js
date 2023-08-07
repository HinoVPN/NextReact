import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react'
import Link from 'next/link';
import { Button, Col, Container, Nav, Navbar } from 'react-bootstrap';
import { signIn, signOut, useSession } from 'next-auth/react';


export default function Header() {
  const {data: session} = useSession();
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
          <Navbar.Text><Link className="ms-2 text-decoration-none text-secondary"  href="/user">Profile</Link></Navbar.Text>
        </Nav>
        {session?.user ?
          <Button size="sm" onClick={() => signOut()}>{session.user.name} Sign Out</Button>
          :
          <Button size="sm" onClick={() => signIn()}>Sign Up / Sign In</Button>
        }
        
      </Navbar.Collapse>
    </Container>
    </Navbar>

    {/* <LoginModal show={show} handleClose={handleClose} /> */}

  </>
  )
}