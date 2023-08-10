import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Button, Col, Container, Nav, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import useAuth from 'hooks/useAuth';

export default function Header() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { auth, setAuth } = useAuth()
  useEffect(() => {setAuth(cookies)},[auth])

  const logout = () =>{
    console.log(123)
    removeCookie("userId")
    removeCookie("username")
    removeCookie("accessToken")
    removeCookie("role")
    setAuth(null)
    router.push("/login")
  }

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
          <Navbar.Text><Link className="ms-2 text-decoration-none text-secondary"  href="/blog">Blog</Link></Navbar.Text>
        </Nav>
        {auth?.username?
          <Button size="sm" onClick={() => logout()}>{auth.username}</Button>
          :  
          <Button size="sm" onClick={() => router.push("/login")}>Sign Up / Sign In</Button>
        }
          
          
        
      </Navbar.Collapse>
    </Container>
    </Navbar>

    {/* <LoginModal show={show} handleClose={handleClose} /> */}

  </>
  )
}