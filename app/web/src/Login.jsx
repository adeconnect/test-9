import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import Layout from './shared/Layout'


const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        let loginData = {
            email: email,
            password: password,
        };


        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.status == "ok") {
                document.cookie = `uid=${response.data.id}; domain=; path=/ `;
                history.push("/");
            } else {
                setShowAlert(true);
                setAlertText("Invalid email/password");
            }
        })
        .catch((error) => console.log(error));
    };

    return (
        <>
            <Container className="mx-auto w-50 p-3 mw-70">
                <h1 className="mb-4 mt-4">Login</h1>
                <Form id="loginForm" onSubmit={handleSubmit}>

                    <Alert className="alert alert-danger" variant="danger" show={showAlert}>{alertText}</Alert>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleChange}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange}></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-2">Login</Button>
                </Form>
            </Container>
        </>
    )
}


const Login = () => {
    return (
        <Layout>
            <LoginForm />
        </Layout>
    )
}


export default Login;