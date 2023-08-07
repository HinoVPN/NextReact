'use client'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Row, Stack } from 'react-bootstrap'
import ToDoFormModal from 'modals/ToDoFormModal'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import db from '../../firebase'
import {BiSolidTrashAlt,BiSolidEdit} from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import Link from 'next/link'
import ToDoTaskModal from 'modals/ToDoTaskModal'
import { format } from 'date-fns'

export default function ToDoFormBlock() {
  const [toDoList, setToDoList] = useState(null)
  const task = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "ToDoLists"), where("status", "!=", 8));
    const unsubscribe  = onSnapshot(q, (querySnapshot) => {
      setToDoList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    });

    return ()=>{
      unsubscribe ()
    }
  }, [])

  const onDelete = async (id) => {
    try {
      const docRef = doc(db, 'ToDoLists', id);
      updateDoc(docRef, { status: 8 });
      handleClose()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



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
    <ToDoFormModal show={show} handleClose={handleClose} />
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
                      <Card.Header>
                      <Stack direction="horizontal" gap={3}>
                        <div><span>Deadline: {format(new Date(item.deadline), 'MM/dd/yyyy hh:mm:ss a')}</span></div>
                        <div className="ms-auto">{item.status == 0? (<Badge bg="danger">ToDo</Badge>):(<Badge bg="success">Done</Badge>)}</div>
                      </Stack>
                      </Card.Header>
                      <Card.Body>
                      <Stack direction="horizontal" gap={1}>
                        <div className="me-auto">{item.taskName}</div>
                        {item.status == 1? "":
                        (<>
                          <Button variant="primary"><HiDocumentText onClick={()=>handleShow2(item)}/></Button>
                          <Button variant="danger"><BiSolidTrashAlt onClick={()=>onDelete(item.id)}/></Button>
                        </>)}
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