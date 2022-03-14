import React, { useContext } from "react";
// style
import "./toolbar.scss";
// react bootstrap
import { Container, Navbar, Nav } from "react-bootstrap";
// react router
import { Link, NavLink } from "react-router-dom";
// context
import { UserContext } from "../../App";

const Toolbar = () => {
  // useContext
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      <>
        <NavLink
          exact
          to="/"
          activeClassName="menu_active"
          className="nav-link"
        >
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="menu_active" className="nav-link">
          About
        </NavLink>
        <NavLink
          to="/contact"
          activeClassName="menu_active"
          className="nav-link"
        >
          Contact
        </NavLink>

        <NavLink
          to="/logout"
          activeClassName="menu_active"
          className="nav-link"
        >
          Logout
        </NavLink>
      </>;
    } else {
      return (
        <>
          <NavLink
            exact
            to="/"
            activeClassName="menu_active"
            className="nav-link"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            activeClassName="menu_active"
            className="nav-link"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            activeClassName="menu_active"
            className="nav-link"
          >
            Contact
          </NavLink>
          <NavLink
            to="/login"
            activeClassName="menu_active"
            className="nav-link"
          >
            Login
          </NavLink>
          <NavLink
            to="/registration"
            activeClassName="menu_active"
            className="nav-link"
          >
            Registration
          </NavLink>
        </>
      );
    }
  };

  return (
    <>
      <header id="header">
        <Navbar bg="light" expand="md">
          <Container>
            <Link to="/">
              <Navbar.Brand>MernApp</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink
                  exact
                  to="/"
                  activeClassName="menu_active"
                  className="nav-link"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  activeClassName="menu_active"
                  className="nav-link"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  activeClassName="menu_active"
                  className="nav-link"
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/login"
                  activeClassName="menu_active"
                  className="nav-link"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  activeClassName="menu_active"
                  className="nav-link"
                >
                  Registration
                </NavLink>
                <NavLink
                  to="/logout"
                  activeClassName="menu_active"
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Toolbar;
