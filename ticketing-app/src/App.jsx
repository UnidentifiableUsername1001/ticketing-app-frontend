// Default
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import RegisterPage from './components/user-auth/registerPage';
import LoginPage from './components/user-auth/loginPage';
import ProtectedRoute from './components/user-auth/ProtectedRoute';
import Dashboard from './components/dashboard/dashboard';
import CreateTicket from './components/create-ticket/CreateTicket';
import DetailView from './components/ticket-view/detailVIew';
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import AdminCentre from './components/admin-centre/adminCentre';
import { ToastProvider } from './context/toast-notification/ToastContext';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComments, faCircleUser, faBell, faHouse, faPenToSquare, faSquarePlus, faTrashCan, faUser, faIdBadge} from '@fortawesome/free-regular-svg-icons';
import { faGear, faTrash, faCubesStacked, faArrowUpFromBracket, faGlobe, faShield, faBuilding, faChevronDown, faCheck, faAngleUp, faChalkboardUser, faArrowRightFromBracket, faSquareCheck, faDeleteLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from './context/toast-notification/ToastContainer';


library.add(
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
        <Navbar />
        <ToastContainer/>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
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
      </ToastProvider>
    </>
  )
}

export default App;
