import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Container, Form, Button, Nav, FormControl, FormLabel, Row, Col, Table } from "react-bootstrap";
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
        console.log(searchType, search);
    };

    const onChangeSimple = (e) => {

        const { value } = e.target;
        setSearch(value);
        console.log(search);
    };

    const onChangeAdvanced = (e) => {

        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
        console.log(search)
    }

    const onSubmit = (e) => {

        e.preventDefault();
        if (searchType.type === "simple") {
            ProfileService.simpleSearch(search).then(data => {
                setSearchResults(data)
                console.log(searchResults)
            })
        } else {
            ProfileService.advancedSearch(JSON.stringify(search)).then(res => {

                setSearchResults(res.response)
                console.log(searchResults)
            })
        }
    }

    return (
        <Container>
            <Nav variant="tabs" style={{ borderBottom: "none" }} activeKey={searchType.type}>
                <Nav.Item>
                    <Nav.Link eventKey="simple" id="simple" style={searchType.type === "simple" ? { color: "black", fontWeight: "bolder" } : { color: "blue", fontWeight: "bolder" }} onClick={handleClick}>Simple Search</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="advanced" id="advanced" style={searchType.type === "advanced" ? { color: "black", fontWeight: "bolder" } : { color: "blue", fontWeight: "bolder" }} onClick={handleClick}>Advanced Search</Nav.Link>
                </Nav.Item>
            </Nav>
            <Form onSubmit={onSubmit}>
                {searchType.type === "simple" ?
                    <div>
                        <FormControl style={{ marginTop: "5px" }} type="text" placeholder="Search for a first or last name, voice type, city, or state" onChange={onChangeSimple} />
                    </div> :
                    <div>
                        <Row>
                            <Col>
                                <FormLabel>First Name</FormLabel>
                                <input className="form-control" name="first_name" type="text" onChange={onChangeAdvanced} />
                            </Col>
                            <Col>
                                <FormLabel>Last Name</FormLabel>
                                <input className="form-control" name="last_name" type="text" onChange={onChangeAdvanced} />
                            </Col>
                        </Row>
                        <FormLabel>Voice Type</FormLabel>
                        <Form.Control name="voice_type" as="select" onChange={onChangeAdvanced}>
                            <option>soprano</option>
                            <option>mezzo-soprano</option>
                            <option>contralto</option>
                            <option>countertenor</option>
                            <option>tenor</option>
                            <option>baritone</option>
                            <option>bass-baritone</option>
                            <option>bass</option>
                        </Form.Control>
                        <Row>
                            <Col>
                                <FormLabel>City</FormLabel>
                                <input className="form-control" name="city" type="text" onChange={onChangeAdvanced} />
                            </Col>
                            <Col>
                                <FormLabel>State</FormLabel>
                                <input className="form-control" name="state" type="text" onChange={onChangeAdvanced} />
                            </Col>
                        </Row>
                    </div>
                }
                <Button type="submit" variant="outline-dark" style={{ marginTop: "5px" }}>Search</Button>
            </Form>

            <Table striped hover style={{ width: "100%" }}>
                <tbody style={{width: "100%"}}>
                    {searchResults === undefined || null ?
                        <tr style={{marginTop: "3px"}}>
                            <td>No Results Found</td>
                        </tr> :

                        searchResults.map(artist =>
                            <Link style={{ color: "black" }} to={"/profile=" + artist._id}>

                                <tr style={{ width: "100%", paddingBottom: "4px", marginTop: "3px", marginBottom: '3px', display: "table" }} className="text-center" key={artist._id} id={artist.id}>

                                    <td className="text-center">{artist.first_name}</td>

                                    <td className="text-center">{artist.last_name}</td>

                                    <td className="text-center">{artist.voice_type}</td>

                                    <td className="text-center">{artist.city}</td>

                                    <td className="text-center">{artist.state}</td>

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