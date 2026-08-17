import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
import { jwtDecode } from "jwt-decode";

export function useLogin () {
    const navigate = useNavigate();
    const location = useLocation();
    const {setIsLoggedIn} = useAppContext();

    const lazyLoginFunc = async (loginData) => {

        const url = `${config.backendUrl}/api/auth/login`;

        try { 
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/json',
            }, body: JSON.stringify(loginData) 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.message}`)
        };

        const decoded = jwtDecode(data.authToken);

        // Set temp token in session and only navigate to /password-reset if not already there
        if (decoded.user.scope == 'password_reset_only') {

            sessionStorage.setItem('auth-token', data.authToken);

            if(location.pathname !== '/password-reset') {
                navigate('/password-reset');
            }
            
            return;

        };

        sessionStorage.setItem('auth-token', data.authToken);
        sessionStorage.setItem('name', data.firstName + " " + data.lastName);
        sessionStorage.setItem('email', data.email);

        setIsLoggedIn(true);

        navigate('/homepage');

        } catch (e) {
            console.log('Error fetching details: ' + e);
        }
    }

    return lazyLoginFunc;
}