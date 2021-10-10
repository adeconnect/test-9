import React from 'react'
import { Container, Form, Alert, Button, Col, Row } from 'react-bootstrap'
import Layout from './shared/Layout'


const SignupPage = (props) => {

    /* const [programs, setPrograms] = useState([]);
     const [gradYears, setgradYears] = useState([]);
     const [firstname, setFirstname] = useState("");
     const [lastname, setLastname] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [prog, setProg] = useState("");
     const [matric, setMatric] = useState("");
     const [gyears, setGyears] = useState("");
     const [showAlert, setShowAlert] = useState(false);
     const [alertText, setAlertText] = useState([]);


    useEffect(() => {
        fetch("/api/programs")
            .then((response) => response.json())
            .then((data) => {
                setPrograms(data)
            });

        fetch("/api/graduationYears")
            .then((response) => response.json())
            .then((data) => setgradYears(data));
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "firstName":
                setFirstname(value);
                break;
            case "lastName":
                setLastname(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "program":
                setProg(value);
                break;
            case "matricNumber":
                setMatric(value);
                break;
            case "graduationYear":
                setGyears(value);
                break;
        }
    };


    const handlesubmit = (e) => {
        e.preventDefault();

        let regInfo = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            matricNumber: matric,
            program: prog,
            graduationYear: gyears,
        };

        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(regInfo),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status === "ok") {
                    document.cookie = `uid=${response.data.id}; domain=; path=/ `;
                    history.push("/");
                } else {
                    setShowAlert(true);
                    setAlertText(response.errors);
                }
            })
            .catch((e) => console.log(e));
    };
*/


const {program, graduationYear, err} = props;

let showAlert = false;
if(err.length > 0){
    showAlert = true;
}else{
    showAlert = false;
}

    return (
        <>
            <Container className="mx-auto p-3 w-60">
                <h1>Signup</h1>
                <Form id="signupForm" method="post" action="/signup">
                    <Alert className="alert alert-danger" variant="danger" show={showAlert}>
                        {err.map((text) => {
                            return (
                                <>
                                    {text}
                                    <br />
                                </>
                            )
                        })}
                    </Alert>
                    
                    <Row className="mb-2">
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email"/>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password"/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Program:</Form.Label>
                            <Form.Control as="select" name="program" >
                                <option>Select Option</option>
                                {program.map((progs) => (
                                    <option key={progs}>{progs}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Matric Number</Form.Label>
                            <Form.Control name="matricNumber" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Graduation Year</Form.Label>
                            <Form.Control as="select" name="graduationYear">
                                <option>Select Option</option>
                                {graduationYear.map((year) => (
                                    <option key={year}>{year}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                    </Row>

                    <Button variant="primary" type="submit" className="mt-2"> Sign Up </Button>
                </Form>
            </Container>
        </>
    )
}

const Signup = (props) => {
    return (
        <Layout us={props.us}>
            <SignupPage {...props}/>
        </Layout>
    )
}


export default Signup;