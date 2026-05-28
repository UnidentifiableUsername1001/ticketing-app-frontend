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
                    <div className='font-lato min-h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mx-32 content-center p-12'>
                        <div className='' onClick={() => navigate('/dashboard')}>
                            <h2>Dashboard</h2>
                            <p>View tickets assigned to you and your team</p>
                        </div>
                        <div className='' onClick={() => navigate('/create-ticket')}>
                            <h2>Create issue</h2>
                            <p>Raise a new issue for your team or another team</p>
                        </div>
                        <div className='' onClick={() => navigate('/settings')}>
                            <h2>Settings</h2>
                            <p>Change settings and update your details</p>
                        </div>
                    </div>
                </>
            )
        } else if (role == 'Admin') {
            return (
                <>
                    <div className='font-lato min-h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mx-32 content-center p-12'>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/dashboard')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Organisation Overview</h2>
                            <p className='text-white'>View all tickets accross the Organisation</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/create-ticket')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Create Issue</h2>
                            <p className='text-white'>Raise a new issue for your team or another team</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/admin-centre')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Admin Centre</h2>
                            <p className='text-white'>Hub for editing organisation properties/ settings, including users, departments, tickets etc.</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/settings')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Settings</h2>
                            <p className='text-white'>Change settings and update your details</p>
                        </div>
                    </div>
                </>
            )    
        } else {
            return (
                <>
                    <div className='font-lato min-h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mx-32 content-center p-12'>
                        <div className='' onClick={() => navigate('/dashboard')}>
                            <h2>Organisation Overview</h2>
                            <p>View all tickets accross the Organisation</p>
                        </div>
                        <div className='' onClick={() => navigate('/create-ticket')}>
                            <h2>Create issue</h2>
                            <p>Raise a new issue for your team or another team</p>
                        </div>Ho
                        <div className='' onClick={() => navigate('/manager-centre')}>
                            <h2>Manager Centre</h2>
                            <p>Hub for editing department properties/ settings</p>
                        </div>
                        <div className='' onClick={() => navigate('/settings')}>
                            <h2>Settings</h2>
                            <p>Change personal settings and update your details</p>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className='min-h-screen bg-wisePaleGrey content-center'>
            <div className='content-center -mt-128'>
                {tilesToRender()}
            </div>
        </div>
    )
};

export default Homepage;
