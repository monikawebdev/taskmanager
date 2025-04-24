import React from "react";
import { NavLink } from "react-router-dom";
import { Home, CheckSquare, Briefcase, Calendar, BarChart2, Settings } from "lucide-react";

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
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <nav className="w-64 bg-white shadow-lg p-6 flex flex-col">
                <div className="flex items-center space-x-3 mb-10">
                    <div className="text-purple-600 text-2xl font-bold">TaskBot</div>
                </div>
                <div className="mb-8">
                    <p className="text-gray-600 text-lg font-medium">{userName}</p>
                </div>
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center text-purple-600 font-semibold"
                                    : "flex items-center text-gray-600 hover:text-purple-600 transition"
                            }
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/taskpage"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center text-purple-600 font-semibold"
                                    : "flex items-center text-gray-600 hover:text-purple-600 transition"
                            }
                        >
                            <CheckSquare className="w-5 h-5 mr-2" />
                            Task Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/projectpage"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center text-purple-600 font-semibold"
                                    : "flex items-center text-gray-600 hover:text-purple-600 transition"
                            }
                        >
                            <Briefcase className="w-5 h-5 mr-2" />
                            Project Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/todayview"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center text-purple-600 font-semibold"
                                    : "flex items-center text-gray-600 hover:text-purple-600 transition"
                            }
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Today View
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/report"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center text-purple-600 font-semibold"
                                    : "flex items-center text-gray-600 hover:text-purple-600 transition"
                            }
                        >
                            <BarChart2 className="w-5 h-5 mr-2" />
                            Report
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center text-purple-600 font-semibold"
                                    : "flex items-center text-gray-600 hover:text-purple-600 transition"
                            }
                        >
                            <Settings className="w-5 h-5 mr-2" />
                            Settings
                        </NavLink>
                    </li>
                </ul>
                <div className="mt-auto">
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition">
                        <span className="mr-2">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-purple-800 ">Dashboard</h1>
                        <p className="text-lg text-gray-600">Your productivity at a glance</p>
                    </div>
                </header>
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Today's Tasks */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Today's Tasks</h2>
                        <p className="text-6xl font-bold text-blue-500">{todayTasks.length}</p>
                        <p className="text-gray-500">tasks</p>
                    </div>

                    {/* Overdue Tasks */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Overdue Tasks</h2>
                        <p className="text-6xl font-bold text-red-500">{overdueTasks}</p>
                        <p className="text-gray-500">task</p>
                    </div>

                    {/* Upcoming Tasks */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
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
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 col-span-full lg:col-span-2">
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
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center">
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