'use client'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row, Stack } from 'react-bootstrap'
import ToDoFormModal from 'modals/ToDoFormModal'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import db from '../../firebase'
import {BiSolidTrashAlt,BiSolidEdit} from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import Link from 'next/link'
import ToDoTaskModal from 'modals/ToDoTaskModal'
export default function ToDoFormBlock() {
  const [newTask, setNewTask] = useState(null)
  const [toDoList, setToDoList] = useState(null)
  const task = useRef(null);

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (currentTask) => {
    task.current = currentTask
    setShow2(true)
  }
  
  return (
    
    <div className='row'>
    <ToDoFormModal show={show} handleClose={handleClose} returnData={setNewTask}/>
    <ToDoTaskModal show={show2} handleClose={handleClose2} task={task.current}/>
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
                      <Card.Header>Deadline: {item.deadline}</Card.Header>
                      <Card.Body>
                      <Stack direction="horizontal" gap={1}>
                        <div className="me-auto">{item.taskName}</div>
                        <Button variant="primary"><HiDocumentText onClick={()=>handleShow2(item)}/></Button>
                        <Button variant="danger"><BiSolidTrashAlt/></Button>
                      </Stack>
                      </Card.Body>
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