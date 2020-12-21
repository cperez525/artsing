import React, { useState, useRef, useEffect } from 'react';
import {useHistory} from "react-router-dom"
import AuthService from '../services/Authentication';
import { Form, Button, Container} from "react-bootstrap"
import Message from '../components/message';


function Register(props) {

    const [user, setUser] = useState({});
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    const history = useHistory();

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value });
        setMessage(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();


        if(user.password.length < 6){
            return setMessage({messageBody: "Password must be at least 6 characters", messageError: true})
        }

        if(user.voice_type === null || user.voice_type === "" || !user.voice_type){
            return setMessage({messageBody:"You must choose a voice type", messageError: true})
        }
        
        AuthService.register(user).then(data => {

            const { message } = data;
            setMessage(message);
            

            if (!message.messageError) {
                timerID = setTimeout(() => {
                    history.push('/signin');
                }, 1000)
            }
        });
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Label htmlFor="first_name">First Name: </Form.Label>
                <input className="form-control" type="text" name="first_name" placeholder="Jane (required)" onChange={onChange} required="You must provide a first name"/>
                <Form.Label htmlFor="last_name">Last Name: </Form.Label>
                <input className="form-control" type="text" name="last_name" placeholder="Doe (required)" onChange={onChange} required/>
                <Form.Label>Voice Type:</Form.Label>
                <Form.Control name="voice_type" as="select" onChange={onChange}>
                    <option></option>
                    <option>Soprano</option>
                    <option>Mezzo-soprano</option>
                    <option>Contralto</option>
                    <option>Countertenor</option>
                    <option>Tenor</option>
                    <option>Baritone</option>
                    <option>Bass-Baritone</option>
                    <option>Bass</option>
                </Form.Control>
                <Form.Label htmlFor="city">City: </Form.Label>
                <input className="form-control" type="text" name="city" placeholder="Austin (required)" onChange={onChange} required />
                <Form.Label htmlFor="state">State: </Form.Label>
                <input className="form-control" type="text" name="state" placeholder="Texas (required)" onChange={onChange} required/>
                <Form.Label htmlFor="password">School: </Form.Label>
                <input className="form-control" type="text" name="password" placeholder="University of Houston (not required)" onChange={onChange}/>
                <Form.Label htmlFor="email">Email Address: </Form.Label>
                <input className="form-control" type="text" name="email" placeholder="janedoe@isfake.net (required)" onChange={onChange} required/>
                <Form.Label htmlFor="password">Password: </Form.Label>
                <input className="form-control" type="text" name="password" placeholder="Password must be at least 6 characters" onChange={onChange} required/>
                <Button style={{ marginTop: "5px"}} variant="outline-dark" type="submit">Create Account</Button>
            </Form>
            <p>Already have an account? Click <a href="/signin">here</a>!</p>
            {message ? <Message message={message} /> : null}
        </Container>
    )
}

export default Register