import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Login from './components/login';
import Home from './components/home';
import Newticket from './components/client/book';
import Admin from './components/admin/home';
import Addnewuser from './components/admin/addnewuser';
import Nextadmin from './components/admin/nextadmin';
import Supervisor from './components/supervisor/home';
import L1engineer from './components/l1engineer/home';
import L2l3engineer from './components/l2l3engineer/home';

// ✅ Define PrivateRoute above App
const PrivateRoute = ({ children, allowedRoles, user }) => {
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h2>Ticket management system</h2>
        {user && <h2>{user.role}</h2>}
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newticket" element={<Newticket />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={ <PrivateRoute allowedRoles={['ADMIN']} user={user}> <Admin /> </PrivateRoute>} />
        <Route path="/admin/addnewuser" element={ <PrivateRoute allowedRoles={['ADMIN']} user={user}> <Addnewuser /> </PrivateRoute>} />
        <Route path="/nextadmin" element={<Nextadmin />} />
        <Route
          path="/supervisor"
          element={
            <PrivateRoute allowedRoles={['SUPERVISOR']} user={user}>
              <Supervisor />
            </PrivateRoute>
          }
        />
        <Route
          path="/l1engineer"
          element={
            <PrivateRoute allowedRoles={['L1ENGINEER']} user={user}>
              <L1engineer />
            </PrivateRoute>
          }
        />
        <Route
          path="/l2l3engineer"
          element={
            <PrivateRoute allowedRoles={['L2L3ENGINEER']} user={user}>
              <L2l3engineer />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
