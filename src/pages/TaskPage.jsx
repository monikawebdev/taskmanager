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
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setTitle("");
    setDueDate("");
    setPriority("Medium");
    setError("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.priority === filter;
  });

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0D1117] flex items-center justify-center p-6">
      <div className="bg-[#0D1117] rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-white">Task Manager</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="border border-gray-700 rounded-lg w-full py-3 px-4 bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#FBBF24] text-white"
            aria-label="Task Title"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="YYYY-MM-DD"
            className="border border-gray-700 rounded-lg w-full py-3 px-4 bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#FBBF24] text-white"
            aria-label="Due Date"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-700 rounded-lg w-full py-3 px-4 bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#FBBF24] text-white"
            aria-label="Task Priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-[#FBBF24] text-black rounded-lg px-4 py-2 hover:bg-[#FACC15] transition shadow"
              aria-label={editTaskId ? "Update Task" : "+ Add Task"}
            >
              {editTaskId ? "Update Task" : "+ Add Task"}
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#1E293B] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] border border-gray-700"
            >
              <option value="All">Filter: All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </form>

        {loading ? (
          <div className="text-center text-gray-500">Loading tasks...</div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-400 text-center">No tasks available</p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-[#1E293B] p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div>
                    <span className="text-white font-medium">{task.title}</span>
                    <p className="text-gray-400 text-sm">
                      Due: {task.dueDate ? task.dueDate.split("T")[0] : "No Due Date"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Priority: {task.priority || "No Priority"}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-[#FBBF24] hover:text-[#FACC15] transition"
                      aria-label="Edit Task"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      aria-label="Delete Task"
                    >
                      Delete
                    </button>
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