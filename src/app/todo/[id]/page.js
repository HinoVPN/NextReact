'use client'
import React, { useEffect, useState } from 'react'
import db from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Task = ({params}) => {
  const [task,setTask] = useState(null)


  useEffect(()=>{
    async function getTask(){
      const docRef = doc(db, "ToDoLists", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data())
        setTask(docSnap.data())
      }
    }
    if(!task)
      getTask()
  },[params])


  return (
    <main style={{marginLeft: 'unset'}}id="main" className="main">
        <section className="section dashboard">
          {task && (<div>Task {task.taskDetail}</div>)}
        </section>
    </main>
  )
}

export default Task