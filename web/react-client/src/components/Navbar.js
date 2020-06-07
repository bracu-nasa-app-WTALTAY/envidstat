import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer
} from "mdbreact";

import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
  }

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    const { pathname } = this.props;
    const { collapse } = this.state;

    return (
      <header>
        <MDBNavbar
          color="elegant-color"
          className={pathname === "/" ? "no-shadow" : ""}
          fixed="top"
          dark
          transparent={pathname === "/" && !collapse}
          expand="md"
          scrolling
        >
          <MDBContainer>
            <MDBNavbarBrand href="/">
              <img
                src={`${process.env.PUBLIC_URL}/assets/img/logo-color-sm.png`}
                className="img-fluid"
                alt="navlogo-envidstat"
              />
              <strong>
                ENVID
                <span className="text-primary">STAT</span>
              </strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={collapse} navbar>
              <MDBNavbarNav right>
                <MDBNavItem active={pathname === "/"}>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={pathname === "/maps"}>
                  <MDBNavLink to="/maps">Maps</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={pathname === "/statistics"}>
                  <MDBNavLink to="/statistics">Statistics</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={pathname === "/about"}>
                  <MDBNavLink to="/about">About</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </header>
    );
  }
}

export default Navbar;
