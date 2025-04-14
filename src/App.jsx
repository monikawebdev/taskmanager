import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import Layout from './layouts/Layout';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';

function App() {
  const isAuth = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAuth ? <TaskPage /> : <Navigate to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;