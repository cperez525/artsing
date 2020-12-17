import React from 'react';

function Message(props){

    const getStyle = (props) => {
        let baseClass = "alert ";
        if(props.message.msgError){
            baseClass = basClass + "alert-danger";
        } else {
            baseClass = baseClass + "alert-success";
        }

        return baseClass + "text-center"
    }

    return (

        <div className={getComputedStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}

export default Message