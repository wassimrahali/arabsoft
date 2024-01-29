// Import necessary components and styles
import React, { useState, useEffect } from 'react';
import { isAuthenticated, signout } from '../../Backend';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import '../Dashboard/Dashboard.css';
import logo from '../Dashboard/logo.svg';
import avatar from '../Dashboard/avatar.png';

// Add the following styles to your Dashboard.css file
/* ... */

const Dashboard = () => {
  const navigate = useNavigate();
  const authenticatedUser = isAuthenticated();

  const onSignout = () => {
    signout();
    console.log("Signed out");
    navigate('/home');
  };

  console.log(`User signed in as: ${authenticatedUser?.user?.role}`);

  return (
    authenticatedUser ? (
      <div className='dashboard'>
        <div className="button-container">
          <NavDropdown title={<span><FontAwesomeIcon width="15px" icon={faUser} size="lg" className="mr-2" /> {authenticatedUser.user.name} </span>} id="profileDropdown">
            <NavDropdown.Item onClick={onSignout}>
              <FontAwesomeIcon icon={faSignOutAlt} />  Logout
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/update">
              <FontAwesomeIcon icon={faEdit}/>  Edit Profile
            </NavDropdown.Item>
          </NavDropdown>

          {authenticatedUser.user.role === 'admin' && navigate('/adminpage')}
        </div>
      </div>
    ) : (
      <b><Link to='/signin'>
        <FontAwesomeIcon icon={faSignInAlt} /> Sign In
      </Link></b>
    )
  );
};

const NavScrollExample = () => {
  const [navbarFixed, setNavbarFixed] = useState(false);
  const authenticatedUser = isAuthenticated();
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const navbarHeight = document.getElementById('my-navbar').offsetHeight;

    if (scrollPosition > navbarHeight) {
      setNavbarFixed(true);
    } else {
      setNavbarFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      id="my-navbar"
      expand="lg"
      className={`my-navbar red-text ${navbarFixed ? 'fixed' : ''}`}
      style={{padding: '20px' }}
    >
      <Container fluid>
        <Navbar.Brand href="/"><img className="logo" src={logo} alt="Logo"  /><span /></Navbar.Brand>
        
        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" >
        <i className="fas fa-bars fa-1x" style={{ color: '#0b8288' }}></i> 
               </Navbar.Toggle>
        {/* Responsive Content */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '600px' }} navbarScroll>
            <Nav.Link as={Link} to="#action1" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="#action2" className="nav-link">About us</Nav.Link>
            <Nav.Link as={Link} to="/product" className="nav-link">Products</Nav.Link>
            <NavDropdown title="Our Products" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/product" className="nav-dropdown-item">XLIA</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#" className="nav-dropdown-item">AMIN</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#" className="nav-dropdown-item">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {authenticatedUser ? <Dashboard /> : (
            <Nav className="ms-auto">
              {/* Existing Sign In and Sign Up Links... */}
              <NavDropdown title={<span><FontAwesomeIcon width="15px" icon={faUser} /> Account</span>} id="profileDropdown">
                <NavDropdown.Item as={Link} to="/signin" className="nav-dropdown-item">
                  <FontAwesomeIcon icon={faUserPlus} /> Sign in
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signup" className="nav-dropdown-item">
                  <FontAwesomeIcon icon={faSignInAlt} /> Register
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScrollExample;
