import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing'; 
import TaskPage from './pages/TaskPage';
import ProjectPage from './pages/ProjectPage'; // Correct path to ProjectPage
import TodayView from './pages/TodayView'; // Import TodayView component
import Layout from './layouts/Layout';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  // Check if the user is authenticated
  const isAuth = !!localStorage.getItem('token'); // Use double negation to ensure a boolean value

  return (
    <Router>
      <Routes>
        {/* Landing route */}
        <Route path="/" element={<Landing />} />

        {/* Login and Register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes wrapped inside Layout */}
        <Route path="/app" element={isAuth ? <Layout /> : <Navigate to="/login" />}>
          {/* Dashboard route */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Route for the TaskPage */}
          <Route index element={<TaskPage />} />

          {/* Route for the ProjectPage */}
          <Route path="projects" element={<ProjectPage />} />

          {/* Route for the TodayView */}
          <Route path="today" element={<TodayView />} />
        </Route>

        {/* Fallback Route for Page Not Found */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;