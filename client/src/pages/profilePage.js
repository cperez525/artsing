import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthenticationCtxt";
import { Container, Col, Row, Table, Image, Jumbotron, Nav } from "react-bootstrap";
import ProfileService from "../services/Profile";



function ProfilePage(props) {

    const [canEdit, setCanEdit] = useState(false);
    const [artistViewed, setArtistViewed] = useState({})
    const [rolesViewed, setRolesViewed] = useState([])
    const [videoViewed, setVideoViewed] = useState([])
    const [audioViewed, setAudioViewed] = useState([])
    const [contentInView, setContentInView] = useState("Bio")
    const authContext = useContext(AuthContext)
    const [user] = useState(authContext.user)
    const [isAuthenticated, setIsAuthenticated] = useState(authContext.isAuthenticated)

    let currentArtist = window.location.href.split("=")[1];

    useEffect(() => {
        ProfileService.getUser(currentArtist).then(res => {
            setArtistViewed(res)
        }).then(() => {
            ProfileService.getRoles(currentArtist).then(res => {
                setRolesViewed(res)
            }).then(() => {
                ProfileService.getAudio(currentArtist).then(res => {
                    setAudioViewed(res)
                }).then(() => {
                    ProfileService.getVideo(currentArtist).then(res => {
                        setVideoViewed(res)
                    }).then(() => {
                        console.log(rolesViewed, audioViewed, videoViewed, "yay")
                    })
                })
            })
        })
    }, [])

    useEffect(() => {

        setRowsVisible()
    }, [contentInView])

    useEffect(() => {
        console.log(user._id, currentArtist)
        if (user._id === currentArtist) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
        console.log(canEdit)
    }, [artistViewed])

    const handleNavClick = (e) => {

        const { id } = e.target

        setContentInView(id)
        console.log(id)
    }

    const setRowsVisible = () => {

        const rows = document.getElementsByClassName("trow")

        for (var i = 0; i < rows.length; i++) {

            if (rows[i].classList[0] === contentInView) {
                rows[i].style.display = null
            } else {
                rows[i].style.display = "none"
            }
        }
    }


    return (
        <Container className="justify-content-center" style={{ marginTop: "2vh" }}>
            <Row style={{ maxWidth: "100vw" }}>
                <Col>
                </Col>
                <Col>
                    <div className="justify-content-center text-center" style={{ margin: "2px", fontFamily: "'Times New Roman'", fontSize: "1.4vw", fontWeight: "900", boxShadow: "8px 8px 10px gray, inset 0em 1em 1em rgba(0,0,0,0.125)", borderRadius: "5px", width: "fit-content" }}>
                        <p style={{ marginBottom: "0" }}>{artistViewed.first_name} {artistViewed.last_name}, {artistViewed.voice_type}</p>
                        <p style={{ marginBottom: "0" }}>{artistViewed.city}, {artistViewed.state}</p>
                    </div>
                </Col>
                <Col>
                </Col>
            </Row>
            <Jumbotron style={{ padding: "0", margin: "0", backgroundColor: "white", marginTop: "3vh" }}>
                <Container fluid className="justify-content-center" style={{ display: "flex" }}>

                    <Col className="col-lg">
                        <Image className="float-left" style={{ maxHeight: "50vh", maxWidth: "50vw", position: "relative" }} src={artistViewed.headshot ? artistViewed.headshot : "https://sheetmusicplus.files.wordpress.com/2015/12/circle_of_fifths_deluxe_4-svg.png"} />
                    </Col>


                    <Col className="col-lg" >
                        <Table borderless> 
                            <Nav className="justify-content-center" variant="tabs" activeKey={searchType.type} style={{ borderBottom: "none", width: "100%", borderColor: "black" }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="Bio" id="Bio" style={{ fontWeight: "inherit", fontFamily:"'Times New Roman'"}} onClick={handleNavClick}>Bio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Roles" id="Roles" style={{ fontWeight: "lighter", fontFamily:"'Times New Roman'" }} onClick={handleNavClick}>Roles</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Audio" id="Audio" style={{ fontWeight: "bold", fontFamily:"'Times New Roman'" }} onClick={handleNavClick}>Audio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Video"  id="Video" style={{ fontWeight: "bolder", fontFamily:"'Times New Roman'" }} onClick={handleNavClick}>Video</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {artistViewed.bio || artistViewed.bio !== null ?
                                <tr className="Bio trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>{artistViewed.bio}</td>
                                </tr>
                                :
                                <tr className="Bio trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>Bio coming soon!</td>
                                </tr>
                            }

                            {rolesViewed.length ?
                                <tr className="Roles trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>Roles</td>
                                </tr>
                                :
                                <tr className="Roles trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>Roles coming soon!</td>
                                </tr>
                            }

                            {videoViewed.length ?
                                <tr className="Video trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>Video Recordings</td>
                                </tr>
                                :
                                <tr className="Video trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>Videos coming soon!</td>
                                </tr>
                            }

                            {audioViewed.length ?
                                <tr className="Audio trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>Audio Recordings</td>
                                </tr>
                                :
                                <tr className="Audio trow" style={{ display: "none", fontFamily:"'Times New Roman'" }}>
                                    <td>Audio recordings coming soon!</td>
                                </tr>
                            }

                        </Table>
                    </Col>

                </Container>
            </Jumbotron>
        </Container >
    )
}

export default ProfilePage