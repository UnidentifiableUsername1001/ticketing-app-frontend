// Default
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import RegisterPage from './components/user-auth/registerPage';
import LoginPage from './components/user-auth/loginPage';
import ProtectedRoute from './components/user-auth/ProtectedRoute';
import Dashboard from './components/dashboard/dashboard';
import CreateTicket from './components/create-ticket/createTicket';
import DetailView from './components/ticket-view/detailVIew';
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import AdminCentre from './components/admin-centre/adminCentre';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComments, faCircleUser, faBell, faHouse, faPenToSquare, faSquarePlus, faTrashCan, faUser, faIdBadge} from '@fortawesome/free-regular-svg-icons';
import { faGear, faCubesStacked, faGlobe, faShield, faBuilding, faChevronDown, faCheck, faAngleUp } from '@fortawesome/free-solid-svg-icons';

library.add(faComments, faCircleUser, faGlobe, faCubesStacked, faBell, faHouse, faChevronDown, faAngleUp, faPenToSquare, faSquarePlus, faTrashCan, faUser, faIdBadge, faGear, faShield, faBuilding);

function App() {


  return (
    <>
      <Navbar />
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
    </>
  )
}

export default App;
