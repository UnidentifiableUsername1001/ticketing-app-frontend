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
        {label: 'Settings', linkTo: '/admin-centre'}
    ]

    return (
        <nav className={`${!isLoggedIn ? 'hidden' : 'bg-wiseGrey1 p-2 transition-all w-60'} `}>
            <div 
                className={`
                    flex flex-col gap-4 h-full pt-4
                `}>
                {isLoggedIn 
                ? (<>
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
                                        w-full py-3 px-4 rounded-md gap-2 
                                        ${expand ? 'hover:bg-wiseRose4/30' : ''}
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
                                ${expand ? 'opacity-100' : 'opacity-0'} 
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
                    </>
                )
                :
                (
                    <>
                        <div className={`nav-links flex flex-col gap-4`}>
                            <NavLink to='/homepage' 
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
                                    self-start flex flex-row 
                                    w-9/10 py-1 px-2 rounded-2xl gap-2  
                                `} 
                            title='Login'>
                                <FontAwesomeIcon icon={faUserLock}
                                    className='text-wiseGrey4'
                                />
                                <h1
                                    className={`
                                        transition-all
                                        text-sm font-medium text-wiseGrey4 
                                        self-center 
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