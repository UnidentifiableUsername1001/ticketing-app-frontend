import React, { createContext, useState, useContext, children } from 'react';

const AppContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("auth-token"));

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);