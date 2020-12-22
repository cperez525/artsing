import React from 'react';
import { Alert } from 'react-bootstrap'

function Message(props){


    return (

        <Alert style={{fontWeight:"bolder", fontFamily:"'Times New Roman'"}} variant={props.message.messageError ? "danger" : "success"} >
            {props.message.messageBody}
        </Alert>
    )
}

export default Message