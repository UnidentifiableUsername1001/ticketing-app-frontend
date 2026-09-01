import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAppContext } from '../../context/authContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowsLeftRightToLine, faChalkboardUser, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faHouse, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

function Navbar() {
    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn } = useAppContext();

    const [expand, setExpand] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className={`${!isLoggedIn ? 'hidden' : ''} bg-bgMain h-screen p-2 w-15 transition-all ${expand ? 'w-60' : ''}`}>
            <div 
                className={`
                    flex flex-col gap-4 h-full pt-4
                `}>
                <div className={`nav-links flex flex-col gap-4`}>
                    <button 
                        type='button'
                        onClick={() => setExpand(!expand)}
                        className={`
                            nav-item self-start flex flex-row 
                            w-9/10 py-1 px-2 rounded-2xl gap-2 
                            ${expand ? 'hover:bg-wiseGrey4/25' : ''}
                        `}
                        title={`${expand ? 'Close Sidebar' : 'Open Sidebar'}`}>
                            <FontAwesomeIcon icon={faArrowsLeftRightToLine}/>
                            <h1
                                className={`
                                    transition-all
                                    text-sm font-medium text-wiseGrey4 
                                    self-center 
                                    ${expand ? 
                                        'opacity-100' 
                                        : 
                                        'opacity-0 hidden'
                                    }
                                `}
                            >
                                Close Sidebar
                            </h1>
                        </button>
                    <NavLink to='/dashboard' 
                        className={`
                            nav-item self-start flex flex-row 
                            w-9/10 py-1 px-2 rounded-2xl gap-2 
                            ${expand ? 'hover:bg-wiseGrey4/25 ml-4' : ''}
                        `}
                        title='Dashboard'>
                        <FontAwesomeIcon icon={faChalkboardUser}/>
                        <h1
                            className={`
                                transition-all
                                text-sm font-medium text-wiseGrey4 
                                self-center 
                                ${expand ? 
                                    'opacity-100' 
                                    : 
                                    'opacity-0 hidden'
                                }
                            `}
                        >
                            Dashboard
                        </h1>
                    </NavLink>
                    <NavLink to="/create-ticket" 
                    className={`
                            nav-item self-start flex flex-row 
                            w-9/10 py-1 px-2 rounded-2xl gap-2 
                            ${expand ? 'hover:bg-wiseGrey4/25 ml-4' : ''}
                        `} 
                    title='Create Issue'>
                        <FontAwesomeIcon icon={faPenToSquare}/>
                        <h1
                            className={`
                                transition-all
                                text-sm font-medium text-wiseGrey4 
                                self-center 
                                ${expand ? 
                                    'opacity-100' 
                                    : 
                                    'opacity-0 hidden'
                                }
                            `}
                        >
                            Create Issue
                        </h1>
                    </NavLink>
                    <NavLink to='/admin-centre' 
                    className={`
                            nav-item self-start flex flex-row 
                            w-9/10 py-1 px-2 rounded-2xl gap-2 
                            ${expand ? 'hover:bg-wiseGrey4/25 ml-4' : ''}
                        `} 
                    title='Admin Centre'>
                        <FontAwesomeIcon icon={faScrewdriverWrench}/>
                        <h1
                            className={`
                                transition-all
                                text-sm font-medium text-wiseGrey4 
                                self-center 
                                ${expand ? 
                                    'opacity-100' 
                                    : 
                                    'opacity-0 hidden'
                                }
                            `}
                        >
                            Admin Centre
                        </h1>
                    </NavLink>
                </div>
                <div 
                    className={`
                        history-section
                        transition-all
                        font-lato
                        text-wiseGrey5/80 font-medium
                        mt-6 px-2
                        grow
                        ${expand ? 'opacity-100' : 'opacity-0'} 
                    `}>
                    <h1>
                        Recent
                    </h1>
                    <div 
                        className={`
                            overflow-auto
                        `}>

                    </div>
                </div>
                <div 
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
                            ${expand ? 'opacity-100' : 'opacity-0 hidden'}
                        `}
                    >
                        Logout
                    </h1>
                    <button onClick={handleLogout} 
                        className={`
                            cursor-pointer
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