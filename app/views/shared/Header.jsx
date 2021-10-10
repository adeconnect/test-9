import React from 'react'
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'


const Header = (props) => {

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
            {props.us ? (
              <>
                <Nav.Link id="logout" href="/logout">
                  Logout
                </Nav.Link>
                <Navbar.Text id="username">{`Hi, ${props.us.firstname}`}</Navbar.Text>
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