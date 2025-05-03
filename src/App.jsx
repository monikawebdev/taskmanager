import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import TaskPage from './pages/TaskPage';
import ProjectPage from './pages/ProjectPage';
import TodayView from './pages/TodayView';
import Layout from './layouts/Layout';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  // State to track if the user is authenticated
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuth(!!token); // Set authentication status
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/app"
          element={isAuth ? <Layout /> : <Navigate to="/login" />}
        >
          {/* Nested routes inside the protected Layout */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<TaskPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="today" element={<TodayView />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;