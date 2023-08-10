'use client'
import axios from 'api/axios'
import 'bootstrap/dist/css/bootstrap.css'
import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Header() {
const axiosPrivate = useAxiosPrivate()
const router = useRouter()

useEffect(() => {
    const users = async () =>{
        try{
            // @ts-ignore
            const users = await axiosPrivate.post("/users/profile",{_id:session?.user._id})
        }catch(error){
            if(!error?.response){
                console.log(error.response)
            }else if(error.response?.status == 401){
                router.push('/login')
            }else if(error.response?.status == 500){
                console.log('Server Error')
            }
        }
    }

    users()
},[status])

  return (<>
    User Page<br></br>
    User Page<br></br>
    User Page<br></br>
    User Page<br></br>
    User Page<br></br>
    User Page<br></br>
    User Page<br></br>
    User Page<br></br>
    User Page<br></br>
  </>
  )
}