import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import Layout from './layouts/Layout';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import ProjectPage from './pages/ProjectPage'; // Correct path to ProjectPage

function App() {
  const isAuth = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Route for the TaskPage */}
          <Route index element={isAuth ? <TaskPage /> : <Navigate to="/login" />} />
          
          {/* Route for the ProjectPage */}
          <Route path="projects" element={isAuth ? <ProjectPage /> : <Navigate to="/login" />} />
          
          {/* Routes for Login and Register */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Fallback Route for Page Not Found */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;