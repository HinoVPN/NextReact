'use client'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import Modal from 'modals/Modal'
import ToDoFormModal from 'modals/ToDoFormModal'

export default function ToDoFormBlock() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className='row'>
    <div className='col-lg-12'>
      <div className='row'>
        <div className='col col-lg-2'>
          <Button variant="primary" onClick={handleShow}>
            Create Task
          </Button>
        </div>
        
      </div>

        <ToDoFormModal show={show} handleClose={handleClose}/>
        
    </div>
    </div>
  
  )
}