import React, { useState, useEffect } from "react";
import { api } from "../axios/ApiAxios";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editTaskId, setEditTaskId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/task");
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!dueDate) {
      setError("Due date is required");
      return;
    }

    try {
      const taskData = { title, dueDate, priority };

      if (editTaskId) {
        const response = await api.put(`/api/task/${editTaskId}`, taskData);
        setTasks(tasks.map((task) => (task._id === editTaskId ? response.data : task)));
        setSuccess("Task updated successfully");
        setEditTaskId(null);
      } else {
        const response = await api.post("/api/task", taskData);
        setTasks([...tasks, response.data]);
        setSuccess("Task created successfully");
      }

      setTitle("");
      setDueDate("");
      setPriority("Medium");
      setShowAddTaskForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/task/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setSuccess("Task deleted successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setTitle(task.title);
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    setPriority(task.priority);
    setShowAddTaskForm(true);
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setTitle("");
    setDueDate("");
    setPriority("Medium");
    setError("");
    setShowAddTaskForm(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.priority === filter;
  });

  useEffect(() => {
    getTasks();
  }, []);

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-300";
      case "Low":
        return "bg-blue-400";
      default:
        return "bg-gray-400";
    }
  };
  
  // Function to get task status indicator color
  const getStatusColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-400";
      case "Low":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 rounded p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
          </div>
          <div className="rounded-full bg-gray-200 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          {!showAddTaskForm && (
            <button 
              onClick={() => setShowAddTaskForm(true)} 
              className="bg-blue-600 text-white rounded-lg px-3 py-2 flex items-center gap-1 hover:bg-blue-700"
            >
              <span>+</span> Add Task
            </button>
          )}
          
          <div className="relative ml-auto">
            <button className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 flex items-center gap-2 border border-gray-300">
              Filter: {filter}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {showAddTaskForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-50 p-4 rounded-lg">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
              >
                {editTaskId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading tasks...</div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No tasks available</p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-900 text-white p-4 rounded-lg"
                >
                  <div className="flex items-start mb-2">
                    <div className={`w-3 h-3 ${getStatusColor(task.priority)} rounded-full mt-1 mr-2`}></div>
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-400">
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "No date"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)} text-black`}>
                      {task.priority}
                    </span>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-gray-400 hover:text-white flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-gray-400 hover:text-white flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}