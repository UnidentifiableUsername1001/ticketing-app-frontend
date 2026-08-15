import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAppContext } from '../../context/authContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faHouse, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

function Navbar() {
    const navigate = useNavigate();

    const isAuthenticated = useAppContext();
    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        navigate('/login');
    };

    return (
        <nav className='bg-bgMain flex flex-row items-center p-3 justify-between'>
            <div className=''>
                <img className='h-6' src='/assets/wise_logo_primary.svg'></img>
            </div>
            <div className='flex w-full justify-center gap-12'>
                {isAuthenticated ? (
                    <>
                        <NavLink to='/homepage' className="nav-item" title='Home Page'>
                            <FontAwesomeIcon icon={faHouse}/>
                        </NavLink>
                        <NavLink to='/dashboard' className="nav-item" title='Dashboard'>
                            <FontAwesomeIcon icon={faChalkboardUser}/>
                        </NavLink>
                        <NavLink to="/create-ticket" className='nav-item' title='Create Issue'>
                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </NavLink>
                        <button onClick={handleLogout} className='nav-item' title='Logout'><FontAwesomeIcon icon={faArrowRightFromBracket}/></button>
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;