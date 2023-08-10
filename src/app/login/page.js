'use client'
import axios from "api/axios";
import React from "react";
import { Modal, Button, Form, Card, Stack } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useCookies } from "react-cookie";
import useAuth from "hooks/useAuth";
const LOGIN_URL = "users/login";


export default function login() {
  const { Formik } = formik;
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const { auth, setAuth } = useAuth()
  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required') 
    // .min(8, 'Minimum length of 8 characters')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'Contains at least one uppercase letter and at least one lowercase letter and at least one special character (non-alphanumeric)'),
  });

  const login = async (values) => {
    const {username, password} = values
    const res = await axios.post(LOGIN_URL, 
      JSON.stringify({username, password}),
      {
      headers: { "Content-Type": "application/json"},
    })
    if (res.status === 200) {
      setCookie("userId", res.data._id, {path: '/'})
      setCookie("accessToken", res.data.accessToken, {path: '/'})
      setCookie("role", res.data.role, {path: '/'})
      setCookie("username", res.data.username, {path: '/'})
      if(cookies){
        setAuth(cookies)
      }
      router.push('/')
      return res.data
    }
    return null
  }
  



  return (
    <main style={{marginLeft: 'unset'}}id="main" className="main">
    <section className="section dashboard">
    <Stack className="col-md-5 mx-auto">
    <Card>
    <Card.Body>
      <Card.Title>Login</Card.Title>
      <Formik
        validationSchema={loginSchema}
        onSubmit={(values)=>login(values)}
        initialValues={{
          username: 'test',
          password: 'test',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}> 
          <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              isValid={touched.username && !errors.username}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback>Nice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback>Nice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Sign In</Button>
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