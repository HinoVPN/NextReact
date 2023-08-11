'use client'
import axios from "api/axios";
import React, { useRef } from "react";
import { Modal, Button, Form, Card, Stack, FloatingLabel } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useCookies } from "react-cookie";
import useAuth from "hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";

function createBlog() {
    const Editor = dynamic(() => import("components/Editor"), { ssr: false });
    const { Formik } = formik;
    const editorRef = useRef(null);
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const { auth, setAuth } = useAuth()
  const loginSchema = yup.object().shape({
    blogTitle: yup.string().required('Username is required'),
    blogContent: yup.string().required('Password is required'),
    blogImage: yup.mixed().required(),
    blogTags: yup.string().required('Blog Tags is required'),
    blogCategory: yup.string().required('Blog Category is required'),
    // .min(8, 'Minimum length of 8 characters')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'Contains at least one uppercase letter and at least one lowercase letter and at least one special character (non-alphanumeric)'),
  });



  const create = async (values, resetForm) => {
    console.log(1)
    console.log(values)
  }

  return (
    <main style={{marginLeft: 'unset'}}id="main" className="main">
    <section className="section dashboard">
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Stack className="mx-auto">
    <Card>
    <Card.Body>
      <Card.Title>Login</Card.Title>
      <Formik
        validationSchema={loginSchema}
        onSubmit={(values,{resetForm})=>create(values,resetForm)}
        initialValues={{
          blogTitle: 'Title Tseting',
          blogImage: '',
          blogContent: 'Content Testing',
          blogTags: 'Others',
          blogCategory: 'Others',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors,setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit}> 
        
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="blogTitle"
              value={values.blogTitle}
              onChange={handleChange}
              isValid={touched.blogTitle && !errors.blogTitle}
              isInvalid={!!errors.blogTitle}
            />
            <Form.Control.Feedback>Nice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {errors.blogTitle}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="blogImage"
              value={values.blogImage}
              onChange={handleChange}
              isValid={touched.blogImage && !errors.blogImage}
              isInvalid={!!errors.blogImage}
            />
            <Form.Control.Feedback>Nice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.blogImage}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category</Form.Label>
            <Form.Select 
                aria-label="Default select example"
                value={values.blogCategory}
                onChange={handleChange}
                isValid={touched.blogCategory && !errors.blogCategory}
                isInvalid={!!errors.blogCategory}
            >
                <option>Choose...</option>
                <option value="Food">Food</option>
                <option value="Tech">Tech</option>
                <option value="Others">Others</option>
            </Form.Select>
            <Form.Control.Feedback>Nice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.blogCategory}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tags</Form.Label>
            {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                    inline
                    label="Others"
                    name="blogTags"
                    type={type}
                    id={`inline-${type}-1`}
                    value={values.blogTags}
                    onChange={handleChange}
                    isValid={touched.blogTags && !errors.blogTags}
                    isInvalid={!!errors.blogTags}
                />
                </div>
            ))}
            <Form.Control.Feedback>Nice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.blogTags}
            </Form.Control.Feedback>
          </Form.Group>
            <Editor   
            value="<p>Hello from CKEditor&nbsp;5!</p>"
            onChange={ (v) => {setFieldValue("blogContent", v);}}
            />



          <Button type="submit">Create</Button>
        </Form>
        )}
        </Formik>
      </Card.Body>
      </Card>
      </Stack>
    </section>
    </main>
  )
}

export default createBlog