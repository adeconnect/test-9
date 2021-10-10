import React from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import Layout from './shared/Layout'

const CreatePage = ({ err }) => {

    let showAlert = false;

    if(err.length > 0){
        showAlert = true;
    }else{
        showAlert = false;
    }

    return (
        <Container className="mx-auto w-50">

            <Alert className="alert alert-danger mt-3 p-4" variant="danger" show={showAlert}>{err.map((text) => {
                return (
                    <>
                        {text}
                        <br />
                    </>
                )
            })}</Alert>



            <Form id="createProjectForm" method="post" action="/projects/submit">
                <h2>Submit Project</h2>
                <Form.Group>
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter Project name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Project Abstract:</Form.Label>
                    <Form.Control as="textarea"  name="abstract" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Author(s):</Form.Label>
                    <Form.Control type="text" placeholder="Enter Author names (separated by comma)" name="authors" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tag(s):</Form.Label>
                    <Form.Control type="text" placeholder="Use # to tag project with different topics (e.g #javaScript #Mongodb)" name="tags" />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2">Continue</Button>
            </Form>
        </Container>
    )
}

const CreateProject = (props) => {
    return (
        <Layout us={props.us}>
            <CreatePage {...props}/>
        </Layout>
    )
};


export default CreateProject;