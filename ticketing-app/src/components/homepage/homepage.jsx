import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/authContext';
import { jwtDecode } from 'jwt-decode';

function Homepage() {
    const navigate = useNavigate();

    const token = sessionStorage.getItem('auth-token');

    if (!token) {
        window.location.href = '/login';
        return null;
    }
    const decoded = jwtDecode(token);
    const role = decoded.user.role;

    const tilesToRender = () => {
        if (role == 'User') {
            return (
                <>
                    <div className='dashboard' onClick={() => navigate('/dashboard')}>
                        <h2>Dashboard</h2>
                        <p>View tickets assigned to you and your team</p>
                    </div>
                    <div className='create-ticket' onClick={() => navigate('/create-ticket')}>
                        <h2>Create issue</h2>
                        <p>Raise a new issue for your team or another team</p>
                    </div>
                    <div className='settings' onClick={() => navigate('/settings')}>
                        <h2>Settings</h2>
                        <p>Change settings and update your details</p>
                    </div>
                </>
            )
        } else if (role == 'Admin') {
            return (
                <>
                    <div className='dashboard' onClick={() => navigate('/dashboard')}>
                        <h2>Organisation Overview</h2>
                        <p>View all tickets accross the Organisation</p>
                    </div>
                    <div className='create-ticket' onClick={() => navigate('/create-ticket')}>
                        <h2>Create issue</h2>
                        <p>Raise a new issue for your team or another team</p>
                    </div>
                    <div className='admin-centre' onClick={() => navigate('/admin-centre')}>
                        <h2>Admin Centre</h2>
                        <p>Hub for editing organisation properties/ settings, including users, departments, tickets etc.</p>
                    </div>
                    <div className='settings' onClick={() => navigate('/settings')}>
                        <h2>Settings</h2>
                        <p>Change settings and update your details</p>
                    </div>
                </>
            )    
        } else {
            return (
                <>
                    <div className='dashboard' onClick={() => navigate('/dashboard')}>
                        <h2>Organisation Overview</h2>
                        <p>View all tickets accross the Organisation</p>
                    </div>
                    <div className='create-ticket' onClick={() => navigate('/create-ticket')}>
                        <h2>Create issue</h2>
                        <p>Raise a new issue for your team or another team</p>
                    </div>Ho
                    <div className='manager-centre' onClick={() => navigate('/manager-centre')}>
                        <h2>Manager Centre</h2>
                        <p>Hub for editing department properties/ settings</p>
                    </div>
                    <div className='settings' onClick={() => navigate('/settings')}>
                        <h2>Settings</h2>
                        <p>Change personal settings and update your details</p>
                    </div>
                </>
            )
        }
    }

    return (
        <div className='outer-most-container'>
            <div className='tile-container'>
                {tilesToRender()}
            </div>
        </div>
    )
};

export default Homepage;
