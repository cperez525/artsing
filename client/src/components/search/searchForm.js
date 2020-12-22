import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Container, Form, Button, Nav, FormControl, FormLabel, Row, Col, Table, Alert } from "react-bootstrap";
import ProfileService from "../../services/Profile";

function SearchForm(props) {
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState({ type: "simple" });

    const handleClick = (e) => {

        const { id } = e.target;
        setSearchType({ type: id });
        if (searchType.type === "simple") {
            setSearch("");
        } else {
            setSearch({});
        }
    };

    const onChangeSimple = (e) => {

        const { value } = e.target;
        setSearch(value);
    };

    const onChangeAdvanced = (e) => {

        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    }

    const onSubmit = (e) => {

        e.preventDefault();
        if (searchType.type === "simple") {
            ProfileService.simpleSearch(search).then(data => {
                if(data.length === undefined){
                    setSearchResults([])
                } else{
                    setSearchResults(data)
                }
            })
        } else {
            ProfileService.advancedSearch(JSON.stringify(search)).then(res => {

                setSearchResults(res.response)
            })
        }
    }

    return (
        <Container fluid>
            <Nav variant="tabs" style={{ width: "50vw", marginBottom: "2vh" }} activeKey={searchType.type}>
                <Nav.Item>
                    <Nav.Link eventKey="simple" id="simple" style={searchType.type === "simple" ? { color: "black", fontWeight: "bolder", fontFamily: "'Times New Roman'" } : { color: "blue", fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleClick}>Simple Search</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="advanced" id="advanced" style={searchType.type === "advanced" ? { color: "black", fontWeight: "bolder", fontFamily: "'Times New Roman'" } : { color: "blue", fontWeight: "bolder", fontFamily: "'Times New Roman'" }} onClick={handleClick}>Advanced Search</Nav.Link>
                </Nav.Item>
            </Nav>
            <Form style={{ width: "50vw", boxShadow: " 0px 2px 10px gray", padding: "3vh", marginBottom: "3vh", borderRadius: "8px" }} onSubmit={onSubmit}>
                {searchType.type === "simple" ?
                    <div>
                        <FormControl style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }} type="text" placeholder="Search for a first or last name, voice type, city, or state" onChange={onChangeSimple} />
                    </div> :
                    <div>
                        <Row>
                            <Col>
                                <FormLabel style={{ fontFamily: "'Times New Roman'" }}>First Name: </FormLabel>
                                <input className="form-control" style={{ fontFamily: "'Times New Roman'" }} name="first_name" type="text" onChange={onChangeAdvanced} />
                            </Col>
                            <Col>
                                <FormLabel style={{ fontFamily: "'Times New Roman'" }}>Last Name: </FormLabel>
                                <input className="form-control" style={{ fontFamily: "'Times New Roman'" }} name="last_name" type="text" onChange={onChangeAdvanced} />
                            </Col>
                        </Row>
                        <FormLabel style={{ fontFamily: "'Times New Roman'" }}>Voice Type: </FormLabel>
                        <Form.Control name="voice_type" as="select" style={{ fontFamily: "'Times New Roman'" }} onChange={onChangeAdvanced}>
                            <option></option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Soprano</option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Mezzo-Soprano</option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Contralto</option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Countertenor</option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Tenor</option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Baritone</option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Bass-Baritone</option>
                            <option style={{ fontFamily: "'Times New Roman'" }}>Bass</option>
                        </Form.Control>
                        <Row>
                            <Col>
                                <FormLabel style={{ fontFamily: "'Times New Roman'" }}>City: </FormLabel>
                                <input className="form-control" name="city" type="text" style={{ fontFamily: "'Times New Roman'" }} onChange={onChangeAdvanced} />
                            </Col>
                            <Col>
                                <FormLabel style={{ fontFamily: "'Times New Roman'" }}>State: </FormLabel>
                                <input className="form-control" name="state" type="text" style={{ fontFamily: "'Times New Roman'" }} onChange={onChangeAdvanced} />
                            </Col>
                        </Row>
                    </div>
                }
                <Button type="submit" variant="outline-dark" style={{ marginTop: "5px", fontFamily: "'Times New Roman'" }}>Search</Button>
            </Form>

            <Table striped hover style={{ width: "50vw", boxShadow: "2px 2px 12px gray" }}>
                <tbody style={{ width: "100%" }}>
                    {!searchResults || searchResults.length === 0 ?
                        <Alert className="alert-warning" style={{ fontFamily: "'Times New Roman'", fontWeight: "bold", marginBottom: "0" }}>No Results Found</Alert>
                        :
                        searchResults.map(artist =>
                            <Link style={{ color: "black" }} to={"/profile=" + artist._id}>

                                <tr style={{ width: "50vw", paddingBottom: "4px", marginTop: "3px", marginBottom: '3px', display: "table", borderRadius: "7px" }} className="text-center" key={artist._id} id={artist.id}>

                                    <td><img src={artist.headshot ? artist.headshot : "https://sheetmusicplus.files.wordpress.com/2015/12/circle_of_fifths_deluxe_4-svg.png"} style={{ width: "40px", height: "50px" }} thumbnail /></td>

                                    <td style={{ verticalAlign: "middle", fontFamily: "'Times New Roman'" }}>{artist.first_name} {artist.last_name}, {artist.voice_type}</td>

                                    <td style={{ verticalAlign: "middle", fontFamily: "'Times New Roman'" }}>{artist.city}, {artist.state}</td>

                                </tr>

                            </Link>
                        )
                    }
                </tbody>
            </Table>

        </Container>
    )

}

export default SearchForm