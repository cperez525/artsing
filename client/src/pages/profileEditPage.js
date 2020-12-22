import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthenticationCtxt";
import { Container, Nav, Form, Button } from "react-bootstrap";
import ProfileService from "../services/Profile";
import Message from '../components/message';
import CloudinaryService from "../services/Cloudinary"


function Edit(props) {

    const authContext = useContext(AuthContext)
    const [user] = useState(authContext.user);
    const [contentInView, setContentInView] = useState("Info")
    const [artistViewed, setArtistViewed] = useState({})
    const [rolesViewed, setRolesViewed] = useState([])
    const [videoViewed, setVideoViewed] = useState([])
    const [audioViewed, setAudioViewed] = useState([])
    const [roleToAdd, setRoleToAdd] = useState({})
    const [videoToAdd, setVideoToAdd] = useState({})
    const [audioToAdd, setAudioToAdd] = useState({})
    const [message, setMessage] = useState(null);

    const [cloudinaryData, setCloudinaryData] = useState("")


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
                    })
                })
            })
        })
    }, [])

    useEffect(() => {
        if (audioToAdd.audio_link) {
            ProfileService.addAudio(audioToAdd).then((res) => {
                setMessage({messageBody: "Upload Successful!", messageError: false})
            }).then(() => {
                setAudioToAdd({})
            })
        }
    }, [audioToAdd])

    useEffect(() => {

        setFormsVisible()
    }, [contentInView])

    const handleNavClick = (e) => {
        e.preventDefault()

        const { id } = e.target

        setContentInView(id)
        setMessage(null)
    }

    const setFormsVisible = () => {

        const forms = document.getElementsByTagName("FORM")

        for (var i = 0; i < forms.length; i++) {

            if (forms[i].id === contentInView) {
                forms[i].style.display = null
            } else {
                forms[i].style.display = "none"
            }
        }
    }

    const onArtistChange = (e) => {

        const { name, value } = e.target
        setArtistViewed({ ...user, [name]: value })
        setMessage(null)
    }

    const onArtistSubmit = (e) => {

        e.preventDefault()

        ProfileService.updateUser(artistViewed).then(res => {
            if (res.message.messageError === false) {
                setMessage({ messageBody: "Upload successful!", messageError: false })
            } else {
                setMessage({messageBody: res.message.messageBody, messageError: true})
            }
        })
    }

    const onRoleChange = (e) => {

        const { name, value } = e.target
        setRoleToAdd({ ...roleToAdd, [name]: value })
        setMessage(null)
    }

    const onRoleSubmit = (e) => {

        e.preventDefault()

        ProfileService.addRole(roleToAdd).then(res => {
            if (res.message.messageError === false) {
                setMessage({ messageBody: "Upload successful!", messageError: false })
            } else {
                setMessage({messageBody: "Something went wrong. Please try again later", messageError: true})
            }
        })
    }

    const onMediaChange = (e) => {



        const { files } = e.target

        const data = new FormData()

        data.append('file', files[0])
        data.append('upload_preset', "tdufqkda")

        setCloudinaryData(data)
    }

    const onPictureSubmit = (e) => {
        e.preventDefault()

        CloudinaryService.uploadPicture(cloudinaryData).then(res => {
            ProfileService.updateUser({ "headshot": res.secure_url }).then(talkBack => {
                if (talkBack.message.messageError === false) {
                    setMessage({ messageBody: "Upload successful!", messageError: false })
                } else {
                    setMessage({messageBody: talkBack.message.messageBody, messageError: true})
                }
            }).then(() => {
                setCloudinaryData("")
            })
        })
    }

    const onAudioInfoChange = (e) => {

        const { name, value } = e.target
        setAudioToAdd({ ...audioToAdd, [name]: value })
        setMessage(null)
    }

    const onAudioSubmit = (e) => {
        e.preventDefault()

        CloudinaryService.uploadVideo(cloudinaryData).then(res => {
            setAudioToAdd({ ...audioToAdd, audio_link: res.secure_url })
        })
    }

    const onVideoChange = (e) => {
        const { name, value } = e.target
        setVideoToAdd({ ...videoToAdd, [name]: value })
        setMessage(null)
    }

    const onVideoSubmit = (e) => {
        e.preventDefault()

        ProfileService.addVideo(videoToAdd).then(res => {
            if (res.message.messageError === false) {
                setMessage({ messageBody: "Upload successful!", messageError: false })
            } else {
                setMessage({messageBody: res.message.messageBody, messageError: true})
            }
        })
    }


    return (

        <Container>
            {user._id === currentArtist ?
                <Container style={{ width: "50vw", borderColor: "black" }}>

                    <Nav className="justify-content-center" variant="tabs" activeKey={contentInView} >
                        <Nav.Item>
                            <Nav.Link eventKey="Info" id="Info" style={{ fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleNavClick}>Info</Nav.Link>
                        </Nav.Item>
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
                        <Nav.Item>
                            <Nav.Link eventKey="Headshot" id="Headshot" style={{ fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleNavClick}>Headshot</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Form id="Info" style={{ display: "none", marginTop:"2vh", boxShadow:"2px 2px 20px", padding:"2vh" }} onSubmit={onArtistSubmit}>
                        <Form.Label htmlFor="first_name" style={{ fontFamily: "'Times New Roman'" }}>First Name: </Form.Label>
                        <input className="form-control" type="text" name="first_name" defaultValue={artistViewed.first_name} style={{ fontFamily: "'Times New Roman'" }} placeholder="Jane" onChange={onArtistChange} />
                        <Form.Label htmlFor="last_name" style={{ fontFamily: "'Times New Roman'" }}>Last Name: </Form.Label>
                        <input className="form-control" type="text" name="last_name" defaultValue={artistViewed.last_name} style={{ fontFamily: "'Times New Roman'" }} placeholder="Doe" onChange={onArtistChange} />
                        <Form.Label htmlFor="city" style={{ fontFamily: "'Times New Roman'" }}>City: </Form.Label>
                        <input className="form-control" type="text" name="city" defaultValue={artistViewed.city} style={{ fontFamily: "'Times New Roman'" }} placeholder="Austin" onChange={onArtistChange} />
                        <Form.Label htmlFor="state" style={{ fontFamily: "'Times New Roman'" }}>State: </Form.Label>
                        <input className="form-control" type="text" name="state" style={{ fontFamily: "'Times New Roman'" }} defaultValue={artistViewed.state} placeholder="Texas" onChange={onArtistChange} />
                        <Form.Label htmlFor="school" style={{ fontFamily: "'Times New Roman'" }}>School: </Form.Label>
                        <input className="form-control" defaultValue={artistViewed.school} style={{ fontFamily: "'Times New Roman'" }} type="text" name="school" placeholder="University of Houston" onChange={onArtistChange} />
                        <Form.Label htmlFor="email" style={{ fontFamily: "'Times New Roman'" }}>Email Address: </Form.Label>
                        <input className="form-control" defaultValue={artistViewed.email} style={{ fontFamily: "'Times New Roman'" }} type="text" name="email" placeholder="janedoe@isfake.net" onChange={onArtistChange} />
                        <Button style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }} variant="outline-dark" type="submit">Submit</Button>
                        {message ? <Message message={message} /> : null}
                    </Form>

                    <Form id="Bio" style={{ display: "none", marginTop:"2vh", boxShadow:"2px 2px 20px", padding:"2vh" }} onSubmit={onArtistSubmit}>
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Add/Edit Bio: </Form.Label>
                        <textarea className="form-control" name="bio" style={{ fontFamily: "'Times New Roman'" }} defaultValue={artistViewed.bio} placeholder="Enter Bio Here" onChange={onArtistChange} />
                        <Button style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }} variant="outline-dark" type="submit">Submit</Button>
                        {message ? <Message message={message} /> : null}
                    </Form>

                    <Form id="Roles" style={{ display: "none", marginTop:"2vh", boxShadow:"2px 2px 20px", padding:"2vh" }} onSubmit={onRoleSubmit}>
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Character: </Form.Label>
                        <input className="form-control" name="character_name" style={{ fontFamily: "'Times New Roman'" }} placeholder="Sarastro" onChange={onRoleChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Opera/Show: </Form.Label>
                        <input className="form-control" name="opera_show_name" style={{ fontFamily: "'Times New Roman'" }} placeholder="The Magic Flute" onChange={onRoleChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Composer: </Form.Label>
                        <input className="form-control" name="composer" style={{ fontFamily: "'Times New Roman'" }} placeholder="Mozart" onChange={onRoleChange} required />
                        <Button style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }} variant="outline-dark" type="submit">Submit</Button>
                        {message ? <Message message={message} /> : null}
                    </Form>

                    <Form id="Audio" style={{ display: "none", marginTop:"2vh", boxShadow:"2px 2px 20px", padding:"2vh" }} onSubmit={onAudioSubmit}>
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Song Name: </Form.Label>
                        <input className="form-control" name="song_name" style={{ fontFamily: "'Times New Roman'" }} placeholder="O Isis und Osiris" onChange={onAudioInfoChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Composer: </Form.Label>
                        <input className="form-control" name="song_composer" style={{ fontFamily: "'Times New Roman'" }} placeholder="Mozart" onChange={onAudioInfoChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Language: </Form.Label>
                        <input className="form-control" name="language" style={{ fontFamily: "'Times New Roman'" }} placeholder="German" onChange={onAudioInfoChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Audio File: </Form.Label>
                        <Form.File style={{ fontFamily: "'Times New Roman'" }} name="audio_link" onChange={onMediaChange} required />
                        <Button style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }} variant="outline-dark" type="submit">Submit</Button>
                        {message ? <Message message={message} /> : null}
                    </Form>

                    <Form id="Video" style={{ display: "none", marginTop:"2vh", boxShadow:"2px 2px 20px", padding:"2vh" }} onSubmit={onVideoSubmit}>
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Song Name: </Form.Label>
                        <input className="form-control" name="song_name" style={{ fontFamily: "'Times New Roman'" }} placeholder="O Isis und Osiris" onChange={onVideoChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Composer: </Form.Label>
                        <input className="form-control" name="song_composer" style={{ fontFamily: "'Times New Roman'" }} placeholder="Mozart" onChange={onVideoChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Language: </Form.Label>
                        <input className="form-control" name="language" style={{ fontFamily: "'Times New Roman'" }} placeholder="German" onChange={onVideoChange} required />
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Youtube Embed Link: </Form.Label>
                        <input className="form-control" name="video_link" style={{ fontFamily: "'Times New Roman'" }} placeholder="https://www.youtube.com/embed/Xox5wU7RXsA" onChange={onVideoChange} required />
                        <Button style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }} variant="outline-dark" type="submit">Submit</Button>
                        {message ? <Message message={message} /> : null}
                    </Form>

                    <Form id="Headshot" style={{ display: "none", marginTop:"2vh", boxShadow:"2px 2px 20px", padding:"2vh" }} onSubmit={onPictureSubmit}>
                        <Form.Label style={{ fontFamily: "'Times New Roman'" }}>Headshot: </Form.Label>
                        <Form.File style={{ fontFamily: "'Times New Roman'" }} name="headshot" onChange={onMediaChange} required />
                        <Button style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }} variant="outline-dark" type="submit">Submit</Button>
                        {message ? <Message message={message} /> : null}
                    </Form>


                </Container>
                :
                <h1>You are not authroized to edit this profile!</h1>
            }
        </Container>

    )
}

export default Edit