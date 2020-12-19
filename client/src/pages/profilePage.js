import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthenticationCtxt";
import { Container } from "react-bootstrap";
import ProfileService from "../services/Profile";



function ProfilePage(props) {

    const [artistViewed, setArtistViewed] = useState({})
    const authContext = useContext(AuthContext)
    const [user, setUser] = useState(authContext.user)
    const [isAuthenticated, setIsAuthenticated] = useState(authContext.isAuthenticated)

    let currentArtist = window.location.href.split("=")[1];

    useEffect(() => {
        ProfileService.getUser(currentArtist).then(res => {
            setArtistViewed(res)
        })
    },[])

    return (

        <Container>
            <h1>{artistViewed.first_name}</h1>
            <h1>{artistViewed.last_name}</h1>
            <h1>{artistViewed.voice_type}</h1>
            <h1>{artistViewed.city}</h1>
            <h1>{artistViewed.state}</h1>
            <h1>{artistViewed.email}</h1>

        </Container>
    )
}

export default ProfilePage