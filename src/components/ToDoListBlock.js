'use client'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import ToDoFormModal from 'modals/ToDoFormModal'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import db from '../../firebase'


export default function ToDoFormBlock() {
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState(null)
  const [toDoList, setToDoList] = useState(null)
  useEffect(()=>{
    if(newTask){
      setToDoList([newTask,...toDoList])
      setNewTask(null)
    }
  },[newTask])

  useEffect(() => {
    async function fetchMyAPI(){
      const querySnapshot = await getDocs(collection(db, "ToDoLists"));
      let tempArr = []
      querySnapshot.forEach(doc => {
        tempArr.push({ ...doc.data(), id: doc.id }) 
      });
      setToDoList(tempArr)
    }

    fetchMyAPI()
  }, [])

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
          {toDoList &&
              toDoList.map((item) =>{
                  return(
                    <Card key={item.id}>
                      <Card.Body>Task: {item.taskName}</Card.Body>
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