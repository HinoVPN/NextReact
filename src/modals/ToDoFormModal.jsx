import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect } from 'react'
import {Modal,Button, FloatingLabel, Form} from 'react-bootstrap';
import { useForm } from "react-hook-form"
import db from '../../firebase';


const ToDoFormModal = ({show,handleClose,returnData}) => {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "ToDoLists"), {
        taskName: data.taskName,
        deadline: data.deadline,
        taskDetail: data.taskDetail,
        status: 0
      });
      returnData(docRef)
      handleClose()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
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
    <Modal backdrop="static" show={show} onHide={handleClose}>
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