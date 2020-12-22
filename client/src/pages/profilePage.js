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
        })
    }, [])

    useEffect(() => {

        setRowsVisible()
    }, [contentInView])

    useEffect(() => {
        if (user && user !== null) {
            if (user._id === currentArtist) {
                setCanEdit(true)
            } else {
                setCanEdit(false)
            }
        }

        ProfileService.getRoles(currentArtist).then(res => {
            setRolesViewed(res.roles)
            console.log(res.roles)
        }).then(() => {
            ProfileService.getAudio(currentArtist).then(res => {
                setAudioViewed(res.audio_recordings)
                console.log(res.audio_recordings)
            }).then(() => {
                ProfileService.getVideo(currentArtist).then(res => {
                    setVideoViewed(res.video_recordings)
                    console.log(res.video_recordings)
                })
            })
        })
        console.log(rolesViewed.roles, audioViewed.audio_recordings, videoViewed.video_recordings)
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
                rows[i].style.display = "block"
            } else {
                rows[i].style.display = "none"
            }
        }
    }


    return (
        <Container className="justify-content-center" style={{ border: "solid 3px black", marginTop: "2vh", marginBottom: "2vh", paddingTop: "5vh", paddingBottom: "5vh", borderRadius: "20px", boxShadow: "10px 10px 30px gray" }}>
            <Row style={{ maxWidth: "100vw" }}>
                <Col>
                </Col>
                <Col>
                    <div className="justify-content-center text-center" style={{ margin: "2px", fontFamily: "'Times New Roman'", fontSize: "1.4vw", fontWeight: "900", boxShadow: "8px 8px 10px gray, inset 0em 1em 1em rgba(0,0,0,0.125)", borderRadius: "5px", width: "fit-content", padding: "1vh" }}>
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
                        <Image className="float-left" style={{ maxHeight: "50vh", maxWidth: "50vw", position: "relative", boxShadow: "8px 8px 30px gray" }} src={artistViewed.headshot ? artistViewed.headshot : "https://sheetmusicplus.files.wordpress.com/2015/12/circle_of_fifths_deluxe_4-svg.png"} />
                    </Col>


                    <Col className="col-lg" >
                        <Table borderless className="table-striped" style={{ boxShadow: "8px 8px 30px gray, inset 0em 0em 1em rgba(0,0,0,0.025)", maxHeight: "400px", overflow: "scroll", borderRadius: "40px" }}>
                            <Nav className="justify-content-center" variant="tabs" activeKey={contentInView} style={{ borderBottom: "none", width: "100%", borderColor: "black" }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="Bio" id="Bio" style={{ fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleNavClick}>Bio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Roles" id="Roles" style={{ fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleNavClick}>Roles</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Audio" id="Audio" style={{ fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleNavClick}>Audio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Video" id="Video" style={{ fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleNavClick}>Video</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {artistViewed.bio || artistViewed.bio !== null ?
                                <tr className="Bio trow" style={{ display: "none", fontFamily: "'Times New Roman'" }}>
                                    <td>{artistViewed.bio}</td>
                                </tr>
                                :
                                <Container style={{ marginLeft: "8vw", marginRight: "6vw" }}>
                                    <tr className="Bio trow text-center" style={{ fontFamily: "'Times New Roman'" }}>
                                        <td>Bio coming soon!</td>
                                    </tr>
                                </Container>
                            }

                            {rolesViewed.length > 0 ?
                                <Container style={{ marginLeft: "8vw", marginRight: "6vw" }}>
                                    {rolesViewed.map(Role =>
                                        <tr className="Roles trow" style={{ display: "none", fontFamily: "'Times New Roman'" }}>
                                            <td>{Role.character_name}</td>
                                            <td>{Role.opera_show_name}</td>
                                            <td>{Role.composer}</td>
                                        </tr>
                                    )}

                                </Container>
                                :
                                <Container style={{ marginLeft: "8vw", marginRight: "6vw" }}>
                                    < tr className="Roles trow" style={{ display: "none", fontFamily: "'Times New Roman'" }}>
                                        <td>Roles coming soon!</td>
                                    </tr>
                                </Container>
                            }

                            {videoViewed.length > 0 ?

                                videoViewed.map(Video =>
                                    <tr className="Video trow" style={{ display: "none", fontFamily: "'Times New Roman'", fontWeight: "bold", marginRight: "6vw", marginLeft: "6vw", maxWidth: "300px", maxHeight: "300px" }}>
                                        <iframe title={Video.song_name} src={Video.video_link} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="true"></iframe>
                                        <td>{Video.song_name} ({Video.song_composer})</td>
                                    </tr>
                                )

                                :
                                <Container style={{ marginLeft: "9vw", marginRight: "6vw" }}>
                                    <tr className="Video trow" style={{ display: "none", fontFamily: "'Times New Roman'" }}>
                                        <td>Videos coming soon!</td>
                                    </tr>
                                </Container>
                            }

                            {audioViewed.length > 0 ?

                                audioViewed.map(Recording =>
                                    <tr className="Audio trow" style={{ display: "none", fontFamily: "'Times New Roman'", marginLeft: "20%", marginRight: "20%" }}>
                                        <audio controls controlsList="nodownload" src={Recording.audio_link}>Your browser doesn't support this audio player</audio>
                                        <td>{Recording.song_name} ({Recording.song_composer})</td>
                                    </tr>)
                                :
                                <Container style={{ marginLeft: "6vw", marginRight: "6vw" }}>
                                    <tr className="Audio trow" style={{ display: "none", fontFamily: "'Times New Roman'" }}>
                                        <td>Audio recordings coming soon!</td>
                                    </tr>
                                </Container>
                            }

                        </Table>
                    </Col>
                </Container>
            </Jumbotron>
        </Container >
    )
}

export default ProfilePage