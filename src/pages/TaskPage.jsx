import React, { useState, useEffect } from "react";
import { api } from "../axios/ApiAxios";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editTaskId, setEditTaskId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    if (!dueDate) {
      setError("Due date is required");
      return;
    }

    try {
      const taskData = {
        title,
        description,
        dueDate: new Date(dueDate).toISOString(), // Convert to ISO format
        priority,
      };

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
      setDescription("");
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
    setDescription(task.description);
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : ""); // ISO format
    setPriority(task.priority);
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setError("");
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Function to return a color from a predefined set based on the task index
  const getBoxColor = (index) => {
    const colors = [
      "bg-blue-50 border-blue-200 text-blue-600",
      "bg-green-50 border-green-200 text-green-600",
      "bg-yellow-50 border-yellow-200 text-yellow-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
      }}
    >
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Task Manager</h1>

        {/* Task Form */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
            >
              {editTaskId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        {/* Task Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <div
              key={task._id}
              className={`relative p-4 rounded-lg shadow-md border ${getBoxColor(index)}`}
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">
                {task.dueDate
                  ? new Date(task.dueDate).toISOString().split("T")[0]
                  : "Invalid Date"}
              </p>
              <p className="font-bold">{task.priority}</p>
              <div className="flex justify-between mt-4 text-sm">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}