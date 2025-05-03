import React from "react";
import { NavLink } from "react-router-dom";
import { Home, CheckSquare, Briefcase, Calendar, BarChart2, Settings, LogOut, User } from "lucide-react";

const Dashboard = () => {
    const userName = "Monika Pal"; // Replace with dynamic user data if needed
    const todayTasks = ["Prepare slides", "Call with client", "Review document"];
    const overdueTasks = 1;
    const upcomingTasks = [
        { title: "Buy groceries", date: "April 19" },
        { title: "Team meeting", date: "April 20" },
        { title: "Write article", date: "April 23" },
    ];
    const completionPercentage = 60;

    return (
        <div className="min-h-screen flex bg-gray-50">
            <nav className="w-64 bg-white shadow-lg p-6 flex flex-col">
                {/* Logo and Minimize Button */}
                <div className="flex items-center justify-between mb-8">
                    <div className="text-purple-600 text-2xl font-bold">TaskManage</div>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <span className="sr-only">Minimize Sidebar</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5" />
                        </svg>
                    </button>
                </div>

                {/* User Info */}
                <div className="flex items-center mb-10">
                    <div className="p-2 bg-gray-100 rounded-full">
                        <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-800 text-base font-medium">{userName}</p>
                        <button className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                            UPGRADE
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center text-sm font-medium px-3 py-2 rounded-md ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <Home className="w-5 h-5 mr-3" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/taskpage"
                            className={({ isActive }) =>
                                `flex items-center text-sm font-medium px-3 py-2 rounded-md ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <CheckSquare className="w-5 h-5 mr-3" />
                            Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/projectpage"
                            className={({ isActive }) =>
                                `flex items-center text-sm font-medium px-3 py-2 rounded-md ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <Briefcase className="w-5 h-5 mr-3" />
                            Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/todayview"
                            className={({ isActive }) =>
                                `flex items-center text-sm font-medium px-3 py-2 rounded-md ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <Calendar className="w-5 h-5 mr-3" />
                            Today View
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/reports"
                            className={({ isActive }) =>
                                `flex items-center text-sm font-medium px-3 py-2 rounded-md ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <BarChart2 className="w-5 h-5 mr-3" />
                            Reports
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center text-sm font-medium px-3 py-2 rounded-md ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <Settings className="w-5 h-5 mr-3" />
                            Settings
                        </NavLink>
                    </li>
                </ul>

                {/* Logout Button */}
                <div className="mt-auto">
                    <button className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 px-3 py-2">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </nav>
            {/* Logout Button */}
            <div className="mt-auto">
                <button className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 px-3 py-2">
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>


            {/* Main Content */}
            <div className="flex-1 p-8">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-purple-800">Dashboard</h1>
                        <p className="text-lg text-gray-600">Your productivity at a glance</p>
                    </div>
                </header>
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Today's Tasks */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Today's Tasks</h2>
                        <p className="text-6xl font-bold text-blue-500">{todayTasks.length}</p>
                        <p className="text-gray-500">tasks</p>
                    </div>

                    {/* Overdue Tasks */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Overdue Tasks</h2>
                        <p className="text-6xl font-bold text-red-500">{overdueTasks}</p>
                        <p className="text-gray-500">task</p>
                    </div>

                    {/* Upcoming Tasks */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Tasks</h2>
                        <ul className="space-y-2">
                            {upcomingTasks.map((task, index) => (
                                <li key={index} className="flex justify-between text-gray-600">
                                    <span>{task.title}</span>
                                    <span className="text-gray-400">{task.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Task List */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 col-span-full lg:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Today's Task List</h2>
                        <ul className="space-y-3">
                            {todayTasks.map((task, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                                        defaultChecked={index === 1} // Second task is checked
                                    />
                                    <span className="text-gray-600">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Completion Progress */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Completion Progress</h2>
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-gray-300"
                                    strokeWidth="3"
                                    strokeDasharray="100"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                ></path>
                                <path
                                    className="text-green-500"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray={`${completionPercentage}, 100`}
                                ></path>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-700">{completionPercentage}%</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;