import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthenticationCtxt'
import { Nav, Navbar } from "react-bootstrap"
import SignIn from './signInOption';
import SignOut from './signOutOption';

function NavBar(props) {

    const { user, isAuthenticated } = useContext(AuthContext)

    return (
        <Navbar bg="dark" expand="lg" style={{ width: "100%" }}>
            <Link to={isAuthenticated ? "/profile=" + user._id : "/"}>
                <Navbar.Brand style={{ fontSize: "xx-large", color: "whitesmoke", fontFamily: "'Times New Roman'" }}>singID</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-end navbar-dark" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%", fontFamily:"'Times New Roman'" }}>
                    {isAuthenticated ? 
                    <Nav.Link style={{ color: "whitesmoke", fontFamily:"'Times New Roman'" }} href={"/profileedit=" + user._id}>Edit Profile</Nav.Link>
                    :
                    null}
                    <Nav.Link style={{ color: "whitesmoke", fontFamily:"'Times New Roman'" }} href={isAuthenticated ? "/profile=" + user._id : "/"}>Home</Nav.Link>
                    <Nav.Link style={{ color: "whitesmoke", fontFamily: "'Times New Roman" }} href="/search">Search Artists</Nav.Link>
                    { isAuthenticated ? <SignOut /> : <SignIn />}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
