import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/Authentication";

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
            <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                {children}
            </AuthContext.Provider>

        </div>
    )


}