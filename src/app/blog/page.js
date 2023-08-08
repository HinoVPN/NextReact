'use client'
import React, { useEffect } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";

export default function Blog() {

  return (
    <main style={{marginLeft: 'unset'}} id="main" className="main">
      <section className="section dashboard">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {Array.from({ length: 20 }).map((_, idx) => (
          <Col key={idx}>
            <Card style={{ width: '18rem' }} className="mx-auto">
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </section>
    </main>
    )
  }