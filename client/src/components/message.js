import React from 'react';
import { Alert } from 'react-bootstrap'

function Message(props){


    return (

        <Alert variant={props.message.messageError ? "danger" : "success"} >
            {props.message.messageBody}
        </Alert>
    )
}

export default Message