import React, { useContext } from "react";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Header.css";

const Header = () => {

  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  

  

  return (
    <div>
      <Navbar expand="lg">
        <Navbar.Brand href="/home">Gofast</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto main-navbar">
            <Nav.Link className="nab-item">
              <Link  to="/home">Home</Link>
            </Nav.Link>
            <Nav.Link className="nab-item">
              <Link to="/destination">Destination</Link>
            </Nav.Link>
            <Nav.Link className="nab-item">
              <Link to="/blog">Blog</Link>
            </Nav.Link>
            <Nav.Link className="nab-item">
              <Link to="/contact">Contact</Link>
            </Nav.Link>
            
            <Link to="/login">
            <button className="header-btn">Log in</button>
            {/* {loggedInUser.name} */}
            </Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <spain className="header-spain"></spain>
      
    </div>
  );
};

export default Header;
