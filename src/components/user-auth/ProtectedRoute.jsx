import React from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/authContext';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {isLoggedIn} = useAppContext();

    if (!isLoggedIn) {
        return navigate('/login');
    }

    return children;
};

export default ProtectedRoute;