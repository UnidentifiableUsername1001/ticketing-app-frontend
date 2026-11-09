import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAppContext } from '../../context/authContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowsLeftRightToLine, faChalkboardUser, faScrewdriverWrench, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { faHouse, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { RecentsProvider } from '../../context/sidebar-recents/RecentsContext';
import { RecentsContainer } from '../../context/sidebar-recents/RecentsContainer';

function Navbar() {
    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn } = useAppContext();

    const [expand, setExpand] = useState(true);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const links = [
        {label: 'Dashboard', linkTo: '/dashboard'},
        {label: 'Create Issue', linkTo: '/create-ticket'},
        {label: 'Settings', linkTo: '/admin-centre/users'}
    ]

    return (
        <nav className={`${!isLoggedIn ? 'hidden' : 'bg-wiseGrey1 p-2 transition-all w-60'} `}>
            <div 
                className={`
                    flex flex-col gap-4 h-full pt-4
                `}>
                <div className={` flex flex-col`}>
                    <h2
                        className='font-base text-lg text-wiseGrey4/70 px-2'
                    >
                        Quick Links
                    </h2>
                    {links.map((link) => (
                        <NavLink to={link.linkTo} 
                            className={`
                                nav-item
                                text-[16px] font-medium text-wiseGrey5/80 hover:text-wiseRose4
                                w-full py-3 px-4 rounded-md gap-2 hover:bg-wiseRose4/30
                                
                            `}
                            title={link.label}>
                            <h1
                                className={`
                                    transition-all
                                    self-center 
                                    ${expand ? 
                                        'opacity-100' 
                                        : 
                                        'opacity-0 hidden'
                                    }
                                `}
                            >
                                {link.label}
                            </h1>
                        </NavLink>
                    ))}
                </div>
                <div 
                    className={`
                        history-section
                        transition-all
                        font-lato
                        mt-6 px-2
                        grow
                        
                    `}>
                    <h1 
                        className='
                            font-base text-lg text-wiseGrey4/70 mb-2
                            
                        '>
                        Recents
                    </h1>
                    <div 
                        className={`
                            text-sm
                            overflow-auto
                        `}>
                        <RecentsContainer/>
                    </div>
                </div>
                <div 
                    onClick={handleLogout}
                    className={`
                        user-profile-section
                        nav-item
                        transition-all
                        flex flex-row justify-between
                        w-full
                    `}>
                    <h1
                        className={`
                            text-base font-medium text-wiseGrey4
                        `}
                    >
                        Logout
                    </h1>
                    <button onClick={handleLogout} 
                        className={`
                            cursor-pointer text-wiseGrey5 text-lg
                        `} 
                        title='Logout'>
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;