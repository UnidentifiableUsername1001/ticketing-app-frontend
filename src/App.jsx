// Default
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Components
import LoginPage from './components/user-auth/loginPage';
import ProtectedRoute from './components/user-auth/ProtectedRoute';
import Dashboard from './components/dashboard/dashboard';
import CreateTicket from './components/create-ticket/createTicket';
import DetailView from './components/ticket-view/detailVIew';
import Navbar from './components/navbar/navbar';
import AdminCentre from './components/admin-centre/adminCentre';
import { Registration } from './components/registration/Registration';
import { PasswordReset } from './components/user-auth/PasswordReset';
import { ToastProvider } from './context/toast-notification/ToastContext';
import { RecentsProvider } from './context/sidebar-recents/RecentsContext';
import { Home } from './components/homepage/homepage';
import { ToastContainer } from './context/toast-notification/ToastContainer';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComments, 
  faCircleXmark,
  faCircleUser, 
  faBell, 
  faHouse, 
  faPenToSquare, 
  faSquarePlus, 
  faTrashCan, 
  faUser, 
  faIdBadge
} from '@fortawesome/free-regular-svg-icons';

import { 
  faGear, 
  faTrash, 
  faCubesStacked,
  faArrowUpFromBracket, 
  faGlobe, 
  faShield, 
  faBuilding, 
  faChevronDown, 
  faAngleUp, 
  faChalkboardUser, 
  faArrowRightFromBracket, 
  faSquareCheck, 
  faXmark, 
  faScrewdriverWrench,
  faArrowsLeftRightToLine,
  faUserLock 
} from '@fortawesome/free-solid-svg-icons';


library.add(
  faCircleXmark,
  faUserLock,
  faScrewdriverWrench,
  faArrowsLeftRightToLine,
  faComments, 
  faCircleUser, 
  faGlobe, 
  faCubesStacked, 
  faBell, 
  faHouse, 
  faChevronDown, 
  faChalkboardUser, 
  faAngleUp, 
  faPenToSquare, 
  faArrowRightFromBracket, 
  faSquarePlus, 
  faTrashCan, 
  faUser, 
  faIdBadge, 
  faGear, 
  faShield, 
  faBuilding,
  faTrash,
  faSquareCheck,
  faXmark,
  faArrowUpFromBracket
);


function App() {


  return (
    <>
      <ToastProvider>
      <RecentsProvider>
        <div 
          className='flex flex-col h-screen overflow-hidden'>
            <div className={`
                ${window.location.pathname.includes('register') || window.location.pathname.includes('login') || window.location.pathname.includes('homepage')
                  ? 'hidden' 
                  : ''}
                flex flex-row gap-3 items-center py-7
                bg-wiseGrey1 h-12 z-50 sticky w-full shrink-0
              `}>
              <span 
                className="
                  ml-4
                  w-8 h-8 rounded-lg bg-wiseRose4 text-wiseGrey1 
                  flex items-center justify-center text-base font-bold">
                  W
              </span>
              <span
                className='
                  font-lato text-wiseGrey5 text-2xl
                '
              >
                WiseTickets
              </span>
            </div>
            <ToastContainer/>
            <main 
              className='flex flex-row flex-1 min-h-0 overflow-hidden'>
                <Navbar />
                <div className='flex-1 overflow-y-auto bg-wiseGrey5'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Registration/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/password-reset" element={<PasswordReset/>}/>
                    <Route path="/homepage" element={
                        <Home />
                    } />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path='/create-ticket' element={
                      <ProtectedRoute>
                        <CreateTicket />
                      </ProtectedRoute>
                    } />
                    <Route path='/ticket/:ticketId' element={
                      <ProtectedRoute>
                        <DetailView/>
                      </ProtectedRoute>
                    } />
                    <Route path='/admin-centre' element={
                      <ProtectedRoute>
                        <AdminCentre/>
                      </ProtectedRoute>
                    } />
                  </Routes>
                </div>
            
            </main>
          </div>
      </RecentsProvider>
      </ToastProvider>
    </>
  )
}

export default App;
