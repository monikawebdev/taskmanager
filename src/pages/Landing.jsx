import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleGetStartedClick = () => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <div className="bg-purple-50 min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-purple-600">MyTasks</div>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="#home" className="text-gray-700 hover:text-purple-600">Home</a></li>
            <li><a href="#about" className="text-gray-700 hover:text-purple-600">About</a></li>
            <li><a href="#services" className="text-gray-700 hover:text-purple-600">Services</a></li>
            <li><a href="#contact" className="text-gray-700 hover:text-purple-600">Contact</a></li>
          </ul>
        </nav>
        <div className="text-2xl text-gray-700 cursor-pointer">☰</div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center px-12 lg:px-24 py-20">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Task Manager <br />
            <span className="text-purple-600">Manage</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">Manage your tasks</p>
          <p className="mt-2 text-gray-500">
            Organize your tasks, increase your productivity, and track your progress.
          </p>
          <button
            onClick={handleGetStartedClick}
            className="inline-block bg-purple-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md mt-6 hover:bg-purple-700 transition"
          >
            Get Started
          </button>
        </div>

        {/* Illustration */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="/illustration.png" /* Update with the correct path to your image */
            alt="Task Manager Illustration"
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default Landing;