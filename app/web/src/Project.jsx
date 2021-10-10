import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Layout from './shared/Layout'


const ViewPage = () => {


    const { id } = useParams();
    const [author, setAuthor] = useState("");
    const [abstract, setAbstract] = useState("");
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    const [comments, setComments] = useState("");

    useEffect(() => {
        fetch(`/api/projects/${id}`)
            .then((response) => response.json())
            .then((response) => {
                const { abstract, authors, createdBy, name, tags } = response;

                setAbstract(abstract);
                setAuthors(authors);
                setName(name);
                setTags(tags);

                fetch(`/api/users/${createdBy}`)
                    .then((response) => response.json())
                    .then((response) => {
                        const { firstname, lastname } = response;

                        setAuthor(`${firstname} ${lastname}`);
                    })
                    .catch((error) => console.log(error))
            })
    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;

        switch (name) {
            case 'comments': setComments(value);
                break;
        }
    }



    return (
        <>

            <Container className="w-90 mx-auto mt-4">
                <h3 id="project_name">{name}</h3>
                <div className="mt-3 bg-light p-3">
                    <Row>
                        <Col>Created By</Col>
                        <Col>Date Created</Col>
                        <Col>Last Updated</Col>
                        <Col className="mt-2"><a href="#"> <Button variant="primary">Edit Project</Button> </a></Col>
                    </Row>

                    <strong>
                        <Row>
                            <Col id="project_author">{author}</Col>
                            <Col>2020-08-30</Col>
                            <Col>2020-08-30</Col>
                            <Col></Col>
                        </Row>
                    </strong>
                </div>

                <div>
                    <Row className="mt-3">
                        <Col>
                            <h5><strong>Project Abstract</strong></h5>
                            <hr />
                        </Col>

                        <Col>
                            <h5><strong>Project Details</strong></h5>
                            <hr />
                        </Col>
                    </Row>

                    <Row>
                        <Col id="project_abstract">
                            <p>{abstract}</p>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Header>Author(s)</Card.Header>
                                <Card.Body>
                                    <Card.Text className="p-2" id="project_authors" >
                                        {authors.map((auth) => {
                                            return (
                                                <>
                                                    <Card.Text key={auth}>{auth}</Card.Text>
                                                </>
                                            );
                                        })} </Card.Text>
                                    <Card.Footer className="bg-light tags" id="project_tags">{tags}</Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <h5><strong>Comments</strong></h5>
                    </Row>

                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Control as="textarea" id="comments" rows="4" placeholder="Enter a comment" name="comments" onChange={handleChange} value={comments}></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button type="submit" variant="primary" className="mt-2">Submit</Button>
                                </Form.Group>
                            </Form>
                            <hr />
                            <p className="mx-auto">No comments added yet</p>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Header>Project Files</Card.Header>
                                    <Card.Text className="p-2" >No file uploaded yet</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>

        </>

    )
}




const Project = (props) => {
    return (
        <Layout>
            <ViewPage />
        </Layout>
    )
}

export default Project;