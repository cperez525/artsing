import React from 'react';
import { Alert } from 'react-bootstrap'

function Message(props){


    return (

        <Alert variant={props.message.messageError ? "danger" : "success"} >
            {props.message.messageBody}
            {console.log(props)}
        </Alert>
    )
}

export default Message