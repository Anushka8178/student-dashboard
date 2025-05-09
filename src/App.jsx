import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AddStudent from './pages/AddStudent';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/add-student" 
        element={
          <PrivateRoute>
            <AddStudent />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default App;
