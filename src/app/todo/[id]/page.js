import React from 'react'

const Task = ({params}) => {
  return (
    <main style={{marginLeft: 'unset'}}id="main" className="main">
        <section className="section dashboard">
          Task {params.id}
        </section>
    </main>
  )
}

export default Task