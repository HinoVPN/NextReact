import ToDoListBlock from "components/ToDoListBlock";
import React from "react";

export default function Weather() {
    return (
      <main style={{marginLeft: 'unset'}} id="main" className="main">
        <section className="section dashboard">
          <ToDoListBlock/>
        </section>
      </main>
    )
  }