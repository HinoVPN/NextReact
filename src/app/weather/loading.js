import Loading from "components/Loading";
import React from "react";

export default function Weather() {
    return (
      <main style={{marginLeft: 'unset'}}id="main" className="main">
        <section className="section dashboard">
          <Loading/>
        </section>
      </main>
    )
  }