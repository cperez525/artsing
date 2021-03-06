import React, {useContext} from 'react';
import { Nav } from 'react-bootstrap';
import AuthService from '../../services/Authentication';
import { AuthContext } from '../../Context/AuthenticationCtxt';

function SignOut(){

    const {setUser, setIsAuthenticated } = useContext(AuthContext);

    const LogoutHandler = (e) =>{
        AuthService.logout().then(data => {
            if(data.success) {
                setUser({});
                setIsAuthenticated(false);
            }
        })
    }

    return (

        <Nav.Link className="navBtn" style={{ color: "whitesmoke" }} href="/signin" onClick= {LogoutHandler}>Sign Out</Nav.Link>
    )
}

export default SignOut