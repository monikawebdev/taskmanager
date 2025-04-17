import React, { useState, useEffect } from 'react';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/task', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Add a new task
    const addTask = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, description, dueDate, priority }),
            });
            if (response.ok) {
                fetchTasks(); // Refresh tasks
                setTitle('');
                setDescription('');
                setDueDate('');
                setPriority('Medium');
            } else {
                console.error('Error adding task:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                fetchTasks(); // Refresh tasks
            } else {
                console.error('Error deleting task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Format due date
    const formatDueDate = (date) => {
        if (!date) return 'No Due Date';
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime()) ? 'Invalid Date' : parsedDate.toLocaleDateString('en-GB');
    };

    // Define different color classes for task boxes
    const getColorClass = (index) => {
        const colors = [
            'bg-purple-100 border-purple-300 text-purple-700', // Box 1
            'bg-yellow-100 border-yellow-300 text-yellow-700', // Box 2
            'bg-blue-100 border-blue-300 text-blue-700',       // Box 3
            'bg-green-100 border-green-300 text-green-700',    // Box 4
        ];
        return colors[index % colors.length]; // Loop through colors for multiple cards
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-200 via-purple-300 to-blue-200 flex justify-center items-center font-vastago">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-left text-purple-800">Tasks Page</h1>
                </div>

                {/* Add Task Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <form onSubmit={addTask} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                {/* Task Cards Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task, index) => (
                            <div
                                key={task._id}
                                className={`p-4 rounded-lg shadow-md border-l-4 ${getColorClass(index)}`}
                            >
                                <h3 className="text-lg font-bold">{task.title}</h3>
                                <p className="text-sm">{formatDueDate(task.dueDate)}</p>
                                <p className="text-sm font-medium">{task.priority}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => console.log('Edit:', task._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;