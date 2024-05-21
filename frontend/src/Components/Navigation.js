/*React-specific imports */
import React, { useState } from "react";
import { Link } from "react-router-dom";

/*Import Components from react-bootstrap */
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

/*Icons */
import { IoFitness } from "react-icons/io5";

function Navigation() {
  const [expandbar, setExpandbar] = useState(false);

  return (
    <Navbar
      fixed="top"
      expand="md"
      className= "black-navbar"
    >
      <Container className="navbar-styles">
      <Navbar.Brand
          href="/"
          className="home"
        >
          <IoFitness style={{marginTop: "2px", marginRight: "7px"}} /> <h6 style={{marginTop: "2px", marginRight: "25px"}}>Fitness Tracker</h6> 
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{backgroundColor: "#0165E1"}}
          onClick={() => {
            setExpandbar(expandbar ? false : "expanded");
          }}
        ></Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" >
        <Nav.Item >
              <Nav.Link as={Link} to="/" >
                Home
              </Nav.Link>
        </Nav.Item>
        <Nav.Item >
              <Nav.Link as={Link} to="/signup" >
                Sign Up
              </Nav.Link>
        </Nav.Item>
        <Nav.Item >
              <Nav.Link as={Link} to="/calorie" >
                Calorie Tracker
              </Nav.Link>
        </Nav.Item>
        <Nav.Item >
              <Nav.Link as={Link} to="/weight" >
                Weight Tracker
              </Nav.Link>
        </Nav.Item>
        <Nav.Item >
              <Nav.Link as={Link} to="/signin" >
                Sign In
              </Nav.Link>
        </Nav.Item>
        <Nav.Item >
              <Nav.Link as={Link} to="/water" >
                Water Intake
              </Nav.Link>
        </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation