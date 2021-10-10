import React from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import Layout from './shared/Layout'


const LoginForm = ({ err }) => {


    let showAlert = false;

    if(err.length > 0){
        showAlert = true;
    }else{
        showAlert = false;
    }

    return (
        <>
            <Container className="mx-auto w-50 p-3 mw-70">
                <h1 className="mb-4 mt-4">Login</h1>
                <Form id="loginForm" method = "post" action="/login">

                    <Alert className="alert alert-danger" variant="danger" show={showAlert}>{err}</Alert>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password"></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-2">Login</Button>
                </Form>
            </Container>
        </>
    )
}


const Login = (props) => {
    return (
        <Layout us={props.us}>
            <LoginForm {...props}/>
        </Layout>
    )
}


export default Login;