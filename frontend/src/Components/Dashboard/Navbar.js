
// NavScrollExample.js

import React from 'react';
import { isAuthenticated } from '../../Backend';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Dashboard/Dashboard.css';
import logo from '../Dashboard/logo.png';
import Dashboard  from './Dashboard'; // Import the Dashboard component

function NavScrollExample() {
  const authenticatedUser = isAuthenticated();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} width="40%" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '600px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="#action1">Home</Nav.Link>
            <Nav.Link as={Link} to="#action2">About us</Nav.Link>
            <Nav.Link as={Link} to="#action2">Contact</Nav.Link>

            <NavDropdown title="Our Products" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="#">XLIA </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">AMIN</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {authenticatedUser ? (
            <Dashboard />
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
