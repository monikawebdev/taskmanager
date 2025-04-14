import React, { useState, useEffect } from "react";
import { api } from "../axios/ApiAxios";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
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

    try {
      if (editTaskId) {
        const response = await api.put(`/api/task/${editTaskId}`, { title });
        setTasks(tasks.map((task) => (task._id === editTaskId ? response.data : task)));
        setSuccess("Task updated successfully");
        setEditTaskId(null);
      } else {
        const response = await api.post("/api/task", { title });
        setTasks([...tasks, response.data]);
        setSuccess("Task created successfully");
      }
      setTitle("");
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
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setTitle("");
    setError("");
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Task Manager</h1>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="border border-gray-200 rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
            aria-label="Task Title"
          />
          {error && <p className="text-red-500 text-sm animate-fade-in">{error}</p>}
          {success && <p className="text-green-500 text-sm animate-fade-in">{success}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 transition shadow"
              aria-label={editTaskId ? "Update Task" : "Add Task"}
            >
              {editTaskId ? "Update Task" : "Add Task"}
            </button>
            {editTaskId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-400 text-white rounded-lg px-4 py-2 hover:bg-gray-500 transition shadow"
                aria-label="Cancel Edit"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <div className="text-center text-gray-500">Loading tasks...</div>
        ) : (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-600 text-center">No tasks available</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg hover:bg-gray-50 transition"
                >
                  <span className="text-gray-800 font-medium">{task.title}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-purple-500 hover:text-purple-700 transition"
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