import React from 'react'
import {Modal,Button, Badge} from 'react-bootstrap';
import { format } from 'date-fns'
const ToDoTaskModal = ({show,handleClose,task}) => {
  return (
    <Modal backdrop="static" show={show} onHide={handleClose}>
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ToDoTaskModal