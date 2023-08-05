import React, { useContext, useState } from 'react'
import {Modal,Button, Form} from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'api/axios';
import useAuth from 'hooks/userAuth';
const LOGIN_URL = '/users/login'

const LoginModal = ({show,handleClose}) => {
  const { setAuth } = useAuth()
  const { Formik } = formik;

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required') 
    // .min(8, 'Minimum length of 8 characters')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'Contains at least one uppercase letter and at least one lowercase letter and at least one special character (non-alphanumeric)'),
  });

  const login = async (values) => {
    try{
      const response = await axios.post(LOGIN_URL, 
        values,
        {
        headers: { "Content-Type": "application/json"},
      })
      console.log(response.data)
      if(response.status === 200){
        setAuth(response.data)
        handleClose()
      }
    }catch(error){
      if(!error?.response){
        console.log(error.response)
      }else if(error.response?.status == 401){
        console.log('Unauthorized')
      }else if(error.response?.status == 500){
        console.log('Server Error')
      }
    }
  }
  



  return (
    <Modal backdrop="static" show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Sign In</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      

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


    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>

    </Modal>
    
  )
}

export default LoginModal