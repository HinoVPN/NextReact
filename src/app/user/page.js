'use client'
import axios from 'api/axios'
import 'bootstrap/dist/css/bootstrap.css'
import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Header() {
const { data: session } = useSession()
const axiosPrivate = useAxiosPrivate()
const router = useRouter()

useEffect(() => {
    const users = async () =>{
        try{
            // @ts-ignore
            const users = await axiosPrivate.post("/users/profile",{_id:session?.user._id})
            console.log(users)
        }catch(error){
            console.log(error)
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
},[])

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
    {session && JSON.stringify(session?.user)}
  </>
  )
}