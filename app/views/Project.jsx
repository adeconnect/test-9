import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from './shared/Layout'


const ViewPage = ({dat, dat2}) => {

    const {name, abstract, authors, tags} = dat;

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
                            <Col id="project_author">{`${dat2.firstname} ${dat2.lastname}`}</Col>
                            <Col>{new Date(dat.createdAt).toLocaleDateString()}</Col>
                            <Col>{new Date(dat.createdAt).toLocaleDateString()}</Col>
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
                                    <Form.Control as="textarea" id="comments" rows="4" placeholder="Enter a comment" name="comments"></Form.Control>
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
        <Layout us={props.us}>
            <ViewPage {...props} />
        </Layout>
    )
}

export default Project;