'use client'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Button, Card } from 'react-bootstrap'
import Modal from 'modals/Modal'
import ToDoFormModal from 'modals/ToDoFormModal'

export default function ToDoFormBlock() {
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState(null)
  const [toDoList, setToDoList] = useState([])
  useEffect(()=>{
    if(newTask){
      setToDoList([newTask,...toDoList])
      setNewTask(null)
    }
  },[newTask])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    
    <div className='row'>
    <ToDoFormModal show={show} handleClose={handleClose} returnData={setNewTask}/>
    
    <div className='col-lg-12'>
      <div className='row'>
        <div className='col col-lg-2 mb-3'>
          <Button variant="primary" onClick={handleShow}>
            Create Task
          </Button>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {toDoList.length > 0 &&
              toDoList.map((item) =>{
                  return(
                    <Card key={item.taskName}>
                      <Card.Body>{item.taskName}</Card.Body>
                    </Card>
                  )
              })
          }
          
        </div>

      </div>
      

    </div>
    </div>
  
  )
}