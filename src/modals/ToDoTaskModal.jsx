import React from 'react'
import {Modal,Button, Badge} from 'react-bootstrap';
import { format } from 'date-fns'
const ToDoTaskModal = ({show,handleClose,task}) => {
  const onFinish = async (data) => {
    try {
      handleClose()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return(
    <Modal backdrop="static" show={show} onHide={handleClose}>
    {task &&
     (
      <>
      <Modal.Header closeButton>
        <Modal.Title>{task.taskName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Deadline: {format(new Date(task.deadline), 'MM/dd/yyyy hh:mm:ss a')}</h6>
        <span>{task.taskDetail}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>onFinish()}>
          Save Changes
        </Button>
      </Modal.Footer>
      </>
     )
    }

    </Modal>
  )
}

export default ToDoTaskModal