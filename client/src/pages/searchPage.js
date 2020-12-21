import React, { useState, useEffect } from "react";
import { Container, Nav, Form, FormControl, Button } from "react-bootstrap"
import SearchForm from "../components/search/searchForm"


function SearchPage(props) {





    return (

        <Container style={{marginRight:"25vw", marginLeft:"25vw"}}>

            <SearchForm />

        </Container>
    )
}

export default SearchPage