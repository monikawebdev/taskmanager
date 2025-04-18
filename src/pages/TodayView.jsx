import React, { useState } from 'react';

const TodayView = () => {
    const [selectedDate, setSelectedDate] = useState('2025-04-18');
    const [tasks, setTasks] = useState([
        { date: '2025-04-18', title: 'Finish report', status: 'Done' },
        { date: '2025-04-18', title: 'Team meeting', status: 'Pending' },
    ]);
    const [focusTasks, setFocusTasks] = useState([
        { title: 'Prepare slides', completed: false },
        { title: 'Call with client', completed: true },
    ]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const toggleFocusTask = (index) => {
        const updatedTasks = [...focusTasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setFocusTasks(updatedTasks);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-blue-100 p-10 font-sans">
            {/* Title aligned to the left with updated color */}
            <h1 className="text-4xl font-extrabold text-left text-purple-800 mb-10">Today View</h1>
            <p className="text-lg text-gray-500 text-left">Your productivity at a glance</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {/* Calendar View */}
                <div className="bg-gradient-to-b from-white to-purple-100 rounded-2xl shadow-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Calendar View</h2>
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-gray-700">April 2025</h3>
                        <div className="grid grid-cols-7 gap-2 mt-4 text-gray-600">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                <span key={day} className="text-sm font-semibold">{day}</span>
                            ))}
                            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                                <button
                                    key={day}
                                    onClick={() => handleDateChange(`2025-04-${day.toString().padStart(2, '0')}`)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        selectedDate === `2025-04-${day.toString().padStart(2, '0')}`
                                            ? 'bg-blue-500 text-white font-bold'
                                            : 'hover:bg-blue-100 hover:text-blue-500'
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Tasks on {formatDate(selectedDate)}
                        </h3>
                        {tasks
                            .filter((task) => task.date === selectedDate)
                            .map((task, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center mb-2 last:mb-0"
                                >
                                    <span className="text-sm text-gray-700">{task.title}</span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${
                                            task.status === 'Done'
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-yellow-200 text-yellow-800'
                                        }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Focus View */}
                <div className="bg-gradient-to-b from-white to-blue-100 rounded-2xl shadow-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Focus View (Today)</h2>
                    <div className="space-y-4">
                        {focusTasks.map((task, index) => (
                            <label
                                key={index}
                                className="flex items-center space-x-3 text-gray-700"
                            >
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleFocusTask(index)}
                                    className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span
                                    className={`${
                                        task.completed ? 'line-through text-gray-400' : ''
                                    }`}
                                >
                                    {task.title}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodayView;