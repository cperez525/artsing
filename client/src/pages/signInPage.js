import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom"
import AuthService from '../services/Authentication';
import { AuthContext } from '../Context/AuthenticationCtxt';
import { Form, Button, Container } from 'react-bootstrap'
import Message from '../components/message';


function SignIn(props) {


    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState(authContext.user);

    const history = useHistory();

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setMessage(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        AuthService.login(user).then(data => {

            const { isAuthenticated, user, message } = data;
            console.log(data)

            if (isAuthenticated) {
                authContext.setUser(user)
                authContext.setIsAuthenticated(isAuthenticated);
                console.log(user)
                history.push('/profile=' + user._id)
            } else {
                setMessage({ messageBody: "Login credentials are incorrect", messageError: true });
            }

        })
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Label htmlFor="email" style={{fontFamily:"'Times New Roman'"}}>Email Address: </Form.Label>
                <input className="form-control" type="text" name="email" placeholder="Email Address" style={{fontFamily:"'Times New Roman'"}} onChange={onChange} />
                <Form.Label htmlFor="password" style={{fontFamily:"'Times New Roman'"}}>Password: </Form.Label>
                <input className="form-control" type="password" name="password" placeholder="Password" style={{fontFamily:"'Times New Roman'"}} onChange={onChange} />
                <Button style={{ marginTop: "5px", fontFamily:"'Times New Roman" }} variant="outline-dark" type="submit">Sign In</Button>
            </Form>
            <p style={{fontFamily:"'Times New Roman'"}}>Don't have an account? Click <a href="/register">here</a>!</p>
            {message ? <Message message={message} /> : null}
        </Container>
    )
}

export default SignIn