'use client'
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import Loading from 'components/Loading';
import { Badge, Card, Col, Container, Figure, Form, Row, Stack } from 'react-bootstrap';
import { format } from 'date-fns'

const BlogDetail = ({params}) => {
  const [blog,setBlog] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const axiosPrivate = useAxiosPrivate()

  useEffect(()=>{
    async function getBlog(){
      if(params._id){
        const res = await axiosPrivate.post("/blogs/getBlogById",{_id:params._id})
        setBlog(res.data)

        if(res.data.blogImage){
          setImageSrc(res.data.blogImage)
        }else{
          switch(res.data.blogCategory) {
            case "Food":
              setImageSrc("/image/blog/Other.jpg")
              break;
            case "Tech":
              setImageSrc("/image/blog/Other.jpg")
              break;
            default:
              setImageSrc("/image/blog/Other.jpg")
              break;
          }
        }
      }
      
    }
    getBlog()
  },[])

  return (
    <main style={{marginLeft: 'unset'}}id="main" className="main">
    <section className="section dashboard">

      {!blog ? (<Loading/>) : (
        <>
        {/* <div>{JSON.stringify(blog)}</div> */}
        <Container>
        <Row>
        <Col md="12">
          <div className='px-lg-5 pt-lg-5'>
          <div className='px-lg-5'>
          <Figure>
            <Figure.Image src={imageSrc} className='w-100'/>
            <Figure.Caption className='pt-2'>
              <Row>
                <Col xs={6} md={4} lg={3}>
                  <span style={{fontWeight: '900'}} className='h6 text-muted'>Category: </span>
                  <span style={{fontWeight: '500'}} className='text-muted'>{blog.blogCategory}</span>
                </Col >
                <Col xs={6} md={4} lg={3}>
                  <span style={{fontWeight: '900'}} className='h6 text-muted'>By: </span>
                  <span style={{fontWeight: '500'}} className='text-muted'>{blog.user.username}</span>
                </Col>
                <Col xs={6} md={4} lg={3}>
                  <span style={{fontWeight: '900'}} className='h6 text-muted'>On: </span>
                  <span style={{fontWeight: '500'}} className='text-muted'>{format(new Date(blog.createdDate), 'MM/dd/yyyy')}</span>
                </Col>
                <Col xs={6} md={4} lg={3}>
                  {blog.blogTags.map((tag,idx)=><Badge className='m-1' bg="info" key={idx}>{tag}</Badge>)}
                </Col>
              </Row>
            </Figure.Caption>
          </Figure>
          <Card.Title className='pt-2'><div className='h3'>{blog.blogTitle}</div></Card.Title>
          <Card.Text>
            {new DOMParser().parseFromString(blog.blogContent, "text/html").body.textContent}
          </Card.Text>
          </div>
          </div>
        </Col>
        </Row>
        </Container>
        </>

      )}

      
    </section>
    </main>

  )
}

export default BlogDetail