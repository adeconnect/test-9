import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from './shared/Layout'

const CreatePage = () => {

    let history = useHistory();

    let lookupCookie = document.cookie.split(";").some((item) => item.trim().startsWith('uid='));
    if (!lookupCookie) {
        history.push("/login")
    }


    const [name, setName] = useState("");
    const [abstract, setAbstract] = useState("");
    const [authors, setAuthors] = useState("");
    const [tags, setTags] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "abstract":
                setAbstract(value);
                break;
            case "authors":
                setAuthors(value);
                break;
            case "tags":
                setTags(value);
                break;
        }
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const tagss = tags.split(",");
        const authorss = authors.split(","); 

        let projectData = {
            name: name,
            abstract: abstract,
            tags: tagss,
            authors: authorss,
        };


        fetch("/api/projects", {
            method: "POST",
            body: JSON.stringify(projectData),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status == "ok") {
                    history.push("/");
                } else {
                    setShowAlert(true);
                    setAlertText(response.errors);
                }
            })
            .catch((error) => {
                console.log(error)
            })


    }




    return (
        <Container className="mx-auto w-50">

            <Alert className="alert alert-danger mt-3 p-4" variant="danger" show={showAlert}>{alertText.map((text) => {
                return (
                    <>
                        {text}
                        <br />
                    </>
                )
            })}</Alert>



            <Form onSubmit={handleSubmit} id="createProjectForm">
                <h2>Submit Project</h2>
                <Form.Group>
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter Project name" value={name} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Project Abstract:</Form.Label>
                    <Form.Control as="textarea"  name="abstract" value={abstract} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Author(s):</Form.Label>
                    <Form.Control type="text" placeholder="Enter Author names (separated by comma)" name="authors" value={authors} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tag(s):</Form.Label>
                    <Form.Control type="text" placeholder="Use # to tag project with different topics (e.g #javaScript #Mongodb)" name="tags" value={tags} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2">Continue</Button>
            </Form>
        </Container>
    )
}

const CreateProject = (props) => {
    return (
        <Layout>
            <CreatePage />
        </Layout>
    )
};


export default CreateProject;