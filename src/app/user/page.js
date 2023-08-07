'use client'
import axios from 'api/axios'
import 'bootstrap/dist/css/bootstrap.css'
import useAxiosPrivate from 'hooks/useAxiosPrivate'
import useAuth from 'hooks/userAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function Header() {
const { auth } = useAuth()
const axiosPrivate = useAxiosPrivate()
const router = useRouter()

useEffect(() => {
    const users = async () =>{
        try{
            const users = await axiosPrivate.post("/users/profile",{_id:auth._id})
            console.log(users)
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

    console.log(auth)
    users()
    
},[])

  return (<>
    User Page
  </>
  )
}