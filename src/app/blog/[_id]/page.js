'use client'
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const BlogDetail = ({params}) => {
  const [blog,setBlog] = useState(null)
  const axiosPrivate = useAxiosPrivate()

  useEffect(()=>{
    async function getBlog(){
      if(params._id){
        const res = await axiosPrivate.post("/blogs/getBlogById",{_id:params._id})
        setBlog(res.data)
      }
    }
    getBlog()
  },[])

  return (
    <main style={{marginLeft: 'unset'}}id="main" className="main">
        <section className="section dashboard">
          {params && (<div>{JSON.stringify(blog)}</div>)}
        </section>
    </main>
  )
}

export default BlogDetail