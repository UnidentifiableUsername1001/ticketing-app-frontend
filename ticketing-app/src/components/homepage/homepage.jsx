import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/authContext';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faIdBadge, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faGear, faShield } from '@fortawesome/free-solid-svg-icons';

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
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/dashboard')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Dashboard</h2>
                            <p className='text-white'>View tickets assigned to you and your team</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/create-ticket')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Create issue</h2>
                            <p className='text-white'>Raise a new issue for your team or another team</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/settings')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Settings</h2>
                            <p className='text-white'>Change settings and update your details</p>
                        </div>
                    </div>
                </>
            )
        } else if (role == 'Admin') {
            return (
                <>
                    <div className='font-lato min-h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mx-32 content-center p-12'>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/dashboard')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'><span><FontAwesomeIcon icon={faBuilding}/></span> Organisation Overview</h2>
                            <p className='text-white'>View all tickets accross the Organisation</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/create-ticket')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'><FontAwesomeIcon icon={faSquarePlus}/> Create Issue</h2>
                            <p className='text-white'>Raise a new issue for your team or another team</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/admin-centre')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'><FontAwesomeIcon icon={faShield}/> Admin Centre</h2>
                            <p className='text-white'>Hub for editing organisation properties/ settings, including users, departments, tickets etc.</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/settings')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'><FontAwesomeIcon icon={faGear}/> Settings</h2>
                            <p className='text-white'>Change settings and update your details</p>
                        </div>
                    </div>
                </>
            )    
        } else {
            return (
                <>
                    <div className='font-lato min-h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mx-32 content-center p-12'>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/dashboard')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Organisation Overview</h2>
                            <p className='text-white'>View all tickets accross the Organisation</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/create-ticket')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Create issue</h2>
                            <p className='text-white'>Raise a new issue for your team or another team</p>
                        </div>Ho
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/manager-centre')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Manager Centre</h2>
                            <p className='text-white'>Hub for editing department properties/ settings</p>
                        </div>
                        <div className='bg-wiseNavy p-6 flex flex-col gap-4 shadow-sm rounded-tl-2xl rounded-sm hover:shadow-2xl hover:bg-linear-to-br from-wiseNavy to-russianBlue/50 cursor-pointer' onClick={() => navigate('/settings')}>
                            <h2 className='border-b-wiseSkin border-b-2 font-bold text-white text-lg p-0.5'>Settings</h2>
                            <p className='text-white'>Change personal settings and update your details</p>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className='min-h-screen bg-wisePaleGrey'>
            <div className='content-center pt-32'>
                {tilesToRender()}
            </div>
        </div>
    )
};

export default Homepage;
