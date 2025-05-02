import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; // Importing icons from lucide-react

const LandingPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate to enable navigation
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [CancelStick, setCancelStick] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('theme');
        }
    }, [darkMode]);

    const handleGetStartedClick = () => {
        navigate("/register"); // Navigate to the Register page
    };

    const handleLoginClick = () => {
        navigate("/login"); // Navigate to the Login page
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Toggle dark mode
    };

    return (
        <div
            className={`min-h-screen font-sans ${
                darkMode ? "bg-gray-800 text-white" : "bg-purple-50 text-gray-800"
            }`}
        >
            {/* Dark Mode Toggle */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-white text-gray-600 dark:text-gray-300 shadow-md"
                    aria-label="Toggle Dark Mode"
                >
                    {darkMode ? <Sun /> : <Moon />}
                </button>
            </div>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center h-full text-center px-6">
                {/* Text Content */}
                <div className="max-w-2xl mt-20">
                    <h1 className="text-4xl font-bold leading-snug">
                        Work Organized, <span className="text-purple-600">Life Simplified</span>
                    </h1>
                    <p className="mt-4 text-base">
                        Organize your tasks, increase your productivity, and track your progress.
                    </p>
                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                            onClick={handleGetStartedClick}
                            className="bg-purple-600 text-white text-lg font-medium px-8 py-3 rounded-full shadow-md hover:bg-purple-700 transition"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={handleLoginClick}
                            className={`text-purple-600 border-2 border-purple-600 text-lg font-medium px-8 py-3 rounded-full shadow-md hover:bg-purple-100 ${
                                darkMode ? "hover:bg-purple-800 hover:text-white" : ""
                            } transition`}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;