import React from 'react';
import { useActionData, useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/authContext';

const ProtectedRoute = ({children}) => {

    const navigate = useNavigate();
    const { isLoggedIn } = useAppContext();

    if (!isLoggedIn) {
        return <Navigate to='/login' replace/>
    }

    return children;
};

export default ProtectedRoute;