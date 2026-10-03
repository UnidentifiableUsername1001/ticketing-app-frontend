// Default
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import LoginPage from './components/user-auth/loginPage';
import ProtectedRoute from './components/user-auth/ProtectedRoute';
import Dashboard from './components/dashboard/dashboard';
import CreateTicket from './components/create-ticket/createTicket';
import DetailView from './components/ticket-view/detailVIew';
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import AdminCentre from './components/admin-centre/adminCentre';
import { Registration } from './components/registration/Registration';
import { PasswordReset } from './components/user-auth/PasswordReset';
import { ToastProvider } from './context/toast-notification/ToastContext';
import { RecentsProvider } from './context/sidebar-recents/RecentsContext';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComments, 
  faCircleUser, 
  faBell, 
  faHouse, 
  faPenToSquare, 
  faSquarePlus, 
  faTrashCan, 
  faUser, 
  faIdBadge} from '@fortawesome/free-regular-svg-icons';

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
  faArrowsLeftRightToLine 
} from '@fortawesome/free-solid-svg-icons';

import { ToastContainer } from './context/toast-notification/ToastContainer';


library.add(
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
          className='h-screen flex overflow-auto'>
          <Navbar />
          <ToastContainer/>

            <main 
              className='flex-1 overflow-hidden'>
                <div className={`
                  ${window.location.pathname.includes('register')? 'hidden' : 'bg-wiseGrey1 h-12 z-50 sticky w-full'}
                  `}>
                    .
                </div>
                <div className=''>
                <Routes>
                  <Route path='/' element={<LoginPage />} />
                  <Route path='/register' element={<Registration/>} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/password-reset" element={<PasswordReset/>}/>
                  <Route path="/homepage" element={
                    <ProtectedRoute>
                      <Homepage />
                    </ProtectedRoute>
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
