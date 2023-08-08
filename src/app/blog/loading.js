'use client'
import React, { useEffect } from "react";
import { Button, Card, Col, Placeholder, Row, Stack } from "react-bootstrap";

export default function Blog() {

  return (
    <main style={{marginLeft: 'unset'}} id="main" className="main">
      <section className="section dashboard">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {Array.from({ length: 20 }).map((_, idx) => (
          <Col key={idx}>
            <Card style={{ width: '18rem' }} className="mx-auto">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
          </Col>
        ))}
      </Row>
      </section>
    </main>
    )
  }