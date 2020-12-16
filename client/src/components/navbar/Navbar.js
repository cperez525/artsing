import React from "react";
import { Nav, Navbar } from "react-bootstrap"

function NavBar() {

    return (
        <Navbar bg="dark" expand="lg" style={{ width: "100%" }}>
            <Navbar.Brand href="/" style={{ fontSize: "xx-large", color: "whitesmoke", fontFamily: "'Times New Roman' ,cursive" }}>Artsing</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-end navbar-dark" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <Nav.Link style={{color: "whitesmoke"}} href="/">Home</Nav.Link>
                    <Nav.Link style={{color: "whitesmoke"}} href="search">Search Artists</Nav.Link>
                    <Nav.Link style={{color: "whitesmoke"}} href="/signin">Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
