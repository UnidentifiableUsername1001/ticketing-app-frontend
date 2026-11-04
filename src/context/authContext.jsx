import React, { createContext, useState, useContext, children } from 'react';
import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line react-refresh/only-export-components
const AppContext = createContext();

export const AuthProvider = ({ children }) => {

    const jwt = sessionStorage.getItem('auth-token');

    const checkTokenValid = () => {
        try {

            const decoded = jwtDecode(jwt);

            const currDate = Date.now() / 1000;

            if(currDate > decoded.exp) {
                sessionStorage.removeItem('auth-token');
                return false;
            } else {
                return true
            }
            
        } catch(e) {
            sessionStorage.removeItem('auth-token');
            return false
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState(() => checkTokenValid());

    const logout = () => {
        sessionStorage.removeItem('auth-token');
        setIsLoggedIn(false);
    }

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);