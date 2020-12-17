import React, { useState, useContext } from 'react';
import AuthService from '../services/Authentication';
import { AuthContext } from '../Context/AuthenticationCtxt';
import { Form, FormLabel, Button } from "react-bootstrap"
import Message from '../components/message';


function SignIn(props) {

    const [user, setUser] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        e.preventDefault();

        setUser({...user, [e.target.name] : e.target.value});
        console.log(user)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(user)

        AuthService.login(user).then(data => {

            console.log(data);
            const { isAuthenicated, user, message} = data;
            if(isAuthenicated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenicated);
                props.history.push('/user')
            } else {
                setMessage(message);
            }

        })
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <FormLabel htmlFor="email" className="sr-only">UserName: </FormLabel>
                <input className="form-control" type="text" name="email" placeholder="Email Address" onChange={onChange} />
                <FormLabel htmlFor="password" className="sr-only">UserName: </FormLabel>
                <input className="form-control" type="password" name="password" placeholder="Password" onChange={onChange} />
                <Button variant="outline-dark" type="submit">Sign In</Button>
            </Form>
            <p>Don't have an account? Click <a href="/register">here</a>!</p>
            {message ? <Message message={message} /> : null}
        </div>
    )
}

export default SignIn