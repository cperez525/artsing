import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/Authentication";
import FadeIn from "react-fade-in";

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, SetIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            SetIsLoaded(true);
        })
    }, [])


    return (

        <div>
            {!isLoaded ?
                <FadeIn>
                    <div class="d-flex justify-content-center align-items-center">
                        <h1>Gathering data! Bear with us!</h1>
                    </div>
                </FadeIn> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>
            }
        </div>
    )


}