'use client'
import React, { useEffect } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Suspense } from 'react';
import BlogLoading from "./loading";
import { axiosPrivate } from "api/axios";
import { useSession } from "next-auth/react";

export default function Blog() {
  const { data: session } = useSession();
  useEffect(()=>{
    const getUserBlogs = ()=>{
      const res = axiosPrivate.post('/blogs/userBlog',{userId: session?.user._id})
      console.log(res)
    }

    getUserBlogs()
  },[])

  return (
    
    <main style={{marginLeft: 'unset'}} id="main" className="main">
      <section className="section dashboard">
      <Suspense fallback={<BlogLoading/>}>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {Array.from({ length: 20 }).map((_, idx) => (
          <Col key={idx}>
            <Card style={{ width: '18rem' }} className="mx-auto">
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Suspense>
      </section>
    </main>
    
    )
  }