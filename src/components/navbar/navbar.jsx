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

    const [expand, setExpand] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className={`${!isLoggedIn ? '' : ''} bg-bgMain h-screen p-2 w-15 transition-all ${expand ? 'w-60' : ''}`}>
            <div 
                className={`
                    flex flex-col gap-4 h-full pt-4
                `}>
                    <button 
                        type='button'
                        onClick={() => setExpand(!expand)}
                        className={`
                            nav-item self-start flex flex-row 
                            w-9/10 py-1 px-2 rounded-2xl gap-2 
                            ${expand ? 'hover:bg-wiseGrey4/25' : ''}
                        `}
                        title={`${expand ? 'Close Sidebar' : 'Open Sidebar'}`}
                    >
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
                {isLoggedIn 
                ? (<>
                        <div className={`nav-links flex flex-col gap-4`}>
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
                                mt-6 px-2
                                grow
                                ${expand ? 'opacity-100' : 'opacity-0'} 
                            `}>
                            <h1 
                                className='
                                    font-base text-lg text-wiseGrey4/70
                                    pb-2
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
                    </>
                )
                :
                (
                    <>
                        <div className={`nav-links flex flex-col gap-4`}>
                            <NavLink to='/home' 
                                className={`
                                    nav-item self-start flex flex-row 
                                    w-9/10 py-1 px-2 rounded-2xl gap-2 
                                    ${expand ? 'hover:bg-wiseGrey4/25 ml-4' : ''}
                                `}
                                title='Home'>
                                <FontAwesomeIcon icon={faHouse}/>
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
                                    Home
                                </h1>
                            </NavLink>
                            <NavLink to="/login" 
                            className={`
                                    nav-item self-start flex flex-row 
                                    w-9/10 py-1 px-2 rounded-2xl gap-2 
                                    ${expand ? 'hover:bg-wiseGrey4/25 ml-4' : ''}
                                `} 
                            title='Login'>
                                <FontAwesomeIcon icon={faUserLock}/>
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
                                    Login
                                </h1>
                            </NavLink>
                        </div>
                        <div 
                            className={`
                                documents-section
                                transition-all
                                flex grow flex-col justify-end p-2 
                                w-full ${!expand ? 'opacity-0' : 'opacity-100'}
                            `}>
                             {["terms", "privacy", "contact"].map((item) => (
                                <Link 
                                    key={item}
                                    to={`/${item}`}
                                    className='
                                        py-1
                                        text-wiseRose4
                                        hover:text-wiseRose2
                                        hover:underline
                                    '    
                                >
                                    {item === "terms"
                                        ? "Terms and Conditions"
                                        : item === "privacy" 
                                        ? "Privacy and Cookies"
                                        : "Contact Us"
                                    }
                                </Link>
                             ))}   
                        </div>    
                    </>
                )
                }
                

            </div>
        </nav>
    );
}

export default Navbar;