import React from "react";
import { Navbar, Nav, Button, Image, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { signUserOut } from "../../firebase/auth";
import avatar1 from "../../images/Avatar1.png";

const NavBar = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="p-2 sticky-top">
      <Nav.Link as={Link} to={userLoggedIn ? "Dashboard" : ""}>
        <Navbar.Brand>WanderWork</Navbar.Brand>
      </Nav.Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to={userLoggedIn ? "Dashboard" : ""}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="Explore">
            Explore
          </Nav.Link>
        </Nav>
        {userLoggedIn ? (
          <Dropdown align="end">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              <Image
                src={avatar1}
                alt="Avatar"
                style={{ width: "40px", height: "40px" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="UserProfile">
                View Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="EditProfile">
                Edit Profile
              </Dropdown.Item>{" "}
              {/* Add link to EditProfile */}
              <Dropdown.Item
                onClick={() => {
                  signUserOut().then(() => {
                    navigate("/");
                  });
                }}
              >
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Nav.Link as={Link} to="Login">
              <Button variant="outline-primary">Login</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="Signup">
              <Button variant="primary" className="mx-3">
                Sign Up
              </Button>
            </Nav.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
