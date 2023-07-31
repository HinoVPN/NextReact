import React, { useEffect } from 'react'
import {Modal,Button, FloatingLabel, Form} from 'react-bootstrap';
import { useForm } from "react-hook-form"

const ToDoFormModal = ({show,handleClose,returnData}) => {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = (data) => {
    returnData(data)
    handleClose()
  }

  useEffect(() => {
    reset({
      "taskName":'',
      "deadline":'',
      "taskDetail":''
    })
  }, [handleClose])

  return (
    <Form>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicInput">
              <FloatingLabel
                  controlId="floatingInput"
                  label="Task Name"
                  className="mb-3"
              >
                  <Form.Control 
                  type="text" 
                  placeholder="Enter Task" 
                  {...register("taskName", { required: true })}
                  />
              </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInput">
              <FloatingLabel
                  controlId="floatingInput"
                  label="Deadline"
                  className="mb-3"
              >
                  <Form.Control 
                  type="datetime-local"
                  {...register("deadline", { required: true })}
                  />
              </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInput">
          <FloatingLabel controlId="floatingTextarea2" label="Detail">
          <Form.Control
              as="textarea"
              placeholder="Tell more..."
              style={{ height: '100px' }}
              {...register("taskDetail", { required: true })}
          />
          </FloatingLabel>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
  )
}

export default ToDoFormModal