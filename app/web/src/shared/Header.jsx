import React, { useState } from 'react'
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Header = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    let history = useHistory();

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    if (document.cookie) {
        const cookieValue = getCookie("uid");
        let cookieExists = cookieValue ? true : false;
        if (cookieExists) {
            fetch(`/api/users/${cookieValue}`)
                .then((response) => response.json())
                .then((response) => {
                    const { firstname } = response;
                    setShow(true);
                    setName(`Hi, ${firstname}`);
                })
                .catch((e) => console.log(e));
        }
    }

    function handleLogout(event) {
        document.cookie = "uid=; expires=Thu, 01 Oct 1960 00:00:00 UTC; path=/;";
        history.push("/");
    }

    return (
        <Navbar bg="primary" variant="dark" className="justify-content-between px-4">
            <Nav>
                <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search Projects" name="search" />
                </Form>
                <Button variant="outline-light" type="submit">Search</Button>

                <Nav>
                    <Nav.Link href="/projects/submit" class="nav-link">
                        Submit
                    </Nav.Link>
                </Nav>
            </Nav>
            <Nav>
            {show ? (
              <>
                <Nav.Link id="logout" href="/" onClick={handleLogout}>
                  Logout
                </Nav.Link>
                <Navbar.Text id="username">{name}</Navbar.Text>
              </>
            ) : (
              <>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
            </Nav>
        </Navbar>
    )
}


export default Header;