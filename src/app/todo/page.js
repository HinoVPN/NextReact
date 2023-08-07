import ToDoListBlock from "components/ToDoListBlock";
import React, { Suspense } from "react";

export default function Todo() {
    return (
      <main style={{marginLeft: 'unset'}} id="main" className="main">
        <section className="section dashboard">
            <ToDoListBlock/>
        </section>
      </main>
    )
  }