import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import { signUserOut } from '../../firebase/auth';

const NavBar = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <Navbar bg="light" expand="lg" className='p-2 sticky-top'>
            <Nav.Link as={Link} to={userLoggedIn ? "Dashboard" : ""}>
                <Navbar.Brand>WanderWork</Navbar.Brand>
            </Nav.Link>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={userLoggedIn ? "Dashboard" : ""}>Home</Nav.Link>
                    <Nav.Link href="#explore">Explore</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                </Nav>
                {userLoggedIn ? (
                    <>
                        <Button variant="outline-danger" onClick={() => {signUserOut().then(() => {navigate("/")})}}>Sign Out</Button>
                        <Nav.Link as={Link} to="NewItinerary">
                            <Button variant="primary">New Adventure</Button>
                        </Nav.Link>
                    </>
                ) : (
                    <>
                        <Nav.Link as={Link} to="Login">
                            <Button variant="outline-primary">Login</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="Signup">
                            <Button variant="primary" className='mx-3'>Sign Up</Button>
                        </Nav.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
