import React, { useEffect, useState } from 'react'
import { Button, Jumbotron, Container, Card, CardGroup } from 'react-bootstrap'

import Layout from "./shared/Layout"


const ContJumbotron = () => {
  return (
    <>
      <Jumbotron className="p-4 mb-4 mt-3 bg-light">
        <h1>Welcome to Project Explorer</h1>
        <p>Project Explorer is a repository for final year projects across all departments at your institution. You can submit your project and search projects submitted by others to learn from.</p>
        <Button href="/signup" variant="primary" className="mr-4">Get Started</Button>
        <Button href="/login" variant="secondary">Login</Button>
      </Jumbotron>
    </>
  )
};


const CardsComp = () => {
  const [projects, setprojects] = useState([]);
  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json())
      .then((response) => setprojects(response.slice(0, 4)));
  }, []);

  return (
    <>
    <CardGroup className="showcase">
      {projects.map((project) => {
        const {abstract, authors, id, name, tags} = project;

        return (
          <Card>
            <Card.Body>
              <Card.Title>
                <Card.Link href={`/projects/${id}`}>{name}</Card.Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{authors}</Card.Subtitle>
              <Card.Text>{abstract}</Card.Text>
              <Card.Link href="#">{tags}</Card.Link>
            </Card.Body>
          </Card>
        );
      })
      }
    </CardGroup>
    </>
  )
}

const Home = (props) => {
  return (
    <Layout>
      <>
        <ContJumbotron />

        <Container className="mt-4">
          <CardsComp />
        </Container>

      </>
    </Layout>
  )
}

export default Home;