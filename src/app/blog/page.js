'use client'
import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Suspense } from 'react';
import BlogLoading from "./loading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { format } from 'date-fns'
import Link from "next/link";

export default function Blog() {
  const axiosPrivate = useAxiosPrivate()
  const [blogs,setBlogs] = useState([])

  useEffect(()=>{
    async function getUserBlogs(){
      const res = await axiosPrivate.get('/blogs')
      console.log(res.data)
      setBlogs(res.data)
    }

    getUserBlogs()
  },[])

  return (
    
    <main style={{marginLeft: 'unset'}} id="main" className="main">
      <section className="section dashboard">
      <Suspense fallback={<BlogLoading/>}>
      <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
        {blogs && blogs.map((blog, idx) => (
          <Col key={idx}>
            <Card style={{ width: '18rem' }} className="mx-auto">
              {/* <Card.Header>Created By: {blog.user.username}</Card.Header> */}
              <Card.Body className="pt-0">
                <Card.Title>
                  <Row><Col>{blog.blogTitle}</Col></Row>
                  <Row><Col><Card.Subtitle className="mb-2 text-muted"><small className="text-muted">{format(new Date(blog.createdDate), 'MM/dd/yyyy')}</small></Card.Subtitle></Col></Row>
                </Card.Title>
                <Card.Text>
                  {blog.blogTags.map((tag,idx)=><Badge className='m-1' bg="info" key={idx}>{tag}</Badge>)}
                </Card.Text>
                
              </Card.Body>
              <Card.Footer className="text-muted">
              <Stack direction="horizontal">
                  <div>{blog.blogCategory}</div>
                  <div className="ms-auto">
                    <Button variant="warning" size="sm">
                      <Link href={`/blog/${blog._id}`}>More...</Link>
                    </Button>
                  </div>
              </Stack> 
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      </Suspense>
      </section>
    </main>
    
    )
  }