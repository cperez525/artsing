import React, { useState, useEffect, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { AuthContext } from "../Context/AuthenticationCtxt";



function HomePage(props) {

    const {user, isAuthenticated} = useContext(AuthContext)

    useEffect(() => {

        if(isAuthenticated) {

            window.location.replace(window.location.href + "profile=" + user._id)
        }
    },[])

    return (

        <Container style={{ fontFamily: "'Times New Roman", textAlign: "center" }}>
            <h1>Welcome to singID!</h1>
            <h4>A platform designed for you to freely showcase your voice!</h4>

            <Container style={{ fontFamily: "'Times New Roman", textAlign: "center", boxShadow: "2px 2px 15px gray, inset 0em -1em 5em 2em rgba(0,0,0,0.125)", height: "50vh", width: "50vw", marginTop: "3vh", padding: "2vh" }}>
                <div>
                    <h5 style={{marginTop:"3vh"}}>New to singID?</h5>
                    <Button style={{ fontWeight: "bold" }} variant="outline-dark" href="/register">Create an Account</Button>
                </div>
                <div>
                    <h5 style={{marginTop:"3vh"}}>Already have an account?</h5>
                    <Button style={{ fontWeight: "bold" }} variant="outline-dark" href="/signin">Sign In</Button>
                </div>
                <div>
                    <h5 style={{marginTop:"3vh"}}>Are you looking for an artist?</h5>
                    <Button style={{ fontWeight: "bold" }} variant="outline-dark" href="/search">Search Artists</Button>
                </div>


            </Container >

        </Container>
    )
}

export default HomePage