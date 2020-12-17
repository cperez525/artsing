import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../../services/Authentication';
import { AuthContext } from '../../Context/AuthenticationCtxt'
import { Nav, Navbar } from "react-bootstrap"
import SignIn from './signInOption';
import SignOut from './signOutOption';

function NavBar(props) {

    const {user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    return (
        <Navbar bg="dark" expand="lg" style={{ width: "100%" }}>
            <Link to="/">
                <Navbar.Brand style={{ fontSize: "xx-large", color: "whitesmoke", fontFamily: "'Times New Roman' ,cursive" }}>Artsing</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-end navbar-dark" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <Nav.Link style={{ color: "whitesmoke" }} href="/">Home</Nav.Link>
                    <Nav.Link style={{ color: "whitesmoke" }} href="search">Search Artists</Nav.Link>
                    { !isAuthenticated ? <SignIn /> : <SignOut />}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
