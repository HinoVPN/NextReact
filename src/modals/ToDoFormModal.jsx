import React from 'react'
import {Modal,Button, FloatingLabel, Form} from 'react-bootstrap';

const ToDoFormModal = ({show,handleClose}) => {



  
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
                  <Form.Control type="text" placeholder="Enter Task" />
              </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInput">
              <FloatingLabel
                  controlId="floatingInput"
                  label="Deadline"
                  className="mb-3"
              >
                  <Form.Control type="datetime-local"/>
              </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInput">
          <FloatingLabel controlId="floatingTextarea2" label="Detail">
          <Form.Control
              as="textarea"
              placeholder="Tell more..."
              style={{ height: '100px' }}
          />
          </FloatingLabel>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
  )
}

export default ToDoFormModal